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
      {/* <div>EventDetail</div> */}
   
      <div className="current-card p-5 border-orange-600 rounded md:order-last" key={current._id}>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mr-5 flex-column content-center rounded-full bg-sky-900">
          <h3 className="current-title text-balance text-3xl font-bold underline decoration-sky-500 decoration-4 mb-4"> {current.title}</h3>
            <img
              className="mx-auto h-10 w-auto align-middle"
              src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
              alt="Your Company"
            />
          </div>
          <div className="desc-container bg-sky-600 rounded-md p-4 m-5 min-h-40">
            <p className="current-desc ">{current.description}</p>
          </div>
          <div className="event-card-info">
            <h4 className="current-date inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Date: {current.date}</h4>
            <h4 className="current-time inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Time: {current.time}</h4>
            <p className="current-price inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price: ${current.price}</p>
            <p className="current-attendees inline-block mr-5">Number of Attendees: {current.max_attendance}</p>
            <p className="current-creator inline-block">Created By: {current.creator.username}</p>

          </div>
          { isLoggedIn ? (
            <>
            <div className="btn-container flex flex-row justify-evenly">
              <button className="delete-event flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-800 shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 mt-5 mr-5" onClick={() => handleDelete(current._id)} value={current._id}>Delete</button>
              { current.isBooked ? (
                <button className="book-event flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-800 shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 mt-5" onClick={() => bookEvent(current._id)} value={current._id} disabled>EVENT BOOKED</button>
              ) : (
                <>
                  <button className="book-event flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-800 shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 mt-5" onClick={() => bookEvent(current._id)} value={current._id}>Book This!</button>
                </>
              )}
            </div>
            </>
          ) : "" }
        </div>
    </>
  )
}

export default EventDetail