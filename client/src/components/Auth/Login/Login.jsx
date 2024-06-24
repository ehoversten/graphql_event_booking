import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../utils/mutations'
import { GraphQLError } from 'graphql' 
import { AuthContext } from '../../../context/authContext'

function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // const [loginFormData, setLoginFormData] = useState({
  //   email: '',
  //   password: ''
  // })

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const [login, {error, loading}] = useMutation(LOGIN, {
  //   variables: { loginInput: loginFormData }
  // })
  const [login, {error, loading}] = useMutation(LOGIN);

  useEffect(() => {
    console.log("Auth State: ", auth);
  }, [auth])

  if(loading) return (<h2>LOADING...</h2>)
  if(error) return (<h2>Error: ${error}</h2>)

  // const handleChange = (event) => {
  //   setLoginFormData({
  //     ...loginFormData,
  //     [event.target.name]: event.target.value
  //   }) 
  // }

  // const handleSubmit = async (event) => {
  const onSubmit = async (data) => {
    // event.preventDefault();

    console.log("Data Submitting: ", data);

    let loginInput = {
      email: data.email,
      password: data.password
    }

    try {
      const { data } = await login({
        variables: { loginInput: loginInput }
      });
      // console.log("Login Data: ", data);

      if(data.login.token) {
        // localStorage.setItem('id_token', data.login.token);
        auth.login(data.login);
      }

      navigate('/events');
    } catch (error) {
      console.log('Error: ', error);
      throw new GraphQLError('Login Failure');
    }
  }


  return (
    <div className="login-container container mx-auto p-5 bg-sky-700 mt-2 sm:mx-auto sm:w-full sm:max-w-sm rounded-2xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-300">
            Sign in to your account
          </h2>
        </div>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control mt-2">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-300 mb-1">Email</label>
          <input 
            type="email"
            id="email" 
            // name='email'
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6"
            {...register("email", { 
              required: {
                value: true,
                message: "Email is required"
              }
            })}
            />
            <p className="form-error">{errors.email?.message}</p>
        </div>
        <div className="form-control mt-2">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-300 mb-1">Password</label>
          <input 
            type="password"
            id="password" 
            // name='password'
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6"
            {...register("password", {
              required: {
                value: true,
                message: "password cannot be empty"
              }
            })}
            />
            <p className="form-error">{errors.password?.message}</p>
        </div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 mt-5">Submit</button>
      </form>
    </div>
  )
}

export default Login