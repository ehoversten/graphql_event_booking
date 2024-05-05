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
    <div className='text-center mx-auto bg-sky-600 flex-col divide-y divide-slate-700 w-full'>
      <div className="link-row p-3">
        <Link to='/login'>Login</Link>
      </div>
      <div className="link-row p-3">
        <Link to='/signup'>Register</Link>
      </div>
      <div className="link-row p-3">
        <Link to='/'>Home</Link>
      </div>
      <div className="link-row p-3">
        <Link to='/events'>Events</Link>
      </div>
      <div className="link-row p-3">
        <Link to='/bookings'>Bookings</Link>
      </div>
      <div className="link-row p-3">
        <a onClick={handleLogout} className='logout-btn'>Logout</a>
      </div>
    </div>
  )
}

export default Navigation