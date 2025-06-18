import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTransaction.css";
import { addTransaction } from "../api/api";

const handleAdd = async () => {
  const userId = localStorage.getItem("userId");
  const data = { type, amount, note, date, userId };

  const response = await addTransaction(data);
  if (response.message === "Transaction added") {
    alert("Transaction added!");
    // optional: redirect or reset form
  } else {
    alert("Failed to add transaction");
  }
};


function AddTransaction() {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, type, amount: Number(amount), note, date }),
    });

    const data = await res.json();

    if (res.ok) {
      navigate("/recent");
    } else {
      alert(data.message || "Transaction failed");
    }
  };

  return (
    <div className="add-container">
      <h2>Add Transaction</h2>
      <form className="add-form" onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Note"
          required
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <input
          type="datetime-local"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransaction;
