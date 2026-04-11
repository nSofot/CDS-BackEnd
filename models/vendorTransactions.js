import mongoose from "mongoose";

const vendorTransactionSchema = new mongoose.Schema(
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

    TrxType: {
        type: String,
        required: true,
        enum: ["Purchase", "Payment", "Return"],
    },

    vendorId: {
      type: String,
      required: true,
    },

    vendorName: {
        type: String,
        required: true,
    },

        description: {
        type: String,
        trim: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    dueAmount: {
        type: Number,
        required: true,
    },

    isCredit: {
        type: Boolean,
        required: true,
    },

  },
  { timestamps: true }
);

const VendorTransaction = mongoose.model("VendorTransaction", vendorTransactionSchema);
export default VendorTransaction;
