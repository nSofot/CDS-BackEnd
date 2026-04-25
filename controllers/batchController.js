import batch from "../models/batch.js";

export const createBatch = async (req, res) => {
  try {
    // Start of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // End of today
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Date part => YYYYMMDD
    const today = new Date();
    const datePart = today.toISOString().slice(0, 10).replace(/-/g, "");

    // Find today's latest batch
    const lastBatch = await batch
      .findOne({
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
      .sort({ createdAt: -1 });

    let sequence = 1;

    if (lastBatch && lastBatch.batchNo) {
      // Example: SB-20260424-005
      const parts = lastBatch.batchNo.split("-");
      const lastSequence = parseInt(parts[2] || "0", 10);
      sequence = lastSequence + 1;
    }

    // Format => 001, 002, 003
    const paddedSequence = String(sequence).padStart(3, "0");

    // Final batch number
    const batchNumber = `SB-${datePart}-${paddedSequence}`;

    const newBatch = await batch.create({
      ...req.body,
      batchNo: batchNumber,
    });

    res.status(201).json({
      success: true,
      message: "Batch created successfully",
      data: newBatch,
    });
  } catch (error) {
    console.error("Create Batch Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create batch",
      error: error.message,
    });
  }
};


export const getBatches = async (req, res) => {
    try {
        const batches = await batch.find();
        res.status(200).json(batches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateBatch = async (req, res) => {
    try {
        const updatedBatch = await batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedBatch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBatch = async (req, res) => {
    try {
        const deletedBatch = await batch.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedBatch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBatchById = async (req, res) => {
    try {
        const batch = await batch.findById(req.params.id);
        res.status(200).json(batch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};