import express from "express";

import { 
  createVendorTransaction,
  getVendorTransactions,
  getDueVendorTransactionByVendorId,
  substractDueAmount
} from "../controllers/vendorTransactionsController.js";

const router = express.Router();

router.post("/", createVendorTransaction);
router.get("/", getVendorTransactions);
router.get("/due/:vendorId", getDueVendorTransactionByVendorId);
router.put("/subtract/:trxId", substractDueAmount);

export default router;
