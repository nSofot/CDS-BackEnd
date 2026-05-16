import mongoose from "mongoose";

const batchTransactionSchema = new mongoose.Schema({
    trxId: {
        type: String,
        required: true,
        trim: true,
    },


    trxDate: {
        type: Date,
        required: true,
    },    

    batchNo: {
        type: String,
        required: true,
        trim: true,
    },

    trxType: {
        type: String,
        required: true,
        trim: true,
        enum: [
            "Sold",  
            "Substrate", 
            "Sterilized", 
            "Inoculated", 
            "Incubating", 
            "Fruiting", 
            "Completed", 
            "Rejected", 
        ],
    },
        
    bagStatus: {
        type: String,
        required: true,
        trim: true,
        enum: [
            "Substrate",
            "Sterilized",
            "Inoculated",
            "Incubating",
            "Fruiting",
        ],
    },

    bagQuantity: {
        type: Number,
        required: true,
    },

    balanceQuantity: {
        type: Number,
        default: 0,
    },

    clientId: {
        type: String,
        trim: true,
    },

    clientName: {
        type: String,
        trim: true,
    },
});

export default mongoose.model("BatchTransactions", batchTransactionSchema);