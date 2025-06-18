import React, { useEffect, useState } from "react";
import "./RecentTransactions.css";
import { getTransactions, deleteTransaction, updateTransaction } from "../api/api";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ text: "", amount: "", type: "income" });

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
    if (userId) fetchTransactions();
  }, [userId]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmDelete) return;
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter((tx) => tx._id !== id));
    } catch (error) {
      alert("Failed to delete transaction");
    }
  };

  const handleEdit = (tx) => {
    setEditingId(tx._id);
    setEditForm({ text: tx.text, amount: tx.amount, type: tx.type });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    try {
      await updateTransaction(id, editForm);
      setEditingId(null);
      fetchTransactions();
    } catch (error) {
      alert("Failed to update transaction");
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
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{new Date(tx.createdAt).toLocaleString()}</td>
              {editingId === tx._id ? (
                <>
                  <td>
                    <input
                      name="amount"
                      value={editForm.amount}
                      onChange={handleEditChange}
                      type="number"
                    />
                  </td>
                  <td>
                    <input
                      name="text"
                      value={editForm.text}
                      onChange={handleEditChange}
                      type="text"
                    />
                  </td>
                  <td>
                    <select
                      name="type"
                      value={editForm.type}
                      onChange={handleEditChange}
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </td>
                  <td>
                    <button className="save-btn" onClick={() => handleEditSave(tx._id)}>
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ color: tx.type === "income" ? "green" : "red" }}>
                    ₹{tx.amount}
                  </td>
                  <td>{tx.text}</td>
                  <td>{tx.type}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(tx)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(tx._id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
