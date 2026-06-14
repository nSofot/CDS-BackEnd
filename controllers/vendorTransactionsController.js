import VendorTransactions from "../models/vendorTransactions.js";

export const createVendorTransaction = async (req, res) => {
  try {
    const {
      referenceId,
      trxDate,
      trxType,
      vendorId,
      vendorName,
      description,
      amount,
      dueAmount,
      isCredit,
    } = req.body;

    const prefixMap = {
      Invoice: "INV-",
      SupplierPayment: "SPM-",
    };

    let trxId;
    let savedTransaction;
    let isSaved = false;

    if (trxType === "Invoice" || trxType === "SupplierPayment") {
      while (!isSaved) {
        const lastTransaction = await VendorTransactions
          .findOne({ trxType })
          .sort({ createdAt: -1 }); // ✅ FIXED

        const lastTrxId = lastTransaction
          ? parseInt(
              lastTransaction.trxId.replace(
                prefixMap[trxType] || "TRX-",
                ""
              )
            )
          : 0;

        trxId = `${prefixMap[trxType] || "TRX-"}${String(lastTrxId + 1).padStart(6, "0")}`;

        try {
          const vendorTransaction = new VendorTransactions({
            trxId,
            referenceId,
            trxDate,
            trxType,
            vendorId,
            vendorName,
            description,
            amount,
            dueAmount,
            isCredit,
          });

          savedTransaction = await vendorTransaction.save();
          isSaved = true;

        } catch (err) {
          if (err.code === 11000) {
            console.log("Duplicate trxId, retrying...");
          } else {
            throw err;
          }
        }
      }
    } else {
      trxId = req.body.trxId;

      const vendorTransaction = new VendorTransactions({
        trxId,
        referenceId,
        trxDate,
        trxType,
        vendorId,
        vendorName,
        description,
        amount,
        dueAmount,
        isCredit,
      });

      savedTransaction = await vendorTransaction.save();
    }

    res.status(201).json({
      message: "Vendor transaction saved successfully",
      data: savedTransaction,
    });

  } catch (err) {
    console.error(err); // ✅ add this
    res.status(500).json({ message: err.message });
  }
};

export const getVendorTransactions = async (req, res) => {
  try {
    const vendorTransactions = await VendorTransactions.find().sort({ trxDate: -1 });
    res.json({
      success: true,
      data: vendorTransactions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getDueVendorTransactionByVendorId = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendorTransactions = await VendorTransactions.find({
       vendorId, 
       dueAmount: { $gt: 0 },
        trxType: { $in: ["Purchase"] },
      }).sort({ trxDate: -1 });
    res.json({
      success: true,
      data: vendorTransactions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export const substractDueAmount = async (req, res) => {
  try {
    const { trxId } = req.params;
    const { amount } = req.body;

    const transaction = await VendorTransactions.findOne({ trxId });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const amt = Number(amount || 0);

    if (amt <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    if (transaction.dueAmount < amt) {
      return res.status(400).json({ message: "Amount exceeds due amount" });
    }

    transaction.dueAmount -= amt;
    await transaction.save();

    res.json({
      message: "Amount subtracted successfully",
      updatedDueAmount: transaction.dueAmount,
    });

  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: err.message });
  }
};