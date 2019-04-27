import axios from 'axios-https-proxy-fix'
import { toastr } from 'react-redux-toastr';
import { initialize } from 'redux-form';

const INITIAL_LOGIN_VALUE = {
    username: null,
    password: null
}

export const signup = () => {
    console.log('signup');
    return { type: 'LOGGED_USER', payload: true }
}

export const signout = () => {
    console.log('signout');
    return { type: 'LOGGED_USER', payload: false }
}

export const cleanLoginForm = () => {
    return initialize('loginForm', INITIAL_LOGIN_VALUE)
}