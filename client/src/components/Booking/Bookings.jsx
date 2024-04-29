import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_BOOKINGS } from '../../utils/queries'

function Bookings() {

  const { error, loading, data } = useQuery(GET_BOOKINGS);

  if(error) return (<h2>Error: </h2>);
  if(loading) return (<h2>LOADING...</h2>);

  const bookings = data?.bookings || [];
  console.log("Bookings: ", bookings);

  return (
    <div className='booking-list-container'>
        <h2>Current Bookings</h2>
    </div>
  )
}

export default Bookings