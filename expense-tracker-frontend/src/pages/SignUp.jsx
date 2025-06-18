import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { signup } from "../api/api";

const handleSignup = async () => {
  const response = await signup({ name, email, password });
  if (response.message === "User registered successfully") {
    alert("Signup successful! Please sign in.");
  } else {
    alert(response.message);
  }
};


function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/signup", {
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
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
