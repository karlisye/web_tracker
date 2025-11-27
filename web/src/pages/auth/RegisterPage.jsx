import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { authorize } from "../../services/auth";

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
    setErrors({});

    //validacija
    
    try {
      await authorize('register', formData, getUser);
      navigate('/');
    } catch (error) {
      console.log(error);
      setErrors(error.response?.data?.errors || "Registration failed");
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