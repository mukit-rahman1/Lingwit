import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'
import './index.css'
import {
  Link,
  Route,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import LandingPage from './pages/landingPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import RegisterPage from './pages/registerPage.jsx'
import HomePage from './pages/homePage.jsx'
import FrenchPage from './pages/frenchPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/homepage",
    element: <HomePage />
  },
  {
    path: "/french",
    element: <FrenchPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
