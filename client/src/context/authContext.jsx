import { useReducer, createContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const initialState = {
    user: null
};

// retrieve TOKEN from localStorage
if(localStorage.getItem('id_token')) {
    const isValidToken = jwtDecode(localStorage.getItem('id_token'));

    if(isValidToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('id_token');
    } else {
        initialState.user = isValidToken;
    }
}
// Initalize our Context Instance
const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {} 
});


export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN': 
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT': 
            return {
                ...state,
                user: null
            }
        default: 
            return state;
    }
}

export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData) => {
        localStorage.setItem('id_token', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
        localStorage.removeItem('id_token');
        dispatch({
            type: 'LOGOUT'
        })
    }

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }}
            {...props}
        />
    )
}

