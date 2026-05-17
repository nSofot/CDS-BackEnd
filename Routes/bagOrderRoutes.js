import express from "express";

import {
    createBagOrder,
    getBagOrders,
    updateBagOrder,
    getBagOrderByOrderNo
} from "../controllers/bagOrderController.js";

const bagOrderRouter = express.Router();

bagOrderRouter.post("/", createBagOrder);
bagOrderRouter.get("/", getBagOrders);
bagOrderRouter.get("/:orderNo", getBagOrderByOrderNo);
bagOrderRouter.put("/:id", updateBagOrder);

export default bagOrderRouter;