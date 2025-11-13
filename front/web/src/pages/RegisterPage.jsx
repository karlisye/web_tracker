import { useState } from "react"

const postToBackend = async (name, email, password) => {
  console.log('called');
  try {
    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    });

    if(!response.ok){
      console.error('Backend rejected register', response.status, await response.text());
    } else {
      console.log('Register recorded on backend: ', name, ' ', email, ' ', password);
    }
  } catch (error) {
    console.error('Error sending to backend: ', error);
  }
}

const RegisterPage = () => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handling')
    //validacija

    setError('');
    postToBackend(name, email, password);
  }


  return (
    <div>
        <h1>RegisterPage</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

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

            <button type="submit">Register</button>
        </form>
    </div>
  )
}

export default RegisterPage