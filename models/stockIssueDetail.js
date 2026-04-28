import mongoose from "mongoose";

const stockIssueDetailSchema = new mongoose.Schema(
    {
        issueTrxId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        issueReferenceId: {
            type: String,
            required: true,
            trim: true,
        },

        issueDate: {
            type: Date,
            required: true,
        },

        items: [
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

                receivedTrxId: {
                    type: String,
                    required: true,
                    trim: true,
                },

                receivedDate: {
                    type: Date,
                    required: true,
                },
                
                receivedVendorId: {
                    type: String,
                    required: true,
                    trim: true,
                },
                
                issuedQuantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
    }
);
    
const StockIssueDetail = mongoose.model("StockIssueDetail", stockIssueDetailSchema);
export default StockIssueDetail;