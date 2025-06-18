const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// ✅ Add Transaction
router.post("/", async (req, res) => {
  const { userId, text, amount, type } = req.body;

  if (!userId || !text || !amount || !type) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newTransaction = new Transaction({
      userId,
      text: text.trim(),
      amount: Number(amount),
      type,
    });

    await newTransaction.save();
    res.status(201).json({ message: "Transaction added", transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: "Transaction failed", error: error.message });
  }
});

// ✅ Get Transactions by userId
router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete transaction", error: error.message });
  }
});


module.exports = router;