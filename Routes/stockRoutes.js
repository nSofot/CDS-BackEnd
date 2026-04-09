import express from "express";

import {
  createStock,
  getAllStocks,
  getStockById,
  updateStock,
  deleteStock,
  addBulkStock,
  reduceStockQuantity
} from "../controllers/stockController.js";

const stockRouter = express.Router();

stockRouter.post("/", createStock);
stockRouter.get("/", getAllStocks);
stockRouter.get("/:stockId", getStockById);
stockRouter.put("/:stockId", updateStock);
stockRouter.delete("/:stockId", deleteStock);
stockRouter.post("/bulk-add", addBulkStock);
stockRouter.post("/:stockId/reduce", reduceStockQuantity);

export default stockRouter;