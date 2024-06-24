import React, { useState, useRef, useEffect, createRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../../utils/mutations';
import { GraphQLError } from 'graphql';
import { AuthContext } from '../../../context/authContext';

function Signup() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  // const [userFormData, setUserFormData] = useState({
  //   username: '',
  //   email: '',
  //   password: ''
  // });

  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const userInputRef = useRef('');
  // const emailInputRef = useRef('');
  // const passInputRef = useRef('');

  // useEffect( () => {
  //   userInputRef.current?.focus();
  // }, []);

  const [signup, { error, loading }] = useMutation(REGISTER);

  if(error) return (<h2>Error ${error}</h2>)
  if(loading) return (<h2>LOADING...</h2>)

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setUserFormData({ ...userFormData, [name]: value })
  // }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log("Submitting ");

    // console.log("Username: ", userInputRef.current.value);
    // console.log("Email: ", emailInputRef.current.value);
    // console.log("Password: ", passInputRef.current.value);

    // let userInput = {
    //   username: userFormData.username,
    //   email: userFormData.email,
    //   password: userFormData.password
    // }

  const onSubmit = async (formData) => {

    console.log("Form Data: ", formData);

    let userInput = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }

    try {
      const { data } = await signup({
        variables: { userInput: userInput }
      });
      // console.log("New User: ", data);
      if(data.register.token) {
        // localStorage.setItem('id_token', JSON.stringify(data.register.token))
        auth.login(data.register)
      }
      navigate('/events')
    } catch (error) {
      console.log("Error: ", error);
      throw new GraphQLError("User Signup Failed")
    }

  } 

  return (
    <div className='signup-container container mx-auto p-5 bg-sky-700 mt-2 sm:mx-auto sm:w-full sm:max-w-sm rounded-2xl'>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-300">
            Create a new account
          </h2>
        </div>
      <form 
        className='signup-form'
        onSubmit={handleSubmit(onSubmit)}
        id='signup-form'>
        <div className="form-control mt-2">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-slate-300 mb-1">Enter Username</label>
          <input 
            type="text" 
            id="username" 
            // name='username'
            // ref={userInputRef}
            // value={username}
            // onChange={ (e) => setUsername(e.target.value)}
            {...register("username", {
              required: true,
              messege: "Username is required"
            })}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6"
            />
        </div>
        <div className="form-control mt-2">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-300 mb-1">Enter Email</label>
          <input 
            type="email" 
            id="email" 
            // name='email'
            // ref={emailInputRef}
            // value={email}
            // onChange={ (e) => setEmail(e.target.value)}
            {...register("email", {
              required: true,
              messege: "email is required"
            })}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6"
            />
        </div>
        <div className="form-control mt-2">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-300 mb-1">Enter password</label>
          <input 
            type="password" 
            id="password" 
            // name='password'
            // ref={passInputRef}
            // value={password}
            // onChange={ (e) => setPassword(e.target.value)}
            {...register("password", {
              required: true,
              messege: "password is required"
            })}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6"
            />
        </div>
        <div className="form-control">
          <button type='submit' className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 mt-5">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signup