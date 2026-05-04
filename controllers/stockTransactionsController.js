import StockTransactions from "../models/stockTransactions.js";

export const createStockTransaction = async (req, res) => {
  try {
    const {
      referenceId,
      trxDate,
      trxType,
      clientId,
      description,
      isAdded,
      items,
      trxId: clientTrxId, // optional (ONLY for Substrate if you really need)
    } = req.body;

    if (!trxType || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Invalid request payload",
      });
    }

    const prefixMap = {
      Purchase: "GRN-",
      SalesInvoice: "INV-",
      GoodIssue: "GIN-",
      Return: "RTN-",
      Substrate: "SUB-",
      Sterilized: "STE-",
      Inoculated: "INO-",
      Incubating: "INC-",
      Fruiting: "FRU-",
      Completed: "COM-",
      Rejected: "REJ-",
      Sold: "SAL-",
      TRX: "TRX-",
    };

    let trxId = "";

    // ======================================================
    // SAFE TRX ID GENERATION (FIXED VERSION)
    // ======================================================
    const prefix = prefixMap[trxType] || "TRX-";

    if (trxType === "Substrate" && clientTrxId) {
      trxId = clientTrxId;
    } else {
      // Get latest trxId for this type (SORT BY trxId NOT DATE)
      const lastTransaction = await StockTransactions
        .findOne({ trxType })
        .sort({ trxId: -1 })
        .lean();

      let lastNumber = 0;

      if (lastTransaction?.trxId) {
        const numericPart = lastTransaction.trxId.replace(prefix, "");
        lastNumber = parseInt(numericPart || "0", 10) || 0;
      }

      const nextNumber = lastNumber + 1;

      trxId = `${prefix}${String(nextNumber).padStart(6, "0")}`;
    }

    // ======================================================
    // BUILD TRANSACTION OBJECT
    // ======================================================
    const stockTransaction = new StockTransactions({
      trxId,
      referenceId,
      trxDate: trxDate ? new Date(trxDate) : new Date(),
      trxType,
      clientId: clientId || "",
      description: description || "",
      isAdded: Boolean(isAdded),
      items: items.map((item) => ({
        stockId: item.stockId,
        stockName: item.stockName,
        quantity: Number(item.quantity || 0),
        quantityBalance: Number(item.quantityBalance || 0),
        stockUOM: item.stockUOM || "",
        stockCost: Number(item.stockCost || 0),
        stockPrice: Number(item.stockPrice || 0),
      })),
    });

    const savedTransaction = await stockTransaction.save();

    return res.status(201).json({
      success: true,
      data: {
        issuedTrxId: savedTransaction.trxId || savedTransaction._id,
        trxDate: savedTransaction.trxDate,
      },
      message: "Stock transaction saved successfully",
    });

  } catch (err) {
    console.error("CREATE STOCK TRANSACTION ERROR:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

export async function getStockTransactions(req, res) {
  try {
    const transactions = await StockTransactions.find();
    res.json({ data: transactions });
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching transactions" });
  }
}

export async function getStockTransactionById(req, res) {
  const { id } = req.params;
  try {
    const transaction = await StockTransactions.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching transactions" });
  }
}


// FIFO-based bulk update of stock transaction quantityBalance
// Reduce stock from oldest Purchase/GRN transactions first

export async function updateQuantityBalance(req, res) {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "No items provided",
      });
    }

    const issueDetails = [];

    for (const item of items) {
      let requiredQty = Number(item.totalQty || 0);

      if (requiredQty <= 0) continue;

      // FIFO: only Purchase transactions with matching stockId
      const availableStocks = await StockTransactions.find({
        trxType: "Purchase",
        isAdded: true,
        "items.stockId": item.stockId,
        "items.quantityBalance": { $gt: 0 },
      }).sort({ trxDate: 1 }); // oldest first

      if (!availableStocks.length) {
        return res.status(400).json({
          message: `No available stock found for ${item.stockName}`,
        });
      }

      for (const stock of availableStocks) {
        if (requiredQty <= 0) break;

        let updated = false;

        stock.items = stock.items.map((stockItem) => {
          const balance = Number(stockItem.quantityBalance || 0);

          // match exact item + only positive balance
          if (
            stockItem.stockId === item.stockId &&
            balance > 0 &&
            requiredQty > 0
          ) {
            const issueQty = Math.min(requiredQty, balance);

            // reduce quantity balance
            stockItem.quantityBalance = balance - issueQty;

            requiredQty -= issueQty;
            updated = true;

            issueDetails.push({
              stockId: item.stockId,
              stockName: item.stockName,
              receivedDate: stock.trxDate,              
              receivedTrxId: stock.trxId,
              receivedVendorId: stock.clientId || "",
              issuedQuantity: issueQty,
            });
          }

          return stockItem;
        });

        // save only if updated
        if (updated) {
          await stock.save();
        }
      }

      // still insufficient stock after FIFO
      if (requiredQty > 0) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.stockName}`,
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Stock quantity balance updated successfully using FIFO",
      issueDetails,
    });

  } catch (err) {
    console.error("FIFO STOCK REDUCTION ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Error reducing stock quantities",
      error: err.message,
    });
  }
}