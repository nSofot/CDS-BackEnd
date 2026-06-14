import CardPayment from "../models/cardPayments.js";

export const getCardPayments = async (req, res) => {
  try {
    const data = await CardPayment.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCardPayment = async (req, res) => {
  try {
    const newCardPayment = await CardPayment.create(req.body);
    res.status(201).json(newCardPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};