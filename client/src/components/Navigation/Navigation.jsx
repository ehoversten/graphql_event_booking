import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

function Navigation() {

  const navRef = useRef()
  const auth = useContext(AuthContext);

  const showNav = () => {
    navRef.current.classList.toggle('hidden')
  }

  const handleLogout = () => {
    if(localStorage.getItem('id_token')) {
      // localStorage.removeItem('id_token');
      auth.logout();
    }
    console.log("Logged Out");
  }

  return (
    <div className='text-center mx-auto bg-sky-600 flex-col divide-y divide-slate-700 w-full min-h-8 relative'>
      {/* <!-- Hamburger Icon --> */}
      <svg
        xmlns="<http://www.w3.org/2000/svg>"
        id="menu-button"
        className="h-8 w-8 cursor-pointer md:hidden block end-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={showNav}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <div className="hidden w-full md:flex md:items-center md:w-auto md:justify-end" id="menu" ref={navRef}>
        <ul className="text-base text-gray-700 md:flex md:justify-between md:pt-0 divide-y divide-slate-700">
          <div className="link-row p-3 font-bold">
            <Link to='/' className='font-bold'>Home</Link>
          </div>
          <div className="link-row p-3">
            <Link to='/events' className='font-bold'>Events</Link>
          </div>

          { auth.user ? (
            <>
              <div className="link-row p-3">
                <Link to='/bookings' className='font-bold'>Bookings</Link>
              </div>
              <div className="link-row p-3">
                <a onClick={handleLogout} className='logout-btn font-bold'>Logout</a>
              </div>
            </>
          ) : (
            <>
              <div className="link-row p-3">
                <Link to='/login'>Login</Link>
              </div>
              <div className="link-row p-3">
                <Link to='/signup'>Register</Link>
              </div>
            </>
          )}
        </ul>
      </div>
      
    </div>
  )
}


export default Navigation