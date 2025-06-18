const BASE_URL = "http://localhost:5000/api";

// 1. SIGNUP
export const signup = async (userData) => {
  try {
    const res = await fetch(`${BASE_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (err) {
    console.error("Signup Error:", err);
  }
};

// 2. SIGNIN
export const signin = async (credentials) => {
  try {
    const res = await fetch(`${BASE_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  } catch (err) {
    console.error("Signin Error:", err);
  }
};

// 3. ADD TRANSACTION
export const addTransaction = async (transactionData) => {
  try {
    const res = await fetch(`${BASE_URL}/transactions/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData),
    });
    return await res.json();
  } catch (err) {
    console.error("Add Transaction Error:", err);
  }
};

// 4. GET TRANSACTIONS
export const getTransactions = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/transactions/${userId}`);
    return await res.json();
  } catch (err) {
    console.error("Get Transactions Error:", err);
  }
};
