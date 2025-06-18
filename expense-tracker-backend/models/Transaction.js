const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    text: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
