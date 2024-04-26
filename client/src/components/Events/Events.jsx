import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../../utils/queries';

// function Events({ eventsList, error, loading }) {
function Events() {
  // console.log("Events List: ", eventsList);

  const {error, loading, data } = useQuery(GET_EVENTS);
  // console.log("Response: ", data)
  console.log("Data: ", data)
  console.log("Loading: ", loading)
  console.log("Error: ", error)
  

  if(loading) return (<h2>LOADING...</h2>)
  if(error) return (<h2>ERROR...</h2>)
  // if(!loading) {
  //   const { events } = data?.events || [];
  // }
  const events = data?.events || [];

  return (
    <div className='list-container'>
      {events?.length && events?.map(event => (
        <div className="event-card">
          <h3 className="event-title">Title: {event.title}</h3>
          <p className="event-desc">Desc: {event.description}</p>
          <p className="event-price">Price: {event.price}</p>
          <h5 className="event-date">Date: {event.date}</h5>
          <p className="event-creator">Created By: {event.creator.username}</p>
        </div>
      ))}
    </div>
  )
}

export default Events