import express from "express";

import { 
  createMemberTransaction,
  getMemberTransactions,
  getMemberTransactionByMemberId
} from "../controllers/memberTransactionsController.js";

const memberTransactionsRouter = express.Router();

memberTransactionsRouter.post("/", createMemberTransaction);
memberTransactionsRouter.get("/", getMemberTransactions);
memberTransactionsRouter.get("/member/:memberId", getMemberTransactionByMemberId);

export default memberTransactionsRouter;