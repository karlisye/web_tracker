import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Layout from "./layouts/Layout"
import RegisterPage from "./pages/auth/RegisterPage"
import LoginPage from "./pages/auth/LoginPage"
import { useContext } from "react"
import { AppContext } from "./context/AppContext"
import Home from "./pages/Home"

const App = () => {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/register" element={user ? <Dashboard/> : <RegisterPage/>} />
          <Route path="/login" element={user ? <Dashboard/> : <LoginPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App