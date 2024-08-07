import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { ADD_EVENT } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import './Modal.css';

export const Modal = ({ open, close, children }) => {

  if(!open) return null;

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      date: '',
      time: '',
      max_attendance: 1
    }
  });

  const { errors } = formState

  // const [eventForm, setEventForm] = useState({
  //   title: '',
  //   description: '',
  //   price: 0,
  //   date: '',
  //   time: '',
  //   max_attendance: 1
  // });

  const [addNewEvent] = useMutation(ADD_EVENT, {
    // refetchQueries: [
    //   GET_EVENTS,
    //   'Events'
    // ]
  });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setEventForm((prevState) => {
  //       return {
  //           ...prevState, 
  //           [name]: value
  //       }
  //   });
  // }

  const onSubmit = async (formData) => {
    // event.preventDefault();

    console.log("Form Data: ", formData);

    const eventInput = {
        ...formData,
        price: Number(formData.price),
        max_attendance: Number(formData.max_attendance)
    }
    console.log("Event Submitting: ", eventInput);

    const { data } = await addNewEvent({
        variables: { eventInput: eventInput }
    })
    // console.log("New Evt: ", data);

    // setEventForm({
    //     title: '',
    //     description: '',
    //     price: 0,
    //     date: '',
    //     time: '',
    //     max_attendance: 1
    // })
 
    close(false)
  } 

  return createPortal(
    <>
      <div className='modal'>
          <div className="modal-content">
              {children}
              <div className='event-form-container container mx-auto p-5 bg-sky-700 m-5 sm:mx-auto sm:w-full sm:max-w-sm rounded-2xl'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm m-5">
                  <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
                    alt="Your Company"
                  />
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-300">
                    Create a New Event!
                  </h2>
                </div>
                <form id='event-form' onSubmit={handleSubmit(onSubmit)} className='text-left'>
                    <div className="form-control mt-2 ">
                      <label htmlFor="title">Title: </label>
                      <input 
                          type='text' 
                          id='title'
                          // name='title'
                          // value={eventForm.title}
                          // onChange={handleChange}
                          {...register("title", {
                            required: {
                              value: true,
                              message: "title is required"
                            }
                          })}
                          className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
                          />
                          <p className="form-error">{errors.title?.message}</p>
                    </div>
                    <div className="form-control mt-2">
                      <label htmlFor="description">Description: </label>
                      <input 
                          type="textbox" 
                          id="description"
                          // name='description'
                          // value={eventForm.description}
                          // onChange={handleChange}
                          {...register("description", {
                            required: {
                              value: true,
                              message: "description is required"
                            }
                          })}
                          className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
                          />
                          <p className="form-error">{errors.description?.message}</p>
                    </div>

                    <div className="form-control-container flex flex-wrap gap-3">

                    <div className="form-control mt-2 flex-1">
                      <label htmlFor="price">Price: <span>(optional) </span></label>
                      <input 
                          type='number' 
                          id='price'
                          // name='price'
                          // value={eventForm.price}
                          // onChange={handleChange}
                          {...register("price", { valueAsNumber: true })}
                          className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
                          />
                          <p className="form-error">{errors.price?.message}</p>
                    </div>
                    <div className="form-control mt-2 flex-1">
                      <label htmlFor="date">Date: </label>
                      <input 
                          type='date' 
                          id='date'
                          // name='date'
                          // value={eventForm.date}
                          // onChange={handleChange}
                          {...register("date", { 
                            valueAsDate: true,
                            required: {
                              value: true,
                              message: "Date of event is required"
                            }
                           })}
                          className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
                          />
                          <p className="form-error">{errors.date?.message}</p>
                    </div>
                    <div className="form-control mt-2 flex-1">
                      <label htmlFor="time">Time of Event: </label>
                      <input 
                          type='time' 
                          id='time'
                          // name='time'
                          // value={eventForm.time}
                          // onChange={handleChange}
                          {...register("time", {
                            required: {
                              value: true,
                              message: "time of event is required"
                            }
                           })}
                          className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
                          />
                    </div>
                    <div className="form-control mt-2 flex-1">
                      <label htmlFor="max_attendance">Max Attendees: </label>
                      <input 
                          type='number' 
                          id='max_attendance'
                          // name='max_attendance'
                          // value={eventForm.max_attendance}
                          // onChange={handleChange}
                          {...register("max_attendance", { valueAsNumber: true })}
                          className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
                          />
                          <p className="form-error">{errors.max_attendance?.message}</p>
                    </div>

                    </div>

                    <div className="form-control mt-2">
                        <button type="submit" className='flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 mt-5'>Create Event</button>
                        <button onClick={ () => close(false) } className='flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 mt-5'>Cancel</button>
                    </div>
                </form>
            </div>
          </div>
      </div>
    </>, document.getElementById('overlay')
  )
}

export default Modal