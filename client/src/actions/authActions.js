import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => {
  axios
    .post('http://localhost:5001/api/users/register', userData)
    .then(res => true)
    .catch(err => console.log(err));
};

// Login - Get User Token
export const loginUser = userData => {
  axios
    .post('http://localhost:5001/api/users/login', userData)
    .then(res => {
        console.log(res);
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      return true;
    })
    .catch(err => console.log(err));
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
