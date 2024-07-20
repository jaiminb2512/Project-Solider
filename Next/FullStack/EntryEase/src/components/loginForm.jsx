"use client";

import { useState } from "react";
import { login } from "@/actions";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const result = await login({ error: undefined }, formData);
 
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="username" 
        required 
        placeholder="username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="password" 
        name="password" 
        required 
        placeholder="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="login-btn">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
