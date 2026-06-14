import mongoose from "mongoose";

const cardPaymentSchema = new mongoose.Schema({
    trxId: {
        type: String,
        required: true,
    },
    trxDate: {
        type: Date,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    cardType: {
        type: String,
        required: true,
    },
    cardLast4Digits: {
        type: String,
        required: true,
    },
    approvalCode: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Approved", "Declined"],
        default: "Pending",
    },
}, { timestamps: true }
);

export default mongoose.model("CardPayment", cardPaymentSchema);