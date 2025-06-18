import React, { useEffect, useState } from "react";
import "./RecentTransactions.css";
import { getTransactions, deleteTransaction } from "../api/api";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions(userId);
      setTransactions(response);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmDelete) return;

    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter((tx) => tx._id !== id));
    } catch (error) {
      alert("Failed to delete transaction");
      console.error(error);
    }
  };

  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Amount</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{new Date(tx.createdAt).toLocaleString()}</td>
              <td style={{ color: tx.type === "income" ? "green" : "red" }}>
                ₹{tx.amount}
              </td>
              <td>{tx.text}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(tx._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
