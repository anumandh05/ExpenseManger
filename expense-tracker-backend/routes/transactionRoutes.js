const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Add Transaction
router.post("/", async (req, res) => {
  const { userId, text, amount } = req.body;

  try {
    const newTransaction = new Transaction({ userId, text, amount });
    await newTransaction.save();
    res.status(201).json({ message: "Transaction added", transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: "Transaction failed", error });
  }
});

// Get Transactions by User ID
router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
});

module.exports = router;
