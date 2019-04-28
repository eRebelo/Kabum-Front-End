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
                console.log(resp);
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