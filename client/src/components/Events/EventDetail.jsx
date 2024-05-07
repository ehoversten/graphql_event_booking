import React from 'react'

function EventDetail({ current, isLoggedIn, removeEvent, newBooking }) {

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
    <>
      <div>EventDetail</div>
   
      <div className="current-card p-5" key={current._id}>
          <h3 className="current-title">Title: {current.title}</h3>
          <p className="current-desc">Desc: {current.description}</p>
          <p className="current-price">Price: {current.price}</p>
          <h4 className="current-date">Date: {current.date}</h4>
          <h4 className="current-time">Time: {current.time}</h4>
          <p className="current-attendees">Number of Attendees: {current.max_attendance}</p>
          <p className="current-creator">Created By: {current.creator.username}</p>
          { isLoggedIn ? (
            <>
              <button className="delete-event" onClick={() => handleDelete(current._id)} value={current._id}>Delete</button>
              <button className="book-event" onClick={() => bookEvent(current._id)} value={current._id}>Book This!</button>
            </>
          ) : "" }
        </div>
    </>
  )
}

export default EventDetail