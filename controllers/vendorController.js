import Vendor from "../models/vendor.js";

export const createVendor = async (req, res) => {
  try {
    const { vendorId, vendorName, vendorAddress, vendorContact, vendorEmail, vendorPhone, vendorDueAmount, vendorNote } = req.body;

    if (!vendorId || !vendorName || !vendorAddress || !vendorContact || !vendorEmail || !vendorPhone || !vendorDueAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const vendor = new Vendor({ vendorId, vendorName, vendorAddress, vendorContact, vendorEmail, vendorPhone, vendorDueAmount, vendorNote });
    const savedVendor = await vendor.save();
    res.status(201).json({ message: "Vendor saved successfully", data: savedVendor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVendorById = async (req, res) => {
  const { id } = req.params;
  try {
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const updated = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    const deleted = await Vendor.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json({ message: "Vendor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};