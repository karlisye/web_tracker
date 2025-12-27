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

    const currentErrors = {};

    if (!formData.name.trim()) currentErrors.name = ['Name field is required'];
    else if (formData.name.trim().length < 3) currentErrors.name = ['Name field is too short'];

    if (!formData.email.trim()) currentErrors.email = ['Email field is required'];
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) currentErrors.email = ['Incorect email'];

    if (!formData.password.trim()) currentErrors.password = ['Password field is required'];
    else if (formData.password.trim().length < 8) currentErrors.password = ['Password has to contain at least 8 symbols'];
    else if (!/[A-Z]/.test(formData.password)) currentErrors.password = ['Password has to contain uppercase letters'];
    else if (!/[a-z]/.test(formData.password)) currentErrors.password = ['Password has to contain lowercase letters'];
    else if (!/\d/.test(formData.password)) currentErrors.password = ['Password has to contain numbers'];
    else if (!/[^A-Za-z0-9]/.test(formData.password)) currentErrors.password = ['Password has to contain special characters'];

    else if (formData.password !== formData.password_confirmation) currentErrors.password = ['Passwords must match'];

    if (Object.keys(currentErrors).length) {
      setErrors(currentErrors);
      return;
    }
    
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
        <h1 className="text-center text-4xl font-bold my-4">RegisterPage</h1>

        <div className="w-1/3 mx-auto p-2 rounded-md bg-indigo-100">
          <form className="flex flex-col gap-2" onSubmit={handleRegister}>
              <input
              className="bg-indigo-200 p-2 rounded-md"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <p className="text-red-500 font-bold">{errors.name[0]}</p>}

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

              <input
              className="bg-indigo-200 p-2 rounded-md"
              type="password"
              placeholder="Confirm Password"
              value={formData.password_confirmation}
              onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
              />

              <div className="flex gap-2 justify-between">
                <button className="py-2 px-4 rounded-md bg-indigo-200 hover:bg-indigo-300 hover:cursor-pointer" type="submit">Register</button>
                <Link className="p-2 text-blue-500 underline" to={'/login'}>Log in instead</Link>
              </div>
          </form>
        </div>
    </>
  )
}

export default RegisterPage