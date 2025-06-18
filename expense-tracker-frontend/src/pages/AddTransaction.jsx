import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTransaction.css";

function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in. Please sign in again.");
      navigate("/signin");
      return;
    }

    if (!text.trim()) {
      alert("Please enter a description.");
      return;
    }

    const transaction = {
      userId,
      amount: Number(amount),
      type,
      text: text.trim(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Transaction added!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Failed to add transaction");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="add-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>Amount:</label>
        <input
          type="number"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />

        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label>About:</label>
        <textarea
          placeholder="Enter description..."
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit">Add --&gt;</button>
      </form>
    </div>
  );
}

export default AddTransaction;
