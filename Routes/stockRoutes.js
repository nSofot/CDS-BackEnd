import express from "express";

import {
  createStock,
  getAllStocks,
  getStockById,
  updateStock,
  deleteStock,
  addBulkStock,
  reduceStockQuantity,
  searchStocks
} from "../controllers/stockController.js";

const stockRouter = express.Router();

stockRouter.post("/", createStock);
stockRouter.get("/", getAllStocks);
stockRouter.get("/search", searchStocks);
stockRouter.get("/:stockId", getStockById);
stockRouter.put("/:stockId", updateStock);
stockRouter.delete("/:stockId", deleteStock);
stockRouter.post("/bulk-add", addBulkStock);
stockRouter.post("/bulk-reduce", reduceStockQuantity);


export default stockRouter;