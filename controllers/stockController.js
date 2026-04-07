import Stock from "../models/stock";

export const createStock = async (req, res) => {
  try {
    const { stockId, stockName, stockDescription, stockQuantity, stockMSU, stockCost, stockPrice } = req.body;

    if (!stockId || !stockName || !stockDescription || !stockQuantity || !stockMSU || !stockCost || !stockPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const stock = new Stock({ stockId, stockName, stockDescription, stockQuantity, stockMSU, stockCost, stockPrice });
    const savedStock = await stock.save();
    res.status(201).json({ message: "Stock saved successfully", data: savedStock });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStockById = async (req, res) => {
  const { id } = req.params;
  try {
    const stock = await Stock.findById(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStock = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedStock = await Stock.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.json({ message: "Stock updated successfully", data: updatedStock });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
