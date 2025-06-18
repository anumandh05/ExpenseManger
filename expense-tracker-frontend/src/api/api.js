const BASE_URL = "http://localhost:5000/api";

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

export const getTransactions = async (userId) => {
  const res = await fetch(`${BASE_URL}/transactions/${userId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch transactions");
  return data;
};
