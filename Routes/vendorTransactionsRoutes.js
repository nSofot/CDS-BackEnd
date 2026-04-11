import express from "express";

import { 
  createVendorTransaction
} from "../controllers/vendorTransactionsController.js";

const router = express.Router();

router.post("/", createVendorTransaction);

export default router;
