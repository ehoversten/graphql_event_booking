import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../utils/mutations'
import { GraphQLError } from 'graphql' 

function Login() {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  })

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, {error, loading}] = useMutation(LOGIN, {
    variables: { loginInput: loginFormData }
  })

  if(loading) return (<h2>LOADING...</h2>)
  if(error) return (<h2>Error: ${error}</h2>)

  const handleChange = (event) => {
    setLoginFormData({
      ...loginFormData,
      [event.target.name]: event.target.value
    }) 
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let loginInput = {
      email: email,
      password: password
    }

    try {
      const { data } = await login({
        variables: { loginInput: loginInput }
      });
      console.log("Login Data: ", data);

      if(data.login.token) {
        localStorage.setItem('id_token', data.login.token);
      }

      navigate('/events');
    } catch (error) {
      console.log('Error: ', error);
      throw new GraphQLError('Login Failure');
    }
  }


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login