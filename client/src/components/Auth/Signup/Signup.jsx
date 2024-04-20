import React, { useState, useRef, useEffect, createRef } from 'react';


function Signup() {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting ");

    console.log("Username: ", userInputRef.current.value);
    console.log("Email: ", emailInputRef.current.value);
    console.log("Password: ", passInputRef.current.value);
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
            id="username" 
            ref={userInputRef}
            value={username}
            onChange={ (e) => setUsername(e.target.value)}/>
        </div>
        <div className="form-control">
          <label htmlFor="email">Enter Email</label>
          <input 
            type="email" 
            id="email" 
            ref={emailInputRef}
            value={email}
            onChange={ (e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-control">
          <label htmlFor="password">Enter password</label>
          <input 
            type="password" 
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