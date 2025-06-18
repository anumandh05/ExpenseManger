import React, { useEffect, useState } from "react";
import "./RecentTransactions.css";
import { getTransactions } from "../api/api";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        setTransactions(response.data);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Amount</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{new Date(tx.date).toLocaleString()}</td>
              <td style={{ color: tx.type === "income" ? "green" : "red" }}>
                ₹{tx.amount}
              </td>
              <td>{tx.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
