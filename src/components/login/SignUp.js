import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom';

import { signup } from './loginActions';

class SignUp extends Component {

    componentWillMount() {
        this.props.signup();
    }

    render() {

        if (this.props.isLogged) {
            return <Redirect to="/customer" />
        }

        return (
            <div className='container'>
                <div>SignUp</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLogged: state.app.loggedUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signup }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)