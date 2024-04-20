import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Register</Link>
        <Link to='/'>Home</Link>
        <Link to='/events'>Events</Link>
    </div>
  )
}

export default Navigation