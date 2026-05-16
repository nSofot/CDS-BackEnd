import express from "express";

import {
    createBatch,
    getBatches,
    getBatchByNo,
    updateBatch,
    updateBulkBatch,
    reduceBatchBagBalanceQuantity,
    deleteBatch
} from "../controllers/batchController.js";

const batchRouter = express.Router();

batchRouter.post("/", createBatch);
batchRouter.get("/", getBatches);
batchRouter.put("/bulk-update", updateBulkBatch);
batchRouter.put("/reduce-batch-balance-bags", reduceBatchBagBalanceQuantity);
batchRouter.get("/:batchNo", getBatchByNo);
batchRouter.put("/:batchId", updateBatch);
batchRouter.delete("/:batchId", deleteBatch);

export default batchRouter;
