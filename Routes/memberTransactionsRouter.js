import express from "express";

import { 
  createMemberTransaction,
  getMemberTransactions
} from "../controllers/memberTransactionsController.js";

const memberTransactionsRouter = express.Router();

memberTransactionsRouter.post("/", createMemberTransaction);
memberTransactionsRouter.get("/", getMemberTransactions);

export default memberTransactionsRouter;