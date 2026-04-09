import mongoose from "mongoose";

const stockTransactionSchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      required: true,
      trim: true,
    },

    trxDate: {
        type: Date,
        required: true,
    },

    trxType: {
        type: String,
        required: true,
        trim: true,
        enum: ["grn"],
    },

    clientId: {
        type: String,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },
    
    isAdded: {
        type: Boolean,
        required: true,
    },

    items : [
        {
            stockId: {
                type: String,
                required: true,
                trim: true,
            },

            stockName: {
                type: String,
                required: true,
                trim: true,
            },

            quantity: {
                type: Number,
                required: true,
            },

            stockUOM: {
                type: String,
                trim: true,
            },

            stockCost: {
                type: Number,
                required: true,
            },

            stockPrice: {
                type: Number,
                required: true,
            }
        }
    ]
  },
  { timestamps: true }
);

const StockTransactions = mongoose.model("StockTransactions", stockTransactionSchema);
export default StockTransactions;