import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'

import { Popover } from 'react-bootstrap'
import Loading from '../../loading/Loading'
import { cleanSignUpForm, signUp } from './loginActions'

const required = value => (!value || !value.length) ? 'Campo obrigatório' : undefined;
const renderTextField = ({ input, label, type, placeholder, meta: { touched, error }, ...rest }) => (
    <div>
        <input {...input} {...rest} label={label} type={type} placeholder={placeholder} className={'form-control ' + (touched && error ? 'error-input' : '')} />
        {touched && (error && <Popover id='popover-error' placement='top'>{error}</Popover>)}
    </div>
);
const requiredEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Email inválido' : undefined;
const requiredPassword = value => value.length < 5 ? 'Senha deve possuir no mínimo 5 caracteres' : undefined;
const requiredMatchPassword = matchName => (value, allValues, props) => value !== allValues[matchName] ? 'Senhas incompatíveis' : undefined;

class SignUp extends Component {

    componentWillMount() {
        this.props.cleanSignUpForm();
    }

    onSubmit = (values) => {
        this.props.signUp(values);
    }

    render() {
        if (this.props.isLogged) {
            return <Redirect to="/customer" />
        }

        return (
            <div className='container'>

                {this.props.loading && <Loading {...this.props.loading} />}

                <div className='login-container'>
                    <div className='login-wrap'>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <span className='login-form-title'>Criar Nova Conta</span>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12 login-wrap-input'>
                                    <Field id='name' name='name' className='form-control' placeholder='Nome' component={renderTextField} validate={required}
                                        style={{ height: '50px', padding: '0 25px 0 25px' }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <Field id='email' name='email' className='form-control' placeholder='Email' component={renderTextField} validate={[required, requiredEmail]}
                                        style={{ height: '50px', padding: '0 25px 0 25px' }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <Field id='username' name='username' className='form-control' placeholder='Usuário' component={renderTextField} validate={required}
                                        style={{ height: '50px', padding: '0 25px 0 25px' }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <Field id='password' name='password' className='form-control' placeholder='Senha' type='password' component={renderTextField}
                                        validate={[required, requiredPassword]} style={{ height: '50px', padding: '0 25px 0 25px' }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <Field id='confirmPassword' name='confirmPassword' className='form-control' placeholder='Confirme a senha' type='password' component={renderTextField}
                                        validate={[required, requiredPassword, requiredMatchPassword("password")]} style={{ height: '50px', padding: '0 25px 0 25px' }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <button type='submit' className='btn login-form-btn' onClick={this.props.handleSubmit(this.onSubmit)}>Cadastrar</button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12 login-wrap-txt'>
                                    <Link className='login-link' to={{ pathname: '/login' }}>Voltar</Link>
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
    return bindActionCreators({ cleanSignUpForm, signUp }, dispatch)
}

SignUp = reduxForm({ form: 'signUpForm', destroyOnUnmount: false })(SignUp);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)