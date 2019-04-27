import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogged ? <Component /> : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
        )} />
    )
}

export default PrivateRoute