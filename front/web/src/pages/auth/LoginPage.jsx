import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";


const LoginPage = () => {
  const {setToken} = useContext(AppContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    //validacija

    const response = await fetch('/api/login', {
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

      // send token to extension
      if (window.chrome && chrome.runtime) {
        chrome.runtime.sendMessage(
          "kgkngedhfflokdkjhcjehphiomalonjg",
          { token: data.token },
          (response) => {
            console.log("Message sent to Chrome extension:", response);
          }
        );
      }
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