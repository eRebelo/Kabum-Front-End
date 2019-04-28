import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loading from '../../template/Loading'
import { signout } from '../login/loginActions';

class CustomerNavbar extends Component {

    render() {
        return (
            <div className='ctm-header-container'>
                <div className='row'>
                    <div className='col-md-8'>
                        <h1 className='ctm-header-txt'>Cadastro de Clientes</h1>
                    </div>
                    <div className='col-md-4'>
                        <button type='button' className='btn btn-dark ctm-header-btn' onClick={this.props.signout}>
                            <i className='fa fa-sign-out'></i>&nbsp;&nbsp;Sair
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}

class Customer extends Component {

    componentWillMount() {
    }

    render() {
        return (
            <div className='container'>

                {this.props.loading && <Loading {...this.props.loading} />}

                <CustomerNavbar {...this.props} />

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLogged: state.login.loggedUser,
        username: state.login.loggedUsername,
        loading: state.customer.loading
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer)