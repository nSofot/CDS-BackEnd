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
        const stockIssueDetail = await StockIssueDetail.findOne({ issueReferenceId: req.params.issueReferenceId });
        res.json(stockIssueDetail);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
