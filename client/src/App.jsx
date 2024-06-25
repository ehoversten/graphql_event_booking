import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from './context/authContext';
import { EventProvider } from './context/eventContext';
import Dashboard from './components/Dashboard/Dashboard';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';
import Landing from './components/Landing/Landing';
import EventsContainer from './components/Events/EventsContainer/EventsContainer';
import Bookings from './components/Booking/Bookings';
import Modal from './components/Modal/Modal';
import './App.css';
import ErrorBoundary from './components/Errors/ErrorBoundary';

// Contstruct the GraphQL Endpoint '/graphql'
const httpLink = createHttpLink({
  uri: '/graphql',
  // uri: 'http://localhost:3001/graphql'
});

// Setup Middleware that will attach the JWT token to each request to the server
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

// Setup the Client to use our middleware
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  connectToDevTools: true,
  cache: new InMemoryCache()
})

function App() {

  // const [openModal, setOpenModal] = useState(false);

  return (
    <AuthProvider>
      <EventProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path='/' element={<Landing />}>
                <Route path='events' element={<EventsContainer />}/> 
              </Route>
              <Route path='login' element={<Login />}/>
              <Route path='signup' element={<Signup />}/>
              <Route path='dashboard' element={<Dashboard />}>
                <Route path='events' element={<EventsContainer />}/> 
              </Route>
              <Route path='bookings' element={<Bookings />} />
            </Routes>
            {/* <button onClick={ () => setOpenModal(true)}>New Event</button>
            { openModal && <Modal open={openModal} close={setOpenModal}/> } */}
            {/* <Modal /> */}
          </BrowserRouter>
        </ApolloProvider>
      </EventProvider>
    </AuthProvider>
  )
  // return (
  //   <ApolloProvider client={client}>
  //     <h1>Welcome to the Events Booking Homepage</h1>
  //     <Navigation />
  //     <Outlet />
  //   </ApolloProvider>
  // )
}

export default App
