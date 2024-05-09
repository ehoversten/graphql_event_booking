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
        <div className="event-card p-5 flex justify-between" key={event._id} onClick={() => setChoice(event)}>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mr-5 flex-column content-center rounded-full bg-sky-900">
            <img
              className="mx-auto h-10 w-auto align-middle"
              src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
              alt="Your Company"
            />
          </div>
          <div className="event-info text-left flex-1">
            <h3 className="event-title mb-4"><span className='font-bold'>Event: </span> {event.title}</h3>
            <h4 className="event-date inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><span className='font-bold'>Date: </span> {event.date}</h4>
            <h4 className="event-time inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><span className='font-bold'>Time: </span> {event.time}</h4>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Events