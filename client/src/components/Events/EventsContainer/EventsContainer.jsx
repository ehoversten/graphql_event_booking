import React from 'react'
import EventForm from '../EventForm/EventForm'
import Events from '../Events';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENTS } from '../../../utils/queries';
import { ADD_EVENT, REMOVE_EVENT } from '../../../utils/mutations';

function EventsContainer() {
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
  
  if(loading) return (<h2>LOADING...</h2>)
  if(error) return (<h2>ERROR...</h2>)
  const events = data?.events || [];

  return (
    <>
        <div>EventsContainer</div>
        <Events events={events} removeEvent={removeEvent}/>
        <EventForm addNewEvent={addNewEvent}/>
    </>
  )
}

export default EventsContainer