import express from "express";

import {
    createBatch,
    getBatches,
    getBatchByNo,
    updateBatch,
    updateBulkBatch,
    deleteBatch
} from "../controllers/batchController.js";

const batchRouter = express.Router();

batchRouter.post("/", createBatch);
batchRouter.get("/", getBatches);
batchRouter.put("/bulk-update", updateBulkBatch);
batchRouter.get("/:batchNo", getBatchByNo);
batchRouter.put("/:batchId", updateBatch);
batchRouter.delete("/:batchId", deleteBatch);

export default batchRouter;
