import express from "express";

import {
    addStockIssueDetail,
    getAllStockIssueDetails,
    getStockIssueDetailByIssueTrxId,
    getStockIssueDetailByIssueReferenceId,
    updateStockIssueDetailsByBatchNumber
} from "../controllers/stockIssueDetailController.js";

const stockIssueDetailRouter = express.Router();

stockIssueDetailRouter.post("/", addStockIssueDetail);
stockIssueDetailRouter.get("/", getAllStockIssueDetails);
stockIssueDetailRouter.get("/issue-trx/:issueTrxId", getStockIssueDetailByIssueTrxId);
stockIssueDetailRouter.get("/issue-reference/:issueReferenceId", getStockIssueDetailByIssueReferenceId);
stockIssueDetailRouter.put("/batchNo/:batchNumber", updateStockIssueDetailsByBatchNumber);

export default stockIssueDetailRouter;