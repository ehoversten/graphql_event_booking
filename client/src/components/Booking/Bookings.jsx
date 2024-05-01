import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_BOOKINGS } from '../../utils/queries'
import { CANCEL_BOOKING } from '../../utils/mutations';

function Bookings() {

  const { error, loading, data } = useQuery(GET_BOOKINGS);
  const [cancelBooking] = useMutation(CANCEL_BOOKING, {
    refetchQueries: [
      GET_BOOKINGS,
      'CancelBooking'
    ]
  });

  if(error) return (<h2>Error: </h2>);
  if(loading) return (<h2>LOADING...</h2>);

  const bookings = data?.bookings || [];
  console.log("Bookings: ", bookings);

  const handleCancel = async (id) => {
    console.log("Booking ID: ", id);
    try {
      await cancelBooking({ variables: { eventId: id}});
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <div className='booking-list-container'>
        { bookings.length == 0 ? <h2>No Current Bookings</h2> :
        <div className="booking-list">
          <h2>Current Bookings</h2>
          { bookings.map(event => (
            <div className="booking-card" key={event._id}>
              <h2 className="booking-title">{event._id}</h2>
              <button className="cancel-booking" onClick={() => handleCancel(event._id)}>Cancel Booking</button>
            </div>
          ))}
        </div>
        }
    </div>
  )
}

export default Bookings