import axios from 'axios-https-proxy-fix'
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import consts from '../../main/consts'

const INITIAL_CUSTOMER_VALUES = {
}

export const loading = () => {
    return { type: 'LOADING_CUSTOMER' }
}