import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/register', element: <RegisterPage/>},
  {path: '/login', element: <LoginPage/>},
  {path: '/dashboard', element: <Dashboard/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)