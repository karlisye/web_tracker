import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Layout from "./layouts/Layout"
import RegisterPage from "./pages/auth/RegisterPage"
import LoginPage from "./pages/auth/LoginPage"
import { useContext } from "react"
import { AppContext } from "./context/AppContext"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/user/Profile"
import ProfilePrivacy from "./pages/user/ProfilePrivacy"
import ProfileAccount from "./pages/user/ProfileAccount"

const App = () => {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/register" element={user ? <Dashboard/> : <RegisterPage/>} />
          <Route path="/login" element={user ? <Dashboard/> : <LoginPage/>} />
          <Route path="/profile" element={user ? <Profile/> : <LoginPage/>} >
            <Route index element={<Navigate to='/profile/account' />} />
            <Route path="/profile/account" element={<ProfileAccount />} />
            <Route path="/profile/privacy" element={<ProfilePrivacy />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App