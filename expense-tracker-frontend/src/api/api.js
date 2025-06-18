const BASE_URL = "http://localhost:5000/api";

// Add Transaction
export const addTransaction = async (transactionData) => {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transactionData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add transaction");
  return data;
};

// Get Transactions
export const getTransactions = async (userId) => {
  const res = await fetch(`${BASE_URL}/transactions/${userId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch transactions");
  return data;
};

// Delete Transaction ✅
export const deleteTransaction = async (id) => {
  const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete transaction");
  return data;
};


