import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'

import { Popover } from 'react-bootstrap'
import Loading from '../../loading/Loading'
import { cleanLoginForm, login } from './loginActions';

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
        this.props.login(values);
    }

    render() {
        if (this.props.isLogged) {
            return <Redirect to='/customer' />
        }

        return (
            <div className='container'>

                {this.props.loading && <Loading {...this.props.loading} />}

                <div className='login-container'>
                    <div className='login-wrap'>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <span className='login-form-title'>Login</span>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12 login-wrap-input'>
                                    <Field id='username' name='username' className='form-control' placeholder='Usuário'
                                        component={renderTextField} validate={required} style={{ height: '68px', padding: '0 25px 0 25px' }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <Field id='password' name='password' className='form-control' placeholder='Senha' type='password'
                                        component={renderTextField} validate={required} style={{ height: '68px', padding: '0 25px 0 25px' }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <button type='submit' className='btn login-form-btn' onClick={this.props.handleSubmit(this.onSubmit)}>Entrar</button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12 login-wrap-txt'>
                                    <span className='login-txt'>Criar uma conta? <Link className='login-link' to={{ pathname: '/signup' }}>Cadastre-se</Link></span>
                                </div>
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
        loading: state.login.loading,
        isLogged: state.login.loggedUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ cleanLoginForm, login }, dispatch)
}

Login = reduxForm({ form: 'loginForm', destroyOnUnmount: false })(Login);

export default connect(mapStateToProps, mapDispatchToProps)(Login)