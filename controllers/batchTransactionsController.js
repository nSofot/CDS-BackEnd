import BatchTransactions from "../models/batchTransactions.js";

export const createBatchTransactions = async (req, res) => {
    try {
        const batchTransactions = await BatchTransactions.create(req.body);
        res.status(201).json(batchTransactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getBatchTransactions = async (req, res) => {
    try {
        const batchTransactions = await BatchTransactions.find();
        res.status(200).json(batchTransactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getBatchTransactionByBatchNo = async (req, res) => {
    try {
        const { batchNo } = req.params;
        const batchTransactions = await BatchTransactions.find({ batchNo });
        res.status(200).json(batchTransactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getBatchTransactionByTrxId = async (req, res) => {
    try {
        const { trxId } = req.params;
        const batchTransactions = await BatchTransactions.find({ trxId });
        res.status(200).json(batchTransactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const subtractBatchTransactionsBalanceQuantity = async (req, res) => {
    try {
        const { batchNo, bagStatus } = req.params;
        const { quantity } = req.body;

        const batchTransactions = await BatchTransactions.updateMany(
            { batchNo, bagStatus },
            { $inc: { balanceQuantity: -Number(quantity) } }
        );

        res.status(200).json(batchTransactions);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};