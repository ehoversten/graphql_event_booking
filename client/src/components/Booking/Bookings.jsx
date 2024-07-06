import React, { useEffect, useContext } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_BOOKINGS } from '../../utils/queries'
import { CANCEL_BOOKING } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { BookingContext } from '../../context/bookingContext';
import { EventContext } from '../../context/eventContext';
import { ErrorBoundary } from 'react-error-boundary';

function Bookings() {

  const navigate = useNavigate()
  const auth = useContext(AuthContext);
  const [state, dispatch] = useContext(EventContext)
  console.log("Auth: ", auth);

  // GET CURRENT USERS BOOKINGS
  // if token --> query GET_USERS_BOOKINGS($userId)

  const { error, loading, data } = useQuery(GET_BOOKINGS);
  const [cancelBooking] = useMutation(CANCEL_BOOKING, {
    refetchQueries: [
      GET_BOOKINGS,
      'cancelBooking'
    ]
  });

  useEffect(() => {
    if(!auth.user) {
      console.log("No user authorized")
      navigate('/login');
    }

    if(data) {
      dispatch({
        type: 'UPDATE_BOOKINGS',
        payload: data.bookings
      })
    }
  }, [auth.user, data, loading, dispatch]) 
  // }, [auth.user, data, loading]) 
  

  if(error) return (<h2>Error: </h2>);
  if(loading) return (<h2>LOADING...</h2>);

  // const bookings = data?.bookings || [];
  const myBookings = data?.bookings.filter(elem => { 
                                    if(elem.userId._id == auth.user?.data._id) { 
                                      return elem 
                                    } 
                                  }) || [];
  // console.log("Bookings: ", bookings);
  console.log("MY Bookings: ", myBookings);

  const handleCancel = async (id) => {
    console.log("Booking ID: ", id);
    try {
      await cancelBooking({ variables: { eventId: id}});

      dispatch({
        type: 'CANCEL',
        payload: id
      })
      
    } catch (error) {
      console.log("Error: ", error);
    } 
  }

  return (
    <div className='booking-list-container '>
        {/* { bookings.length == 0 ? <h2>No Current Bookings</h2> : */}
        { myBookings.length == 0 ? <h2>No Current Bookings</h2> :
        <div className="booking-list bg-sky-800 divide-y divide-slate-700 mx-auto mt-5">
          <h2>Current Bookings</h2>
          {/* { bookings.map(event => ( */}
          <ErrorBoundary fallback={<h2>Something went wrong with Bookings</h2>}>
          { myBookings.map(event => (
            <div className="booking-card p-5 flex justify-between" key={event._id}>
              <div className="sm:mx-auto sm:w-1/5 sm:max-w-sm mr-5 flex-column content-center rounded-full bg-sky-900">
                  <img
                    className="mx-auto h-10 w-auto align-middle"
                    src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
                    alt="Your Company"
                  />
              </div>
            <div className="booking-info text-left flex-1">
              {/* <h2 className="booking-title mb-4">{event._id}</h2> */}
              { event.eventId ? (
                <>
                  <h2 className="booking-title mb-4">{event.eventId.title}</h2>
                  <h2 className="booking-date mb-4">{event.eventId.date}</h2>
                  <h2 className="booking-time mb-4">{event.eventId.time}</h2>
                  <h2 className="booking-time mb-4">Created By: {event.userId.username.toUpperCase()}</h2>
                </>

              ) : null }
              <button className="cancel-booking mb-4" onClick={() => handleCancel(event._id)}>Cancel Booking</button>
            </div>
          </div>
          ))}
          </ErrorBoundary>
        </div>
        }
    </div>
  )
}

export default Bookings