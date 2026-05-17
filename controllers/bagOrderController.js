import BagOrder from "../models/BagOrder.js";

export const createBagOrder = async (req, res) => {
    try {
        // Generate date part (YYYYMMDD)
        const today = new Date();
        const datePart = today.toISOString().slice(0, 10).replace(/-/g, "");

        // Find latest order only for today's pattern
        const lastOrderNo = await BagOrder
        .findOne({
            orderNo: {
            $regex: `^OD-${datePart}-`,
            },
        })
        .sort({ createdAt: -1 });

        let sequence = 1;

        if (lastOrderNo?.orderNo) {
        const parts = lastOrderNo.orderNo.split("-");
        const lastSequence = parseInt(parts[2], 10) || 0;
        sequence = lastSequence + 1;
        }

        // Create order number
        const orderNumber = `OD-${datePart}-${String(sequence).padStart(3, "0")}`;

        // Create bag order with generated order number
        const bagOrder = await BagOrder.create({
            ...req.body,
            orderNo: orderNumber,
        });

        res.status(201).json(bagOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBagOrders = async (req, res) => {
    try {
        const bagOrders = await BagOrder.find();
        res.status(200).json(bagOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateBagOrder = async (req, res) => {
  try {
    const updatedBagOrder = await BagOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBagOrder) {
      return res.status(404).json({
        message: "Bag order not found",
      });
    }

    res.status(200).json(updatedBagOrder);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getBagOrderByOrderNo = async (req, res) => {
    try {
        const bagOrder = await BagOrder.findOne({ orderNo: req.params.orderNo });
        res.status(200).json(bagOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};