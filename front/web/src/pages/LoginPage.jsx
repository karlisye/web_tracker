import { useState } from "react";

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
    if (!response.ok) {
      console.error('Backend rejected login', response.status, await response.text());
    } else {
      console.log('Login recorded on backend:', email, ' ', password);
    }
    
  } catch (error) {
    console.error('Error sending to backend:', error);
  }
}

const isEmailValid = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
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

    postToBackend(email, password);
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
      </form>
    </section>
  );
};

export default LoginPage;
