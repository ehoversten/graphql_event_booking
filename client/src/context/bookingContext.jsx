import { useState, createContext } from 'react';

const initialState = {
    bookings: null
}

export const BookingContext = createContext(initialState)


export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState(null);

    return (
        <BookingContext.Provider value={{bookings, setBookings}}>
            {children}
        </BookingContext.Provider>
    )
}