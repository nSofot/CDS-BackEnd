import MemberTransactions from '../models/memberTransactions.js';

export const createMemberTransaction = async (req, res) => {
  try {
    const {
      referenceId,
      trxDate,
      trxType,
      memberId,
      memberName,
      description,
      amount,
      dueAmount,
      isCredit,
    } = req.body;

    if (!trxType) {
      return res.status(400).json({ message: "Transaction type is required" });
    }

    let trxId = "";

    if (trxType === "Receipt") {
      const prefix = "REC-";

      const lastTransaction = await MemberTransactions.findOne({ trxType })
        .sort({ createdAt: -1 });

      let lastNumber = 0;

      if (lastTransaction?.trxId) {
        const numericPart = lastTransaction.trxId.replace(prefix, "");
        lastNumber = isNaN(parseInt(numericPart)) ? 0 : parseInt(numericPart);
      }

      trxId = `${prefix}${String(lastNumber + 1).padStart(6, "0")}`;
    } else {
      trxId = req.body.trxId;
    }

    const memberTransaction = new MemberTransactions({
      trxId,
      referenceId,
      trxDate,
      trxType,
      memberId,
      memberName,
      description,
      amount,
      dueAmount,
      isCredit,
    });

    const savedTransaction = await memberTransaction.save();

    res.status(201).json({
      message: "Member transaction saved successfully",
      data: savedTransaction,
    });
  } catch (err) {
    console.error("BACKEND ERROR:", err); // 🔥 important
    res.status(500).json({ message: err.message });
  }
};

export const getMemberTransactions = async (req, res) => {
  try {
    const transactions = await MemberTransactions.find().sort({ trxDate: -1 });

    res.json({
      success: true,
      data: transactions,
    });
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: err.message });
  }
};