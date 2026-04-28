import express from "express";

import {
    addStockIssueDetail,
    getAllStockIssueDetails,
    getStockIssueDetailByIssueTrxId,
    getStockIssueDetailByIssueReferenceId
} from "../controllers/stockIssueDetailController.js";

const stockIssueDetailRouter = express.Router();

stockIssueDetailRouter.post("/", addStockIssueDetail);
stockIssueDetailRouter.get("/", getAllStockIssueDetails);
stockIssueDetailRouter.get("/issue-trx/:issueTrxId", getStockIssueDetailByIssueTrxId);
stockIssueDetailRouter.get("/issue-reference/:issueReferenceId", getStockIssueDetailByIssueReferenceId);

export default stockIssueDetailRouter;