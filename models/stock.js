import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    stockId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    stockCategory: {
        type: String,
        required: true,
        trim: true,
        enum: [
            "packing material",
            "substrate material", 
            "sterilizing material", 
            "inoculating material",
            "incubating material", 
            "finished products",
            "harvested products"
        ],
    },

    stockName: {
        type: String,
        required: true,
        trim: true,
    },

    stockDescription: {
        type: String,   
        trim: true,
    },

    stockQuantity: {
        type: Number,
        required: true,
    },

    stockUOM: {
        type: String,
        required: true,
        trim: true,
        enum: ["kg", "g", "L", "ml", "m", "cm", "pcs", "pack", "pkt", "btl", "box", "set", "bag"],
    },

    stockCost: {
        type: Number,
        required: true,
    },

    stockPrice: {
        type: Number,
        required: true,
    },

    labelledPrice: {
        type: Number,
    },

    baseQuantity: {
        type: Number,
    },

    stockImage: [
    {
        type: String,
        trim: true,
    },
    ],
  },
);

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;