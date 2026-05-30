import express from "express";

import {
    createLedgerHeaderAccount,
    getAllLedgerHeaderAccounts
} from "../controllers/ledgerHeaderAccountsController.js";

const ledgerHeaderAccountRouter = express.Router();

ledgerHeaderAccountRouter.post("/", createLedgerHeaderAccount);
ledgerHeaderAccountRouter.get("/", getAllLedgerHeaderAccounts);

export default ledgerHeaderAccountRouter;