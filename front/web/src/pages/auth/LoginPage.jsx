import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = "http://localhost:8000";

const LoginPage = () => {
  const navigate = useNavigate();
  const { getUser } = useContext(AppContext);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    //validacija
    
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post('/login', formData);
    const data = response.data;

    
    if (data.errors) {
      setErrors(data.errors);
      console.log(data.errors);
      return;
    }

    await getUser();

    navigate('/');
    console.log(data);

    // send token to extension
    if (window.chrome && chrome.runtime) {
      chrome.runtime.sendMessage(
        "pcgcfgmlofnnogmlooolkdjhhhmifbno",
        { type: 'auth-token', token: data.token },
        response => { console.log("Message sent to Chrome extension:", response) }
      );
    }

  }


  return (
    <>
      <h1>LoginPage</h1>
      <form onSubmit={handleLogin}>
        <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p>{errors.email[0]}</p>}

        <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {errors.password && <p>{errors.password[0]}</p>}

        <button type="submit">Login</button>
        <button><Link to={'/register'}>Register instead</Link></button>
      </form>
    </>
  )
}

export default LoginPage