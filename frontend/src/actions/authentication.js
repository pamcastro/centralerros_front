import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post('http://127.0.0.1:8000/users/register/', user)
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}


export const loginUser = (user) => dispatch => {
    axios.post('http://127.0.0.1:8000/api/token/', user)
            .then(res => {
                const { token } = res.data;
                //console.log(res.data)
                var jwtacess = res.data['access']
                localStorage.setItem('jwtToken', jwtacess);
                setAuthToken(jwtacess);
                const decoded = jwt_decode(jwtacess);
                dispatch(setCurrentUser(decoded));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}