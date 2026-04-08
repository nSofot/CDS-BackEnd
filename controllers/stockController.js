import Stock from "../models/stock.js";

export const createStock = async (req, res) => {
  try {
    const { stockId, stockName, stockDescription, stockQuantity, stockUOM, stockCost, stockPrice } = req.body;

    if (!stockId || !stockName || !stockDescription || !stockQuantity || !stockUOM || !stockCost || !stockPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const stock = new Stock({ stockId, stockName, stockDescription, stockQuantity, stockUOM, stockCost, stockPrice });
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
  try {
    const updated = await Stock.findOneAndUpdate(
      { stockId: req.params.stockId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const deleted = await Stock.findByIdAndDelete(req.params.stockId);

    if (!deleted) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json({ message: "Stock deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};