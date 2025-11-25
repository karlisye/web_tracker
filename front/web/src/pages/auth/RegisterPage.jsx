import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = 'http://localhost:8000';


const RegisterPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { getUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    //validacija

    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post('/register', formData);
    const data = response.data;

    if (data.errors) {
      setErrors(data.errors);
      console.log(data.errors);
      return;
    }

    await getUser();

    navigate('/');
    console.log(data)

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
        <h1>RegisterPage</h1>
        <form onSubmit={handleRegister}>
            <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p>{errors.name[0]}</p>}

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

            <input
            type="password"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
            />

            <button type="submit">Register</button>
            <button><Link to={'/login'}>Log in instead</Link></button>
        </form>
    </>
  )
}

export default RegisterPage