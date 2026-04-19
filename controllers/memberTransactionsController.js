import memberTransactions from '../models/memberTransactions.js';

export const createMemberTransaction = async (req, res) => {
  try {
    const { referenceId, trxDate, trxType, memberId, memberName, description, amount, dueAmount, isCredit } = req.body;

    const memberTransaction = new memberTransactions({
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
    res.status(500).json({ message: err.message });
  }
};

export const getMemberTransactions = async (req, res) => {
  try {
    const memberTransactions = await memberTransactions.find().sort({ trxDate: -1 });
    res.json(memberTransactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};