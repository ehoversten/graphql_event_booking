import React, { useState, useRef } from 'react';

function EventForm({ addNewEvent }) {

    const [eventForm, setEventForm] = useState({
        title: '',
        description: '',
        price: 0,
        date: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEventForm((prevState) => {
            return {
                ...prevState, 
                [name]: value
            }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { data } = await addNewEvent({
            variables: { eventInput: eventForm }
        })
        // console.log("New Evt: ", data);

        setEventForm({
            title: '',
            description: '',
            price: '',
            date: ''
        })
    } 

  return (
    <div className='event-form-container'>
        <form id='event-form' onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    name='title'
                    id='title'
                    value={eventForm.title}
                    onChange={handleChange}
                    />
            </div>
            <div className="form-control">
                <label htmlFor="description">Description:</label>
                <input 
                    type="textbox" 
                    name='description'
                    id="description"
                    value={eventForm.description}
                    onChange={handleChange}
                    />
            </div>
            <div className="form-control">
                <label htmlFor="price">Price <span>(optional)</span></label>
                <input 
                    type="number" 
                    name='price'
                    id='price'
                    value={eventForm.price}
                    onChange={handleChange}
                    />
            </div>
            <div className="form-control">
                <label htmlFor="date">Date</label>
                <input 
                    type="date" 
                    name='date'
                    id='date'
                    value={eventForm.date}
                    onChange={handleChange}
                    />
            </div>
            <div className="form-control">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default EventForm