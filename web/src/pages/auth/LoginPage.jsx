import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { authorize } from "../../services/auth";

const extensionId = import.meta.env.VITE_CHROME_EXTENSION_ID;

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
    setErrors({});

    //validacija

    try {
      await authorize('login', formData, getUser);
      navigate('/');
    } catch (error) {
      console.log(error);
      setErrors(error.response?.data?.errors || "Login failed");
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