import LedgerHeaderAccounts from "../models/ledgerHeaderAccounts.js";

export const createLedgerHeaderAccount = async (req, res) => {
console.log("Create Ledger Header Account Request Body:", req.body);  
  try {
    const accountType =
      req.body.accountType || "";

    if (!accountType) {
      return res.status(400).json({
        error: "accountType is required",
      });
    }

    const typeBaseMap = {
      Income: 101,
      Expense: 201,
      Asset: 301,
      Liability: 401,
      Equity: 501,
    };

    const baseNumber = typeBaseMap[accountType];

    if (!baseNumber) {
      return res.status(400).json({
        error: "Invalid accountType",
      });
    }

    // 🔥 FIXED SORT (important)
    const lastAccount = await LedgerHeaderAccounts.findOne({
      accountType: accountType,
    })
      .sort({ headerAccountId: -1 })
      .lean();

    let nextNumber = baseNumber;

    if (lastAccount?.headerAccountId) {
      const match = lastAccount.headerAccountId.match(/(\d+)$/);
      const lastNumber = match
        ? parseInt(match[1], 10)
        : baseNumber;

      nextNumber =
        lastNumber >= baseNumber
          ? lastNumber + 1
          : baseNumber;
    }

    const headerAccountId = `${String(nextNumber).padStart(3, "0")}`;

    const created = await LedgerHeaderAccounts.create({
      accountType: accountType,
      headerAccountId,
      headerAccountName: req.body.headerAccountName,
    });

    return res.status(201).json(created);
  } catch (error) {
    console.error("Create Ledger Header Account Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllLedgerHeaderAccounts = async (req, res) => {
  try {
    const accounts = await LedgerHeaderAccounts.find().lean();
    return res.status(200).json(accounts);
  } catch (err) {
    console.error("Error fetching ledger header accounts:", err);
    return res.status(500).json({
      message: "Failed to fetch ledger header accounts",
      error: err.message,
    });
  }
};