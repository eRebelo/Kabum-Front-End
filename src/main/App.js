import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css'
import '../assets/custom.css'
import '../assets/plugins/react-table.css';

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