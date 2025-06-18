import { Link, useNavigate } from "react-router-dom";
import "./Layout.css";

function Layout({ children }) {
  const isLoggedIn = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  return (
    <div className="layout">
      <header className="header">
        <h1 className="logo">Expense Tracker</h1>
        <nav className="nav">
          {!isLoggedIn ? (
            <>
              <Link to="/signup">Sign Up</Link>
              <Link to="/signin">Sign In</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/add">Add</Link>
              <Link to="/recent">Recent</Link>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>
      <main className="main">{children}</main>
    </div>
  );
}

export default Layout;
