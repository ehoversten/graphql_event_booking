import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENTS, GET_EVENT } from '../../utils/queries';

function Landing() {

  // const {error, loading, data } = useQuery(GET_EVENTS);
  // console.log("Response: ", data)

  const { error, loading, data } = useQuery(GET_EVENT, { variables: { id: "66204ed0200991c2072b48c6"}})
  console.log("Data: ", data)
  console.log("Loading: ", loading)
  console.log("Error: ", error)


  return (
    <div>Landing</div>
  )
}

export default Landing