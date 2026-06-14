import mongoose from "mongoose";

const chequeBookOutwardSchema = new mongoose.Schema({
    voucherId: {
        type: String,
        required: true,
        unique: true
    },
    vendorId: {
        type: String,
        required: true
    },
    voucherDate: {
        type: Date,
        required: true
    },
    chequeNumber: {
        type: String,
        required: false,
    },
    chequeDate: {
        type: Date,
        required: false,
    },
    chequeAmount: {
        type: Number,
        required: true
    },
    chequeStatus: {
        type: String,
        enum: ["Pending", "Cleared", "Bounced"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ChequeBookOutward = mongoose.model("ChequeBookOutward", chequeBookOutwardSchema);

export default ChequeBookOutward;