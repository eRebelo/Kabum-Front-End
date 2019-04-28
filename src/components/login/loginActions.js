import axios from 'axios-https-proxy-fix'
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import consts from '../../main/consts'

const INITIAL_LOGIN_VALUES = {
    username: null,
    password: null
}

const INITIAL_SIGNUP_VALUES = {
    name: null,
    email: null,
    username: null,
    password: null,
    confirmPassword: null
}

export const loading = () => {
    return { type: 'LOADING_LOGIN' }
}

export const login = (credentials) => {
    return dispatch => {
        dispatch(loading())
        axios.get(`${consts.API_URL}/user/${credentials.username}/${credentials.password}`)
            .then(resp => {
                dispatch([
                    { type: 'LOGGED_USER', payload: true },
                    { type: 'LOGGED_USERNAME', payload: resp.data.username },
                    resetForm('loginForm'),
                    loading(),
                ])
            })
            .catch(error => {
                toastr.error('Erro', 'Falha de autenticação')
                dispatch(loading())
            })
    }
}

export const signUp = (account) => {
    return dispatch => {
        dispatch(loading())
        axios.post(`${consts.API_URL}/user`, account)
            .then(resp => {
                toastr.success('Sucesso', 'Cadastro realizado com sucesso')
                dispatch([
                    resetForm('signUpForm'),
                    loading()
                ])
            })
            .catch(error => {
                if (error.response.status === 500) {
                    toastr.error('Erro', 'Usuário já em uso, tente outro')
                } else {
                    toastr.error('Erro', 'Falha ao criar nova conta')
                }
                dispatch(loading())
            })
    }
}

export const signout = () => {
    return { type: 'LOGGED_USER', payload: false }
}

export const cleanLoginForm = () => {
    return initialize('loginForm', INITIAL_LOGIN_VALUES)
}

export const cleanSignUpForm = () => {
    return initialize('signUpForm', INITIAL_SIGNUP_VALUES)
}