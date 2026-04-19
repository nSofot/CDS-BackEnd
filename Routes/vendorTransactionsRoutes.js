import express from "express";

import { 
  createVendorTransaction,
  getVendorTransactions
} from "../controllers/vendorTransactionsController.js";

const router = express.Router();

router.post("/", createVendorTransaction);
router.get("/", getVendorTransactions);

export default router;
