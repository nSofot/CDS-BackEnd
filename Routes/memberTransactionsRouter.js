import express from "express";

import { 
  createMemberTransaction,
  getMemberTransactions,
  getMemberTransactionByMemberId,
  getMemberOutstandingTransactionByMemberId,
  substractDueAmount
} from "../controllers/memberTransactionsController.js";

const memberTransactionsRouter = express.Router();

memberTransactionsRouter.post("/", createMemberTransaction);
memberTransactionsRouter.get("/", getMemberTransactions);
memberTransactionsRouter.get("/member/:memberId", getMemberTransactionByMemberId);
memberTransactionsRouter.get("/outstanding/:memberId", getMemberOutstandingTransactionByMemberId)
memberTransactionsRouter.put("/subtract/:trxId", substractDueAmount);

export default memberTransactionsRouter;