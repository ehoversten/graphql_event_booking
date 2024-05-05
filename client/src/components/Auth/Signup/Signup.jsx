import React, { useState, useRef, useEffect, createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../../utils/mutations';
import { GraphQLError } from 'graphql';

function Signup() {
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userInputRef = useRef('');
  const emailInputRef = useRef('');
  const passInputRef = useRef('');

  useEffect( () => {
    userInputRef.current?.focus();
  }, []);

  const [register, { error, loading }] = useMutation(REGISTER);

  if(error) return (<h2>Error ${error}</h2>)
  if(loading) return (<h2>LOADING...</h2>)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting ");

    console.log("Username: ", userInputRef.current.value);
    console.log("Email: ", emailInputRef.current.value);
    console.log("Password: ", passInputRef.current.value);

    // let userInput = {
    //   username: userFormData.username,
    //   email: userFormData.email,
    //   password: userFormData.password
    // }
    let userInput = {
      username: username,
      email: email,
      password: password
    }

    try {
      const { data } = await register({
        variables: { userInput: userInput }
      });
      console.log("New User: ", data);
      if(data.register.token) {
        localStorage.setItem('id_token', JSON.stringify(data.register.token))
      }
      navigate('/landing')
    } catch (error) {
      console.log("Error: ", error);
      throw new GraphQLError("User Signup Failed")
    }

  } 

  return (
    <div className='signup-container'>
      <h2>Register Account</h2>
      <form 
        className='signup-form'
        onSubmit={handleSubmit}
        id='signup-form'>
        <div className="form-control">
          <label htmlFor="username">Enter Username</label>
          <input 
            type="text" 
            name='username'
            id="username" 
            ref={userInputRef}
            value={username}
            onChange={ (e) => setUsername(e.target.value)}/>
        </div>
        <div className="form-control">
          <label htmlFor="email">Enter Email</label>
          <input 
            type="email" 
            name='email'
            id="email" 
            ref={emailInputRef}
            value={email}
            onChange={ (e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-control">
          <label htmlFor="password">Enter password</label>
          <input 
            type="password" 
            name='password'
            id="password" 
            ref={passInputRef}
            value={password}
            onChange={ (e) => setPassword(e.target.value)}/>
        </div>
        <div className="form-control">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signup