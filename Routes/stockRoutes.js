import express from "express";

import {
  createStock,
  getAllStocks,
  getStockById,
  updateStock
} from "../controllers/stockController.js";

const stockRouter = express.Router();

stockRouter.post("/", createStock);
stockRouter.get("/", getAllStocks);
stockRouter.get("/:stockId", getStockById);
stockRouter.put("/:stockId", updateStock);

export default stockRouter;