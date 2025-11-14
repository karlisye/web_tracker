import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const postToBackend = async (email, password) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({email, password})
    });

    const data = await response.json();

    return { response, data };
    
  } catch (error) {
    console.error('Error sending to backend:', error);
    return null;
  }
}

const isEmailValid = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    if (!isEmailValid(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError("");
    const result = await postToBackend(email, password);
    if(!result) {
      setError('Server error')
    }

    const { response, data } = result;

    if(response.ok) {
      navigate('/dashboard')
    } else {
      setError(data.message);
    }
      
  };

  return (
    <section>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p>{error}</p>}

        <button type="submit">Log in</button>
        <button><Link to={'/register'}>Register instead</Link></button>
      </form>
    </section>
  );
};

export default LoginPage;
