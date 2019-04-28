import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';

import Login from '../components/login/Login'
import SignUp from '../components/login/SignUp'
import Customer from '../components/customer/Customer'

class Routes extends Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/customer' component={Customer} />
                    {/* <PrivateRoute path='/customer' component={Customer} isLogged={this.props.isLogged} /> */}
                    <Redirect from='*' to='/customer' />
                </Switch>
            </HashRouter>
        );
    }
}
function mapStateToProps(state) {
    return {
        isLogged: state.login.loggedUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)