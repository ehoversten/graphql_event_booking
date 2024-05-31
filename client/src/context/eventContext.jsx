import { useState, createContext, useReducer } from 'react';

const initialState = {
    events: null,
    currentEvent: null
}

export const EventContext = createContext(initialState);

const eventReducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            return {
                ...state,
                events: [...state, action.payload]
            }
        case 'REMOVE':
            return {
                ...state,
                events: [...state].filter(event => event._id != action.payload)
            }
        case 'SELECT': 
            return {
                ...state,
                currentEvent: action.payload
            }
        default: 
            return state;
    }

}

// export const EventProvider = ({ children }) => {
export const EventProvider = (props) => {
    console.log("Children: ", props.children);

    const [events, setEvents] = useState([])
    const [current, setCurrent] = useState({})

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
        <EventContext.Provider value={{ events: state.events, currentEvent: state.currentEvent, newEvent, deleteEvent, selectEvent}}>
            {props.children}
        </EventContext.Provider>
    )
}