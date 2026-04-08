import express from "express";

import {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor
} from "../controllers/vendorController.js";

const vendorRouter = express.Router();

vendorRouter.post("/", createVendor);
vendorRouter.get("/", getAllVendors);
vendorRouter.get("/:vendorId", getVendorById);
vendorRouter.put("/:id", updateVendor);
vendorRouter.delete("/:id", deleteVendor);

export default vendorRouter;