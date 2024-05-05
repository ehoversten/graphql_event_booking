import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './components/Auth/Login/Login.jsx';
import Signup from './components/Auth/Signup/Signup.jsx';
import './index.css';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Landing from './components/Landing/Landing.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h2>Error Page!</h2>,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'events',
        element: <Dashboard />
      },
      {
        path: 'landing',
        element: <Landing />
      }
    ]
  }
])

// createRoot(document.getElementById('root')).render(
//   <RouterProvider router={router} />
// )


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

