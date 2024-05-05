import React from 'react'
import EventForm from '../EventForm/EventForm'
import Events from '../Events';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENTS } from '../../../utils/queries';
import { ADD_EVENT, REMOVE_EVENT, ADD_BOOKING } from '../../../utils/mutations';

function EventsContainer() {
  const token = localStorage.getItem('id_token');

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

  return (
    <>
        <div className='container mx-auto bg-sky-900'>
          { token && (
            <EventForm addNewEvent={addNewEvent}/>
          )}
          <Events events={events} removeEvent={removeEvent} newBooking={newBooking} isLoggedIn={token}/>
        </div>
    </>
  )
}

export default EventsContainer