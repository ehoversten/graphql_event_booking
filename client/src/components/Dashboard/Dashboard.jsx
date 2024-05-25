import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_USER } from '../../utils/queries';

function Dashboard() {

  const { data, loading, error } = useQuery(GET_USERS);
  // const { data, loading, error } = useQuery(GET_USER, 
  //   { variables: 
  //     { email: "hopper@gmail.com" }
  //   });
  console.log("Response: ", data)
  // console.log("Data: ", data.data)
  // console.log("Loading: ", data.loading)
  // console.log("Error: ", data.error)

  if(loading) {
    return (<h3>LOADING...</h3>)
  }
  if(error) {
    console.log("Error: ", error);
    return (<h3>Error: </h3>)
  }

  return (
    <div className='p-5 border-2 border-sky-700 text-center'>
      <h1 className='text-2xl font-bold '>Dashboard</h1>
      {/* <div className="link-row p-3">
        <Link to='/dashboard/events'>Check out the current events!</Link>
      </div> */}
      <Outlet />
    </div>
  )
}

export default Dashboard