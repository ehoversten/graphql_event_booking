import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {

  const handleLogout = () => {
    if(localStorage.getItem('id_token')) {
      localStorage.removeItem('id_token');
    }
    console.log("Logged Out");
  }

  return (
    <div>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Register</Link>
        <Link to='/'>Home</Link>
        <Link to='/events'>Events</Link>
        <Link to='/bookings'>Bookings</Link>
        <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navigation