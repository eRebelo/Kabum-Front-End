import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import '../assets/custom.css'
import '../assets/plugins/react-table.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Routes from './Routes'
import MessagesToastr from '../widgets/messagesToastr'

class App extends Component {

  render() {

    return (
      <div className='body'>
        <Routes />
        <MessagesToastr />
        <div className='footer'>
          Kabum API © 2019&nbsp;
          <strong>
            <a className='login-link' href='https://www.linkedin.com/in/eduardo-rebelo' target='_blank' rel='noopener noreferrer'>Eduardo Rebelo</a>
          </strong>
        </div>

      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(App)