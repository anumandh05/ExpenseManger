import React, { useEffect, useState } from "react";
import "./RecentTransactions.css";
import { getTransactions } from "../api/api";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("userId"); // ✅ fetch userId from localStorage

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions(userId);
        setTransactions(response);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      }
    };

    if (userId) fetchTransactions();
  }, [userId]);

  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Amount</th>
              <th>Description</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentTransactions;
