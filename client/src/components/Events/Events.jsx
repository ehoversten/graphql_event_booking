import React from 'react'

function Events({ events, removeEvent, newBooking }) {

  const handleDelete = async (_id) => {
    console.log("ID: ", _id);
    try {
      const { data } = await removeEvent({ variables: { id: _id }})
      // console.log("Query Data: ", data)
    } catch (error) {
      console.log("Error: ", error)
    }
  }
  
  const bookEvent = async (_id) => {
    console.log("ID: ", _id);
    try {
      await newBooking({ variables: { eventId: _id }})
    } catch (error) {

      console.log("Error: ", error)
    }
  }

  return (
    <div className='list-container'>
      { events.length == 0 ? <h3>No Current Events</h3> :
        events?.length && events?.map(event => (
        <div className="event-card" key={event._id}>
          <h3 className="event-title">Title: {event.title}</h3>
          <p className="event-desc">Desc: {event.description}</p>
          <p className="event-price">Price: {event.price}</p>
          <h4 className="event-date">Date: {event.date}</h4>
          <h4 className="event-time">Time: {event.time}</h4>
          <p className="event-attendees">Number of Attendees: {event.max_attendance}</p>
          <p className="event-creator">Created By: {event.creator.username}</p>
          <button className="delete-event" onClick={() => handleDelete(event._id)} value={event._id}>Delete</button>
          <button className="book-event" onClick={() => bookEvent(event._id)} value={event._id}>Book This!</button>
        </div>
      ))}
    </div>
  )
}

export default Events