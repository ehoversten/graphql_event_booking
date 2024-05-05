import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_EVENTS, GET_EVENT } from '../../utils/queries';

function Landing() {

  const {error, loading, data } = useQuery(GET_EVENTS);
  // console.log("Response: ", data)

  // const { error, loading, data } = useQuery(GET_EVENT, { variables: { id: "66204ed0200991c2072b48c6"}})
  console.log("Data: ", data)
  console.log("Loading: ", loading)
  console.log("Error: ", error)


  return (
    <div className='p-5 border-2 border-sky-700 text-center'>
      <h1 className='text-2xl font-bold '>Welcome to BookIT - Explore Local Events!</h1>
      <div className="link-row p-3">
        <Link to='/events' className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-800 shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 mt-5">Check out the current events!</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Landing