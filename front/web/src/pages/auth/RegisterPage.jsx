import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";


const RegisterPage = () => {
  const {setToken} = useContext(AppContext);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    //validacija

    const response = await fetch('/api/register', {
      method: 'post',
      body: JSON.stringify(formData)
    });

    const data = await response.json()
    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem('token', data.token);
      setToken(data.token)
      navigate('/');
      console.log(data)
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