import express from "express";
import {
    createBatchTransactions,
    getBatchTransactions,
    getBatchTransactionByBatchNo,
    getBatchTransactionByTrxId,
    subtractBatchTransactionsBalanceQuantity
} from "../controllers/batchTransactionsController.js";

const batchTransactionsRouter = express.Router();

batchTransactionsRouter.post("/", createBatchTransactions);
batchTransactionsRouter.get("/", getBatchTransactions);
batchTransactionsRouter.get("/:batchNo", getBatchTransactionByBatchNo);
batchTransactionsRouter.get("/trx/:trxId", getBatchTransactionByTrxId);
batchTransactionsRouter.put(
  "/subtract-balance-quantity/:batchNo/:bagStatus",
  subtractBatchTransactionsBalanceQuantity
);


export default batchTransactionsRouter;