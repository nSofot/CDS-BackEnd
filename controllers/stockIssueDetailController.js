import StockIssueDetail from "../models/stockIssueDetail.js";


export const addStockIssueDetail = async (req, res) => {
    try {
        const stockIssueDetail = await StockIssueDetail.create(req.body);
        res.json(stockIssueDetail);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export const getAllStockIssueDetails = async (req, res) => {
    try {
        const stockIssueDetails = await StockIssueDetail.find();
        res.json(stockIssueDetails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getStockIssueDetailByIssueTrxId = async (req, res) => {
    try {
        const stockIssueDetail = await StockIssueDetail.findOne({ issueTrxId: req.params.issueTrxId });
        res.json(stockIssueDetail);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export const getStockIssueDetailByIssueReferenceId = async (req, res) => {
  try {
    const stockIssueDetail = await StockIssueDetail.findOne({
      issueReferenceId: req.params.issueReferenceId
    });

    if (!stockIssueDetail) {
      return res.status(404).json({ message: "Stock issue detail not found" });
    }

    res.json(stockIssueDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateStockIssueDetailsByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        message: "Invalid items payload",
      });
    }

    const result = await StockIssueDetail.updateMany(
      { issueReferenceId: batchNumber },
      {
        $push: {
          items: { $each: items }, // ✅ append new items
        },
      }
    );

    return res.json({
      success: true,
      modifiedCount: result.modifiedCount,
      message: "Items appended successfully",
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};