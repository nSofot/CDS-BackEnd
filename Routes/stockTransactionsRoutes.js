import express from "express";

import {
  createStockTransaction,
  getStockTransactions,
  getStockTransactionById,
  updateQuantityBalance
} from "../controllers/stockTransactionsController.js";

const stockTransactionsRouter = express.Router();

stockTransactionsRouter.post("/", createStockTransaction);
stockTransactionsRouter.get("/", getStockTransactions);
stockTransactionsRouter.get("/:transactionId", getStockTransactionById);
stockTransactionsRouter.put("/updateQuantityBalance", updateQuantityBalance);

export default stockTransactionsRouter;