import { isAdmin } from "./userController.js";
import LedgerAccounts from "../models/ledgerAccounts.js";

export async function createLedgerAccount(req, res) {
  try {
    // if (!(await isAdmin(req))) {
    //   return res.status(403).json({
    //     message: "You are not authorized to add ledger account",
    //   });
    // }

    const { accountName, accountType, headerAccountId } = req.body;

    if (!accountName) {
      return res.status(400).json({ message: "Account name is required" });
    }

    if (!accountType) {
      return res.status(400).json({ message: "Account type is required" });
    }

    if (!headerAccountId) {
      return res.status(400).json({ message: "Header account is required" });
    }

    // 🔥 SAFE REGEX ESCAPE
    const safeHeaderId = headerAccountId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // 🔥 Get all accounts under header (more reliable than sorting string)
    const lastAccount = await LedgerAccounts
      .findOne({ accountId: new RegExp(`^${safeHeaderId}-`) })
      .sort({ createdAt: -1 }) // safer than accountId sorting
      .lean();

    let nextNumber = 1;

    if (lastAccount?.accountId) {
      const parts = lastAccount.accountId.split("-");
      const lastNumber = parseInt(parts[1] || "0", 10);
      nextNumber = lastNumber + 1;
    }

    const accountId = `${headerAccountId}-${String(nextNumber).padStart(4, "0")}`;

    const newAccount = new LedgerAccounts({
      accountId,
      accountType,
      accountName,
      headerAccountId,
      accountBalance: 0,
      createdBy: req.user?.username || "system",
    });

    await newAccount.save();

    return res.status(201).json({
      message: "Ledger account created successfully",
      account: newAccount,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Duplicate account ID. Try again.",
      });
    }

    console.error("Error creating ledger account:", err);

    return res.status(500).json({
      message: "Failed to create ledger account",
      error: err.message,
    });
  }
}


export async function getLedgerAccounts(req, res) {
    try {
        const accounts = await LedgerAccounts.find().lean();
        return res.status(200).json(accounts);
    } catch (err) {
        console.error("Error fetching ledger accounts:", err);
        return res.status(500).json({
            message: "Failed to fetch ledger accounts",
            error: err.message
        });
    }
}


export async function getLedgerAccountById(req, res) {
    const { accountId } = req.params;
    try {
        const account = await LedgerAccounts.findOne({ accountId }).lean();
        return res.status(200).json(account);
    } catch (err) {
        console.error("Error fetching ledger account:", err);
        return res.status(500).json({
            message: "Failed to fetch ledger account",
            error: err.message
        });
    }
}


export async function updateLedgerAccount(req, res) {
    const { accountId } = req.params;
    try {
        const updatedAccount = await LedgerAccounts.findOneAndUpdate({ accountId }, req.body, { new: true });
        return res.status(200).json(updatedAccount);
    } catch (err) {
        console.error("Error updating ledger account:", err);
        return res.status(500).json({
            message: "Failed to update ledger account",
            error: err.message
        });
    }
}



export async function addLederAccountBalance(req, res) {
  const { updates } = req.body;

  if (!updates || !Array.isArray(updates)) {
    return res.status(400).json({ message: "updates array is required" });
  }

  try {
    const updatePromises = updates.map(async ({ accountId, amount }) => {

    const amt = Number(amount);
    const account = await LedgerAccounts.findOne({ accountId });
    if (!account) throw new Error(`Ledger account not found: ${accountId}`);
    if (isNaN(account.accountBalance)) account.accountBalance = 0;


      if (!accountId || isNaN(amt)) {
        throw new Error(`Invalid data for accountId: ${accountId}`);
      }

      return LedgerAccounts.updateOne(
        { accountId },
        { $inc: { accountBalance: Math.abs(amt) }, $set: { updatedAt: new Date() } }
      );
    });

    await Promise.all(updatePromises);
    res.json({ message: "Account balances added successfully" });
  } catch (err) {
    console.error("Bulk addition failed:", err);
    res.status(500).json({ message: "Failed to add account balance", error: err.message });
  }
}


export async function subtractLedgerAccountBalance(req, res) {
  const { updates } = req.body;

  console.log("Subtracting balances:", updates);

  // ================= VALIDATION =================
  if (!updates || !Array.isArray(updates)) {
    return res.status(400).json({
      message: "updates array is required",
    });
  }

  try {
    // ================= PROCESS UPDATES =================
    const results = await Promise.all(
      updates.map(async ({ accountId, amount }) => {

        // Validate input
        if (!accountId || typeof amount !== "number") {
          throw new Error(`Invalid data for accountId: ${accountId}`);
        }

        // Find ledger account
        const account = await LedgerAccounts.findOne({ accountId });

        if (!account) {
          throw new Error(`Account not found: ${accountId}`);
        }

        // ================= UPDATE BALANCE =================
        account.accountBalance =
          (account.accountBalance || 0) - Math.abs(amount);

        account.updatedAt = new Date();

        // Save document (safe, triggers schema correctly)
        return await account.save();
      })
    );

    res.json({
      message: "Account balances subtracted successfully",
      data: results,
    });

  } catch (err) {
    console.error("Balance subtraction failed:", err);

    res.status(500).json({
      message: err.message || "Failed to subtract account balance",
    });
  }
}

 

export async function deleteLedgerAccount(req, res) {
    const { accountId } = req.params;
    try {
        const deletedAccount = await LedgerAccounts.findOneAndDelete({ accountId });
        return res.status(200).json(deletedAccount);
    } catch (err) {
        console.error("Error deleting ledger account:", err);
        return res.status(500).json({
            message: "Failed to delete ledger account",
            error: err.message
        });
    }
}