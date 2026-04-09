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

export const addBulkStock = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    for (const item of items) {
      await Stock.findOneAndUpdate(
        { stockId: item.stockId },
        {
          $inc: {
            stockQuantity: item.quantity, // increase stock
          },
          $set: {
            stockCost: item.stockCost,   // update latest cost
            stockPrice: item.stockPrice, // update selling price
          },
        },
        { new: true }
      );
    }

    res.status(200).json({ message: "Stock updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export async function reduceStockQuantity(req, res) {
  const { stockId } = req.params;
  const { quantity } = req.body;

  try {
    const stock = await Stock.findOne({ stockId });
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    if (stock.stockQuantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock quantity" });
    }

    stock.stockQuantity -= quantity;
    await stock.save();
    res.json({ message: "Stock quantity updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating stock quantity", error: err.message }); 
  } 
}