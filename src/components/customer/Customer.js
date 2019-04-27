import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import helmetLogo from '../../assets/imgs/helmet-logo.png'
import { signout } from '../login/loginActions';

class CustomerNavbar extends Component {

    render() {
        return (
            <div className='row'>
                <div className='col-md-7'>
                    <img className='helmet-game-img' src={helmetLogo} alt='Star Wars Helmet' />
                    <h1 className='starquiz-game-label'>Cadastro de Clientes</h1>
                </div>
                <div className='col-md-3'>
                    <button type='button' className='btn btn-dark' onClick={this.props.signout}>
                        <i className='fa fa-refresh'></i>&nbsp;&nbsp;Sair
                    </button>
                </div>
            </div>
        )
    }
}

class Customer extends Component {

    componentDidMount() {
    }

    render() {

        return (
            <div>
                <CustomerNavbar {...this.props} />
                <div className='container'>
                    <h2>Customer</h2>
                    <Link className='link-style-button-md' to={{ pathname: '/login' }}>
                        <button type='button' className='btn btn-dark wizard-button'>Login</button>
                    </Link>
                    <Link className='link-style-button-md' to={{ pathname: '/signup' }}>
                        <button type='button' className='btn btn-dark wizard-button'>Sign up</button>
                    </Link>
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
    return bindActionCreators({ signout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer)