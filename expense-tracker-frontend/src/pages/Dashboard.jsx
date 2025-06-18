import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/api/transactions/${userId}`);
      const data = await res.json();

      if (res.ok) {
        setTransactions(data);
        const incomeSum = data
          .filter((t) => t.type === "income")
          .reduce((acc, t) => acc + t.amount, 0);
        const expenseSum = data
          .filter((t) => t.type === "expense")
          .reduce((acc, t) => acc + t.amount, 0);
        setIncome(incomeSum);
        setExpense(expenseSum);
      } else {
        alert("Failed to fetch transactions");
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="summary">
        <div className="card income">
          <h3>Total Income</h3>
          <p>₹{income}</p>
        </div>
        <div className="card expense">
          <h3>Total Expense</h3>
          <p>₹{expense}</p>
        </div>
        <div className="card balance">
          <h3>Balance</h3>
          <p>₹{income - expense}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
