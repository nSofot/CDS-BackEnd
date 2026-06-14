import express from "express";

import {
    createCardPayment,
    getCardPayments
} from "../controllers/cardPaymentsController.js";

const cardPaymentRouter = express.Router();

cardPaymentRouter.post("/", createCardPayment);
cardPaymentRouter.get("/", getCardPayments);

export default cardPaymentRouter;