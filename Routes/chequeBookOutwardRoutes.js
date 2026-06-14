import express from "express";
import {
    addOutwardCheque,
    getAllOutwardCheques,
    getOutwardChequeByChequeNo,
    getChequesByStatus,
    updateOutwardChequeStatus
} from "../controllers/chequeBookOutwardController.js";

const router = express.Router();

router.post("/", addOutwardCheque);
router.get("/", getAllOutwardCheques);
router.get("/:chequeNumber", getOutwardChequeByChequeNo);
router.get("/status/:status", getChequesByStatus);
router.put("/status/:chequeNumber", updateOutwardChequeStatus);

export default router;
