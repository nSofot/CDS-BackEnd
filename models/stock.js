import e from "cors";
import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    stockId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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

    stockMSU: {
        type: String,
        required: true,
        trim: true,
        enum: ["kg", "g", "L", "ml", "pcs"],
    },

    stockCost: {
        type: Number,
        required: true,
    },

    stockPrice: {
        type: Number,
        required: true,
    },
  },
);

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;