import { useState, createContext, useReducer } from 'react';
import { ADD_EVENT } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const initialState = {
    events: [],
    currentEvent: null,
    bookings: [],
    currentBooking: null
}

export const EventContext = createContext(initialState);

  // GET ALL EVENTS 
//   const {error, loading, data } = useQuery(GET_EVENTS);

// const [addNewEvent, addEventData] = useMutation(ADD_EVENT, {
    // refetchQueries: [
    //   GET_EVENTS,
    //   'Events'
    // ]
// });

const eventReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_EVENTS':
            return {
                ...state,
                events: [...action.payload]
            }
            case 'ADD':
                return {
                    ...state,
                    events: [...state, action.payload]
                }
            case 'REMOVE':
                const newEvents = state.events.filter(event => event._id != action.payload)
                return {
                    ...state,
                    events: newEvents,
                    currentEvent: null
                }
            case 'SELECT': 
                return {
                    ...state,
                    currentEvent: action.payload
                }
            case 'UPDATE_BOOKINGS':
                return {
                    ...state,
                    bookings: [...action.payload]
                }
            case 'BOOK_EVENT':
                return {
                    ...state,
                    bookings: [...state, action.payload]
                }
            case 'CANCEL':
                return {
                    ...state,
                    bookings: state.bookings.filter(booking => booking._id != action.payload)
                }
        default: 
            return state;
    }

}

// export const EventProvider = ({ children }) => {
export const EventProvider = (props) => {
    // console.log("Children: ", props.children);

    // const [events, setEvents] = useState([])
    // const [current, setCurrent] = useState({})

    const [state, dispatch] = useReducer(eventReducer, initialState);

    // -- What Actions/Events do we need to account for(?) -- //
    const newEvent = (event) => {
        console.log("Event Data: ", event);

        dispatch({
            type: 'ADD',
            payload: event._id
        })
    }

    const deleteEvent = (eventId) => {
        console.log("ID: ", eventId);

        dispatch({
            type: 'REMOVE',
            payload: eventId
        })
    }

    const selectEvent = (eventId) => {
        console.log("Event: ", eventId);

        dispatch({
            type: 'SELECT',
            payload: eventId
        })
    }

    return (
        // <EventContext.Provider value={{ events: state.events, currentEvent: state.currentEvent, newEvent, deleteEvent, selectEvent}}>
        <EventContext.Provider value={[state, dispatch]}>
            {props.children}
        </EventContext.Provider>
    )
}