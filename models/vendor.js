import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    vendorId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    vendorName: {
        type: String,
        required: true,
        trim: true,
    },

    vendorAddress: {
        type: String,   
        trim: true,
    },
    vendorContact: {
        type: String,
        required: true,
    },
    vendorEmail: {
        type: String,
        required: true,
    },
    vendorPhone: {
        type: String,
        required: true,
    },
    vendorDueAmount: {
        type: Number,
        required: true,
    },
    vendorNote: {
        type: String,
        trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;