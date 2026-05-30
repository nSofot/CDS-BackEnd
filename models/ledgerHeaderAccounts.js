import mongoose from "mongoose";

const ledgerHeaderAccountsSchema = new mongoose.Schema(
    {
        /* e.g. "100" */
        headerAccountId: { 
            type: String, 
            required: true, 
            unique: true 
        },

        /* Asset / Liability / Equity / Income / Expense */
        accountType: {
            type: String,
            required: true,
            enum: ["Asset", "Liability", "Equity", "Income", "Expense"],
        },

        /* Human-readable name */
        headerAccountName: { 
            type: String, 
            required: true 
        },        
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("LedgerHeaderAccounts", ledgerHeaderAccountsSchema);

        