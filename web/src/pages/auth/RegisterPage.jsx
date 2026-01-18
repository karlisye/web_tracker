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
    <div className="h-screen flex justify-center items-center">
      <section className="w-200 m-4">
        <h1 className="text-4xl font-bold my-4">Sign Up Page</h1>

        
        <div className="p-2 rounded-md bg-linear-to-br from-white to-slate-50 flex gap-2 shadow-md">
          <div className="flex-1 p-2">
            <div className="h-full bg-indigo-600 rounded-md px-8 py-40 text-white flex flex-col justify-center relative">
              <div className="absolute top-0 left-0 m-8">
                <span>WT</span>
              </div>

              <h2 className="text-2xl text-center font-bold">Welcome to Web Tracker!</h2>
              <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full mb-4 mt-2" />

              <p className="text-sm">Sign up and start tracing your digital footprint today!</p>
            </div>
          </div>

          <div className="flex-1 p-2 flex items-center">
            <form className="flex flex-col gap-4 w-full p-8" onSubmit={handleRegister}>
              <div>
                <input
                className={`border-l-6 p-2 rounded-md shadow-md w-full ${errors.name ? 'outline-1 outline-red-500 border-red-500' : 'border-indigo-600'}`}
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <p className="text-red-500 font-bold">{errors.name[0]}</p>}
              </div>

              <div>
                <input
                className={`border-l-6 p-2 rounded-md shadow-md w-full ${errors.email ? 'outline-1 outline-red-500 border-red-500' : 'border-indigo-600'}`}
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="text-red-500 font-bold">{errors.email[0]}</p>}
              </div>
              <div>
                <input
                className={`border-l-6 p-2 rounded-md shadow-md w-full ${errors.password ? 'outline-1 outline-red-500 border-red-500' : 'border-indigo-600'}`}
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {errors.password && <p className="text-red-500 font-bold">{errors.password[0]}</p>}
              </div>

              <div>
                <input
                className='border-l-6 p-2 rounded-md shadow-md w-full border-indigo-600'
                type="password"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Link className="p-2 text-blue-500 underline" to={'/login'}>Log in instead</Link>
              </div>

              <button className="text-white py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer shadow-md hover:shadow-lg transition duration-200" type="submit">Register</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RegisterPage