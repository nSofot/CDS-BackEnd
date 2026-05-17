import mongoose from "mongoose";

const bagOrderSchema = new mongoose.Schema(
  {
    orderNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    orderDate: {
        type: Date,
        required: true,
    },

    orderRequestedDate: {
        type: Date,
        required: true,
    },

    orderBagStatus: {
        type: String,
        required: true,
        trim: true,
        enum: [        
            "Substrate",
            "Sterilized",
            "Inoculated",
            "Incubating",
        ],
    },

    orderQuantity: {
        type: Number,
        required: true,
    },

    memberId: {
        type: String,
        required: true,
        trim: true,
    },

    memberName: {
        type: String,
        required: true,
        trim: true,
    },

    orderStatus: {
        type: String,
        required: true,
        trim: true,
        enum: ["Pending", "Cancelled", "Approved", "Rejected", "Completed", "Delivered", "Discarded"],
    },

    orderApprovedRejectedBy: {
        type: String,
        trim: true,
    },

    orderApprovedRejectedDate: {
        type: Date,
    },

    orderCompletedDate: {
        type: Date,
    },

    orderDeliveredDate: {
        type: Date,
    },

    batchId: {
        type: String,
        trim: true,
    },

    orderRemarks: {
        type: String,
        trim: true,
    },
  },
  {
    timestamps: true,
}
);

export default mongoose.model("BagOrder", bagOrderSchema);