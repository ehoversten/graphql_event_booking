import React from 'react';
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
    return (<h3>Error: {error}</h3>)
  }

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard