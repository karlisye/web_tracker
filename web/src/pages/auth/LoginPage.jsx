import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { authorize } from "../../services/auth";

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

    const currentErrors = {};

    if (!formData.email) currentErrors.email = ['Email field is required'];
    if (!formData.password) currentErrors.password = ['Password field is required'];

    if (Object.keys(currentErrors).length) {
      setErrors(currentErrors);
      return;
    }

    try {
      await authorize('login', formData, getUser);
      navigate('/');
    } catch (error) {
      setErrors(error.response?.data?.errors || { email:["Login failed"] });
    }
  }


  return (
    <>
      <h1 className="text-center text-4xl font-bold my-4">Login Page</h1>

      <div className="w-1/3 mx-auto p-2 rounded-md bg-indigo-100">
        <form className="flex flex-col gap-2" onSubmit={handleLogin}>
          <input
          className="bg-indigo-200 p-2 rounded-md"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 font-bold">{errors.email[0]}</p>}

          <input
          className="bg-indigo-200 p-2 rounded-md"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <p className="text-red-500 font-bold">{errors.password[0]}</p>}

          <div className="flex gap-2 justify-between">
            <button className="py-2 px-4 rounded-md bg-indigo-200 hover:bg-indigo-300 hover:cursor-pointer" type="submit">Login</button>
            <Link className="p-2 text-blue-500 underline" to={'/register'}>Register instead</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage