import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { reducer as formReducer } from 'redux-form'
import appReducer from '../components/app/appReducer'
import loginReducer from '../components/login/loginReducer'

const rootReducer = combineReducers({
    toastr: toastrReducer,
    form: formReducer,
    app: appReducer,
    login: loginReducer
})

export default rootReducer