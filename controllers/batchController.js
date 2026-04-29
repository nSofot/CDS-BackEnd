import Batch from "../models/batch.js";

export const createBatch = async (req, res) => {
  try {
    const today = req.body.trxDate ? new Date(req.body.trxDate) : new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const datePart = `${year}${month}${day}`;

    // Find latest batch only for today's pattern
    const lastBatch = await Batch
      .findOne({
        batchNo: {
          $regex: `^SB-${datePart}-`,
        },
      })
      .sort({ createdAt: -1 });

    let sequence = 1;

    if (lastBatch?.batchNo) {
      const parts = lastBatch.batchNo.split("-");
      const lastSequence = parseInt(parts[2], 10) || 0;
      sequence = lastSequence + 1;
    }

    const batchNumber = `SB-${datePart}-${String(sequence).padStart(3, "0")}`;

    const newBatch = await Batch.create({
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
        const batches = await Batch.find();
        res.status(200).json(batches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateBatch = async (req, res) => {
  try {
    const updatedBatch = await Batch.findByIdAndUpdate(
      req.params.batchId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedBatch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBatch = async (req, res) => {
  try {
    const deletedBatch = await Batch.findByIdAndDelete(req.params.batchId);
    res.status(200).json(deletedBatch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getBatchByNo = async (req, res) => {
  try {
    const { batchNo } = req.params;

    const foundBatch = await Batch.findOne({ batchNo });

    if (!foundBatch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(200).json(foundBatch);
  } catch (error) {
    console.error("Batch fetch error:", error);
    res.status(500).json({ message: error.message });
  }
};