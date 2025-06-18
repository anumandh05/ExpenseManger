import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { signin } from "../api/api";

const handleSignin = async () => {
  const response = await signin({ email, password });
  if (response.message === "Signin successful") {
    localStorage.setItem("userId", response.userId); // Save session
    navigate("/dashboard");
  } else {
    alert(response.message);
  }
};


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("userId", data.user._id);
      navigate("/dashboard");
    } else {
      alert(data.message || "Signin failed");
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
