import React from 'react'

function Events({ events, removeEvent, newBooking, setChoice }) {

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
    <div className='bg-sky-800 divide-y divide-slate-700'>
      { events.length == 0 ? <h3>No Current Events</h3> :
        events?.length && events?.map(event => (
        <div className="event-card p-5" key={event._id} onClick={() => setChoice(event)}>
          <h3 className="event-title">Title: {event.title}</h3>
          <h4 className="event-date">Date: {event.date}</h4>
          <h4 className="event-time">Time: {event.time}</h4>
        </div>
      ))}
    </div>
  )
}

export default Events