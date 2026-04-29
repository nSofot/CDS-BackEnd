import express from "express";

import {
    createBatch,
    getBatches,
    getBatchByNo,
    updateBatch,
    deleteBatch
} from "../controllers/batchController.js";

const batchRouter = express.Router();

batchRouter.post("/", createBatch);
batchRouter.get("/", getBatches);
batchRouter.get("/:batchNo", getBatchByNo);
batchRouter.put("/:batchId", updateBatch);
batchRouter.delete("/:batchId", deleteBatch);

export default batchRouter;
