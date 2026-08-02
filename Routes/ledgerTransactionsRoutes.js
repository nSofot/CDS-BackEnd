import express from "express";

import { 
    createLedgerTransaction,
    updateLedgerTransaction, 
    deleteLedgerTransaction,
    getLedgerTransactionById,
    getLedgerTransactions,
    getDueLedgerTransactionsByAccountId,
    substractLedgerTrxDueAmount
} from "../controllers/ledgerTransactionsController.js";

const ledgerTransactionsRouter = express.Router();

ledgerTransactionsRouter.get("/", getLedgerTransactions);
ledgerTransactionsRouter.get("/:accountId", getLedgerTransactionById);
ledgerTransactionsRouter.post("/", createLedgerTransaction);
ledgerTransactionsRouter.put("/:transactionId", updateLedgerTransaction);
ledgerTransactionsRouter.delete("/:transactionId", deleteLedgerTransaction);
ledgerTransactionsRouter.get("/due/:accountId", getDueLedgerTransactionsByAccountId);
ledgerTransactionsRouter.put("/subtract/:transactionId", substractLedgerTrxDueAmount);


export default ledgerTransactionsRouter;
