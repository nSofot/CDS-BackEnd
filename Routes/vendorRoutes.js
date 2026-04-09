import express from "express";

import {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
    addVendorDueAmount,
    reduceVendorDueAmount
} from "../controllers/vendorController.js";

const vendorRouter = express.Router();

vendorRouter.post("/", createVendor);
vendorRouter.get("/", getAllVendors);
vendorRouter.get("/:vendorId", getVendorById);
vendorRouter.put("/:id", updateVendor);
vendorRouter.delete("/:id", deleteVendor);
vendorRouter.post("/:vendorId/add-due", addVendorDueAmount);
vendorRouter.post("/:vendorId/reduce-due", reduceVendorDueAmount);

export default vendorRouter;