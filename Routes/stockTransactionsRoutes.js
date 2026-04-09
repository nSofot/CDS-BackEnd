import express from "express";

import {
  createStockTransaction,
  getStockTransactions,
  getStockTransactionById
} from "../controllers/stockTransactionsController.js";

const stockTransactionsRouter = express.Router();

stockTransactionsRouter.post("/", createStockTransaction);
stockTransactionsRouter.get("/", getStockTransactions);
stockTransactionsRouter.get("/:transactionId", getStockTransactionById);

export default stockTransactionsRouter;