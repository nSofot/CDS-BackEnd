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

export const updateBulkBatch = async (req, res) => {
  try {
    const { batches } = req.body;

    if (!Array.isArray(batches) || batches.length === 0) {
      return res.status(400).json({ message: "No batches provided" });
    }

    const bulkOps = batches.map((batch) => {
      // ---------------- DYNAMIC DATE FIELD ----------------
      let dateField = {};

      switch (batch.status) {
        case "Sterilized":
          dateField.sterilizationDate = batch.sterilizationDate || new Date();
          break;

        case "Inoculated":
          dateField.inoculationDate = batch.inoculationDate || new Date();
          break;

        case "Incubating":
          dateField.incubationDate = batch.incubationDate || new Date();
          break;

        case "Sold":
          dateField.soldDate = batch.soldDate || new Date();
          break;

        default:
          break;
      }

      return {
        updateOne: {
          filter: { batchNo: batch.batchNo },
          update: {
            $set: {
              totalCostValue: batch.totalCostValue,
              totalJobValue: batch.totalJobValue,
              status: batch.status,
              ...dateField, // ✅ dynamically applied
            },
            $push: {
              materials: {
                $each: batch.materials || [],
              },
              otherExpenses: {
                $each: batch.otherExpenses || [],
              },
            },
          },
        },
      };
    });

    const result = await Batch.bulkWrite(bulkOps);

    return res.status(200).json({
      message: "Selected batches updated successfully",
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount,
    });

  } catch (error) {
    console.error("Bulk update error:", error);
    return res.status(500).json({ error: error.message });
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