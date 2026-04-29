import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    batchNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    batchDate: {
      type: Date,
      required: true,
    },

    numberOfBags: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: [
        "Substrate",
        "Sterilized",
        "Inoculated",
        "Incubating",
        "Fruiting",
        "Completed",
        "Rejected",
        "Sold",
      ],
      default: "Substrate",
    },

    sterilizationDate: {
      type: Date,
    },

    inoculationDate: {
      type: Date,
    },

    incubationDate: {
      type: Date,
    },

    soldDate: {
      type: Date,
    },

    materials: [
      {
        stockId: {
          type: String,
          required: true,
        },

        stockName: {
          type: String,
          required: true,
        },

        totalQty: {
          type: Number,
          default: 0,
        },

        stockUOM: {
          type: String,
        },

        stockCost: {
          type: Number,
          default: 0,
        },

        stockPrice: {
          type: Number,
          default: 0,
        },

        rowCostValue: {
          type: Number,
          default: 0,
        },

        rowTotalValue: {
          type: Number,
          default: 0,
        },
      },
    ],

    otherExpenses: [
      {
        expenseId: {
          type: String,
        },

        name: {
          type: String,
        },

        price: {
          type: Number,
          default: 0,
        },

        rowTotal: {
          type: Number,
          default: 0,
        },
      },
    ],

    totalCostValue: {
      type: Number,
      default: 0,
    },

    totalJobValue: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Batch", batchSchema);