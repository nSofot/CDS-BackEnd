import Stock from "../models/stock.js";

export const createStock = async (req, res) => {
  try {
    const {
      stockCategory,
      stockName,
      stockDescription,
      stockQuantity,
      baseQuantity,
      stockUOM,
      stockCost,
      stockPrice,
    } = req.body;

    // Validation
    if (!stockCategory || !stockName || !stockUOM) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // Category-based prefix start values
    let startFrom = 1;

    if (stockCategory === "packing material") {
      startFrom = 1; // 001
    } else if (stockCategory === "substrate material") {
      startFrom = 1000; // 100
    } else if (stockCategory === "sterilizing material") {
      startFrom = 2000; // 200
    } else if (stockCategory === "inoculating material") {
      startFrom = 3000; // 300
    } else if (stockCategory === "incubating material") {
      startFrom = 4000; // 400
    } else if (stockCategory === "finished products") {
      startFrom = 5000; // 500
    } else {
      return res.status(400).json({
        message: "Invalid stock category",
      });
    }

    // Find latest stock for this category range
    let minRange = startFrom;
    let maxRange = startFrom + 999;

    if (startFrom === 1) {
      minRange = 1;
      maxRange = 999;
    }

    const allStocks = await Stock.find({});

    const filteredStocks = allStocks.filter((item) => {
      const numericId = Number(item.stockId);
      return numericId >= minRange && numericId <= maxRange;
    });

    let newStockId = startFrom;

    if (filteredStocks.length > 0) {
      const maxId = Math.max(
        ...filteredStocks.map((item) => Number(item.stockId))
      );
      newStockId = maxId + 1;
    }

    // Format as 3 digits
    const formattedStockId = String(newStockId).padStart(4, "0");

    // Create stock
    const stock = new Stock({
      stockId: formattedStockId,
      stockCategory,
      stockName,
      stockDescription,
      stockQuantity: Number(stockQuantity || 0),
      baseQuantity: Number(baseQuantity || 0),
      stockUOM,
      stockCost: Number(stockCost || 0),
      stockPrice: Number(stockPrice || 0),
    });

    const savedStock = await stock.save();

    res.status(201).json({
      message: "Stock saved successfully",
      data: savedStock,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
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

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { stockId: item.stockId },
        update: {
          $inc: {
            stockQuantity: Number(item.quantity || 0),
          },
          // $set: {
          //   stockCost: Number(item.stockCost || 0),
          //   stockPrice: Number(item.stockPrice || 0),
          // },
        },
        upsert: false, // change to true if you want auto-create
      },
    }));

    const result = await Stock.bulkWrite(bulkOps);

    return res.status(200).json({
      message: "Bulk stock updated successfully",
      result,
    });

  } catch (err) {
    console.error("BULK STOCK ERROR:", err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export async function reduceStockQuantity(req, res) {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { stockId: item.stockId },
        update: {
          $inc: {
            stockQuantity: -Math.abs(Number(item.quantity || 0)), // always reduce
          },
        },
      },
    }));

    const result = await Stock.bulkWrite(bulkOps);

    return res.status(200).json({
      message: "Stock quantities reduced successfully",
      result,
    });

  } catch (err) {
    console.error("BULK REDUCE STOCK ERROR:", err);
    return res.status(500).json({
      message: "Error reducing stock quantities",
      error: err.message,
    });
  }
}