import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect, Link } from 'react-router-dom';

import { reduxForm, Field, formValueSelector, SubmissionError } from 'redux-form';
import { Popover, Collapse } from 'react-bootstrap'
import { cleanLoginForm } from './loginActions';

const required = value => (!value || !value.length) ? 'Campo obrigatório' : undefined;

const renderTextField = ({ input, label, type, placeholder, meta: { touched, error }, ...rest }) => (
    <div>
        <input {...input} {...rest} label={label} type={type} placeholder={placeholder} className={'form-control ' + (touched && error ? 'error-input' : '')} />
        {touched && (error && <Popover id='popover-error' placement='top'>{error}</Popover>)}
    </div>
);

class Login extends Component {

    componentWillMount() {
        this.props.cleanLoginForm();
    }

    onSubmit = (values) => {
        console.log(values);
    }

    render() {
        if (this.props.isLogged) {
            return <Redirect to="/customer" />
        }

        return (
            <div className='container'>
                <div>Login</div>
                <Link className='link-style-button-md' to={{ pathname: '/signup' }}>
                    <button type='button' className='btn btn-dark wizard-button' action={this.props.signout}>Sign up</button>
                </Link>
                <Link className='link-style-button-md' to={{ pathname: '/customer' }}>
                    <button type='button' className='btn btn-dark wizard-button' action={this.props.signout}>Clientes</button>
                </Link>

                <br></br>
                <div class="login-container">
                    <div class="login-wrap">
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <span class="login-form-title">Login</span>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12 login-wrap-input'>
                                    <Field id='username' name='username' className='form-control' placeholder='Username'
                                        component={renderTextField} validate={required} style={{ height: '68px', padding: '0 25px 0 25px' }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <Field id='password' name='password' className='form-control' placeholder='Password' type="password"
                                        component={renderTextField} validate={required} style={{ height: '68px', padding: '0 25px 0 25px' }} />
                                </div>
                            </div>
                            <div className='row'>
                                <button type='submit' className='btn btn-dark' onClick={this.props.handleSubmit(this.onSubmit)}>Logar</button>
                            </div>
                        </form>
                    </div>
                </div>
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
    return bindActionCreators({ cleanLoginForm }, dispatch)
}

Login = reduxForm({ form: 'loginForm', destroyOnUnmount: false })(Login);

export default connect(mapStateToProps, mapDispatchToProps)(Login)