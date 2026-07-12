import express from "express";

import { 
  createMemberTransaction,
  getMemberTransactions,
  getMemberTransactionByMemberId,
  getMemberOutstandingTransactionByMemberId,
  substractDueAmount,
  getMemberReceiptTransactions
} from "../controllers/memberTransactionsController.js";

const memberTransactionsRouter = express.Router();

memberTransactionsRouter.post("/", createMemberTransaction);
memberTransactionsRouter.get("/", getMemberTransactions);
memberTransactionsRouter.get("/member/:memberId", getMemberTransactionByMemberId);
memberTransactionsRouter.get("/outstanding/:memberId", getMemberOutstandingTransactionByMemberId)
memberTransactionsRouter.get("/receipt", getMemberReceiptTransactions);
memberTransactionsRouter.put("/subtract/:trxId", substractDueAmount);

export default memberTransactionsRouter;