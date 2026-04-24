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
      Payment: "PAY-",
    };

    let trxId;
    let savedTransaction;
    let isSaved = false;

    if (trxType === "Invoice" || trxType === "Payment") {
      while (!isSaved) {
        const lastTransaction = await VendorTransactions
          .findOne({ trxType })
          .sort({ trxId: -1 }); // ✅ FIXED

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
    res.json(vendorTransactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};