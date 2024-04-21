import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../../utils/queries';

function Events() {

    const {error, loading, data } = useQuery(GET_EVENTS);
    // console.log("Response: ", data)
    console.log("Data: ", data)
    console.log("Loading: ", loading)
    console.log("Error: ", error)
  return (
    <div>Events</div>
  )
}

export default Events