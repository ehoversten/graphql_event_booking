import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENTS } from '../../utils/queries';
import { REMOVE_EVENT } from '../../utils/mutations';

// function Events({ eventsList, error, loading }) {
function Events() {
  // console.log("Events List: ", eventsList);

  const {error, loading, data } = useQuery(GET_EVENTS);
  const [removeEvent, mutationData] = useMutation(REMOVE_EVENT);
  // console.log("Response: ", data)
  console.log("Query Data: ", data)
  console.log("Query Loading: ", loading)
  console.log("Query Error: ", error)
  
  
  if(loading) return (<h2>LOADING...</h2>)
  if(error) return (<h2>ERROR...</h2>)

  const events = data?.events || [];
  
  const handleDelete = async (_id) => {
    // console.log("ID: ", event.target);
    // console.log("Target: ", event.target.value);
    // console.log("ID: ", event._id);
    console.log("ID: ", _id);
    try {
      const { data } = await removeEvent({ variables: { id: _id }})
      console.log("Query Data: ", data)
      // console.log("Query Loading: ", loading)
      // console.log("Query Error: ", error)
    } catch (error) {
      console.log("Error: ", error)
    }
      

  }

  return (
    <div className='list-container'>
      {events?.length && events?.map(event => (
        <div className="event-card" key={event._id}>
          <h3 className="event-title">Title: {event.title}</h3>
          <p className="event-desc">Desc: {event.description}</p>
          <p className="event-price">Price: {event.price}</p>
          <h5 className="event-date">Date: {event.date}</h5>
          <p className="event-creator">Created By: {event.creator.username}</p>
          <button className="delete-event" onClick={() => handleDelete(event._id)} value={event._id}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default Events