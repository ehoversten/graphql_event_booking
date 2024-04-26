import React from 'react'
import EventForm from '../EventForm/EventForm'
import Events from '../Events';
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../../../utils/queries';

function EventsContainer() {
    // const {error, loading, data } = useQuery(GET_EVENTS);
    // // console.log("Response: ", data)
    // console.log("Data: ", data)
    // console.log("Loading: ", loading)
    // console.log("Error: ", error)
    // const { events } = data;

  return (
    <>
        <div>EventsContainer</div>
        {/* <Events eventList={events} error={error} loading={loading}/> */}
        <Events />
        <EventForm />
    </>
  )
}

export default EventsContainer