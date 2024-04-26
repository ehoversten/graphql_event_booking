import { Outlet } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from './context/authContext';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';
import Landing from './components/Landing/Landing';
import EventsContainer from './components/Events/EventsContainer/EventsContainer';


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
  cache: new InMemoryCache()
})

function App() {

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <h1>Welcome to the Events Booking Homepage</h1>
          <Navigation />
          <Routes>
            <Route path='/' element={<Landing />}/>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/events' element={<EventsContainer />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
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
