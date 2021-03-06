import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { reducer as formReducer } from 'redux-form'
import loginReducer from '../components/login/loginReducer'
import customerReducer from '../components/customer/customerReducer'

const rootReducer = combineReducers({
    toastr: toastrReducer,
    form: formReducer,
    login: loginReducer,
    customer: customerReducer
})

export default rootReducer