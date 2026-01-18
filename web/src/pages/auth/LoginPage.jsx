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
    <div className="h-screen flex justify-center items-center">
      <section className="w-200 m-4">
        <h1 className="text-4xl font-bold my-4">Log In Page</h1>

        <div className="p-2 rounded-md bg-linear-to-br from-white to-slate-50 flex gap-2 shadow-md">
          <div className="flex-1 p-2">
            <div className="h-full bg-indigo-600 rounded-md px-8 py-40 text-white flex flex-col justify-center relative">
              <div className="absolute top-0 left-0 m-8">
                <span>WT</span>
              </div>

              <h2 className="text-2xl text-center font-bold">Welcome Back!</h2>
              <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full mb-4 mt-2" />

              <p className="text-sm">Please Log in to access all features provided by Web Tracker.</p>
            </div>
          </div>

          <div className="flex-1 p-2 flex items-center">
            <form className="flex flex-col gap-4 w-full p-8" onSubmit={handleLogin}>
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

              <div className="flex gap-2 justify-end">
                <Link className="text-blue-500 underline" to={'/register'}>Sign Up instead</Link>
              </div>

              <button className="text-white py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer shadow-md hover:shadow-lg transition duration-200" type="submit">Login</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LoginPage