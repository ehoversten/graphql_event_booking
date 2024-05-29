import { useState, createContext, useReducer } from 'react';

const initialState = {
    bookings: null
}
// Initalize our Context Instance
export const BookingContext = createContext(initialState)

const bookingReducer = (state, action) => {
    switch(action.type) {
        case 'BOOK':
            return {
                ...state,
                bookings: [...state, action.payload]
            }
        case 'CANCEL':
            return {
                ...state,
                bookings: [...state].filter(booking => booking._id != action.payload)
            }
        default:
            return state;
    }
}


export const BookingProvider = ({ children }) => {
   // const [bookings, setBookings] = useState(null);
    const [state, dispatch] = useReducer(bookingReducer, initialState)

    // -- What Actions/Events do we need to account for(?) -- //
    // Get Current users bookings
    const bookEvent = (eventId) => {
        console.log("Booking Event...")
        dispatch({
            type: 'BOOK',
            payload: eventId
        })
    }
    // Cancel booking
    const cancelEvent = (bookingId) => {
        console.log("Removing Event: ", bookingId)
        dispatch({
            type: 'CANCEL',
            payload: bookingId
        })
    }

    return (
        <BookingContext.Provider value={{ bookings: state.bookings, bookEvent, cancelEvent}}>
            {children}
        </BookingContext.Provider>
    )
}