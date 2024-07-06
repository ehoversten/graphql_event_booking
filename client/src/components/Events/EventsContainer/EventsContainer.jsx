import React, { useContext, useState, useEffect } from 'react'
import EventForm from '../EventForm/EventForm'
import Events from '../Events';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENTS } from '../../../utils/queries';
import { ADD_EVENT, REMOVE_EVENT, ADD_BOOKING } from '../../../utils/mutations';
import EventDetail from '../EventDetail';
import { EventContext } from '../../../context/eventContext';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer, toast } from 'react-toastify';

function EventsContainer() {
  const token = localStorage.getItem('id_token');
  const notify = () => toast("New Event Created")
  const notifyBooked = () => toast("Event Booked!")
  const notifyErr = () => toast("An Error Occurred")
  const notifyRmv = () => toast("Event was removed")
  // const [currentEvent, setCurrentEvent] = useState(null);

  // const { events, currentEvent } = useContext(EventContext);
  const [state, dispatch] = useContext(EventContext);

  // GET CURRENT USERS EVENTS
  // if token --> query GET_USERS_EVENTS($userId)

  

  // GET ALL EVENTS 
  const {error, loading, data } = useQuery(GET_EVENTS);
  const [addNewEvent, addEventData] = useMutation(ADD_EVENT, {
    refetchQueries: [
      GET_EVENTS,
      'Events'
    ]
  });
  
  const [removeEvent, removeEventData] = useMutation(REMOVE_EVENT, {
    refetchQueries: [
      GET_EVENTS,
      'Events'
    ]
  });

  const [newBooking, bookingData] = useMutation(ADD_BOOKING, {
    refetchQueries: [
      GET_EVENTS,
      'Events'
    ]
  });

  useEffect(() => {
    if(data) {
      dispatch({
        type: 'UPDATE_EVENTS',
        payload: data.events
      })
    }
  }, [data, loading, dispatch])
  
  if(loading) return (<h2>LOADING...</h2>)
  if(error) return (<h2>ERROR...</h2>)
  const events = data?.events || [];

  const handleChoice = (choice) => {
    console.log("Chosen: ", choice);

    // setCurrentEvent(choice);
    // dispatch fn()
    dispatch({
      type: 'SELECT',
      payload: choice
    })
  }

  return (
    <>
      <ErrorBoundary fallback={<h2>Something went wrong with the Events</h2>}>
          <div className='container mx-auto my-5 bg-sky-900 p-5 md:flex md:w-full'>
            { state?.currentEvent && (
            // { currentEvent && (
              <EventDetail 
                current={state.currentEvent} 
                isLoggedIn={token}
                removeEvent={removeEvent} 
                newBooking={newBooking}
                bookIt={notifyBooked}
                notifyErr={notifyErr}
                notifyRmv={notifyRmv}
              />
            )}
            {/* { token && (
              <EventForm addNewEvent={addNewEvent} notify={notify}/>
            )} */}
            <Events 
              // events={events} 
              events={state.events} 
              setChoice={handleChoice}
            />
            <ToastContainer />
          </div>
      </ErrorBoundary>
    </>
  )
}

export default EventsContainer