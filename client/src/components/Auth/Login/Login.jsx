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
    <div className="login-container container mx-auto p-3 bg-sky-700 mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-300">
            Sign in to your account
          </h2>
        </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control mt-2">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-300">Email</label>
          <input 
            type="email"
            name='email'
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6"
            />
        </div>
        <div className="form-control mt-2">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-300">Password</label>
          <input 
            type="password"
            name='password'
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6"
            />
        </div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 mt-5  ">Submit</button>
      </form>
    </div>
  )
}

export default Login