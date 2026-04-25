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
    } = req.body;

    const prefixMap = {
      Purchase: "GRN-",
      GoodIssue: "GIN-",
      Return: "RTN-"
    };

    let trxId = "";
    if (trxType === "Substrate") {
      trxId = req.body.trxId;
    } else {
      // Generate a unique transaction ID using previous transaction type 000001,0000002, etc. with prefix based on transaction type
      const lastTransaction = await StockTransactions.findOne({ trxType }).sort({ trxDate: -1 });
      const lastTrxId = lastTransaction ? parseInt(lastTransaction.trxId.replace(prefixMap[trxType] || "TRX-", "")) : 0;
      trxId = `${prefixMap[trxType] || "TRX-"}${String(lastTrxId + 1).padStart(6, '0')}`;   
    }

    const stockTransaction = new StockTransactions({
      trxId,
      referenceId,
      trxDate,
      trxType,
      clientId,
      description,
      isAdded,
      items,
    });

    const savedTransaction = await stockTransaction.save();

    res.status(201).json({
      message: "Stock transaction saved successfully",
      data: savedTransaction,
    });

  } catch (err) {
    console.error(err); // ✅ IMPORTANT for debugging
    res.status(500).json({ message: err.message });
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
