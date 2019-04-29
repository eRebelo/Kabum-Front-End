import axios from 'axios-https-proxy-fix'
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import consts from '../../main/consts'

const INITIAL_CUSTOMER_VALUES = {
}

export const loading = () => {
    return { type: 'LOADING_CUSTOMER' }
}

export const getCustomerList = () => {
    return dispatch => {
        dispatch(loading())
        axios.get(`${consts.API_URL}/customer`)
            .then(resp => {
                dispatch([
                    { type: 'CUSTOMER_LIST', payload: resp.data },
                    loading()
                ])
            })
            .catch(error => {
                toastr.error('Erro', 'Erro ao tentar buscar os clientes')
                dispatch(loading())
            })
    }
}

export const addCustomer = (customer) => {
    return dispatch => {
        dispatch(loading())
        axios.post(`${consts.API_URL}/customer`, customer)
            .then(resp => {
                toastr.success('Sucesso', 'Cliente inserido com sucesso')
                dispatch([
                    resetForm('customerForm'),
                    getCustomerList(),
                    loading()
                ])
            })
            .catch(error => {
                toastr.error('Erro', 'Erro ao tentar inserir cliente')
                dispatch(loading())
            })
    }
}

export const editCustomer = (customer) => {
    return dispatch => {
        dispatch(loading())
        /* axios.put(`${consts.API_URL}/customer`, { ...customer }) */
        axios.put(`${consts.API_URL}/customer`, customer)
            .then(resp => {
                toastr.success('Sucesso', 'Cliente alterado com sucesso')
                dispatch([
                    resetForm('customerForm'),
                    getCustomerList(),
                    loading()
                ])
            })
            .catch(error => {
                toastr.error('Erro', 'Erro ao tentar alterar cliente')
                dispatch(loading())
            })
    }
}

export const removeCustomer = (customer) => {
    return dispatch => {
        dispatch(loading())
        axios.delete(`${consts.API_URL}/customer/${customer.id}`)
            .then(resp => {
                toastr.success('Sucesso', 'Cliente removido com sucesso')
                dispatch([
                    getCustomerList(),
                    loading()
                ])
            })
            .catch(error => {
                toastr.error('Erro', 'Erro ao tentar remover cliente')
                dispatch(loading())
            })
    }
}

export const addCustomerToForm = (customer) => {
    return initialize('customerForm', customer)
}


export const cleanCustomerForm = () => {
    return initialize('customerForm', INITIAL_CUSTOMER_VALUES)
}