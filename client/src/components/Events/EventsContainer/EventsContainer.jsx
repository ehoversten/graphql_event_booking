import React, { useState } from 'react'
import EventForm from '../EventForm/EventForm'
import Events from '../Events';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENTS } from '../../../utils/queries';
import { ADD_EVENT, REMOVE_EVENT, ADD_BOOKING } from '../../../utils/mutations';
import EventDetail from '../EventDetail';

function EventsContainer() {
  const token = localStorage.getItem('id_token');

  const [currentEvent, setCurrentEvent] = useState(null);

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

  const [newBooking, bookingData] = useMutation(ADD_BOOKING);
  
  if(loading) return (<h2>LOADING...</h2>)
  if(error) return (<h2>ERROR...</h2>)
  const events = data?.events || [];

  const handleChoice = (choice) => {
    console.log("Chosen: ", choice);

    setCurrentEvent(choice);
  }

  return (
    <>
        <div className='container mx-auto my-5 bg-sky-900 p-5 md:flex md:w-full'>
          { currentEvent && (
            <EventDetail 
              current={currentEvent} 
              isLoggedIn={token}
              removeEvent={removeEvent} 
              newBooking={newBooking}
            />
          )}
          { token && (
            <EventForm addNewEvent={addNewEvent}/>
          )}
          <Events 
            events={events} 
            setChoice={handleChoice}
          />
        </div>
    </>
  )
}

export default EventsContainer