import VendorTransactions from "../models/vendorTransactions.js";

export const createVendorTransaction = async (req, res) => {
  try {
    const { referenceId, trxDate, trxType, vendorId, vendorName, description, amount, dueAmount, isCredit } = req.body;

    const vendorTransaction = new VendorTransactions({
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

    const savedTransaction = await vendorTransaction.save();

    res.status(201).json({
      message: "Vendor transaction saved successfully",
      data: savedTransaction,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};