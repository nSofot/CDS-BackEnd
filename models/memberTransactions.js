import mongoose from "mongoose";

const memberTransactionSchema = new mongoose.Schema({
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
        enum: ["Invoice", "Payment", "Return"],
    },

    memberId: {
        type: String,
        required: true,
    },

    memberName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },

    isCredit: {
        type: Boolean,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    dueAmount: {
        type: Number,
        required: true, 
    }
}, { timestamps: true }
);

const MemberTransactions = mongoose.model("MemberTransactions", memberTransactionSchema);
export default MemberTransactions;