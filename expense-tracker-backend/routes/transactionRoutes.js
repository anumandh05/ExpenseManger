const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Add Transaction
router.post("/add", async (req, res) => {
  const { type, amount, note, date, userId } = req.body;

  try {
    const newTransaction = new Transaction({
      type,
      amount,
      note,
      date,
      userId,
    });

    await newTransaction.save();
    res.status(201).json({ message: "Transaction added", transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: "Failed to add transaction", error });
  }
});

// Get Recent Transactions by userId
router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
});

module.exports = router;
