import { Outlet } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard';
import Navigation from './components/Navigation/Navigation'
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';
import Landing from './components/Landing/Landing';

function App() {

  return (
    <BrowserRouter>
      <h1>Welcome to the Events Booking Homepage</h1>
      <Navigation />
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/events' element={<Dashboard />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  )
  // return (
  //   <>
  //     <h1>Welcome to the Events Booking Homepage</h1>
  //     <Navigation />
  //     <Outlet />
  //   </>
  // )
}

export default App
