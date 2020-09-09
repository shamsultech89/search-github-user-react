import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  auth,
  setAuthRedirectPath
} from '../../store/actions/auth';

class Auth extends Component {
  state = {
    email: '',
    password: '',
    isSignup: true
  }

  componentDidMount () {
    if (this.props.authRedirectPath !== '/' ) {
        this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = ( event, controlName ) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  submitHandler = ( event ) => {
    event.preventDefault();
    this.props.onAuth( this.state.email, this.state.password, this.state.isSignup );
  }

  switchAuthModeHandler = () => {
    this.setState( prevState => {
        return { isSignup: !prevState.isSignup };
    } );
  }

  render () {
    let errorMessage = null;

    if ( this.props.error ) {
        errorMessage = (
            <p>{this.props.error.message}</p>
        );
    }

    let authRedirect = null;
    if ( this.props.isAuthenticated ) {
        authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
        <div>
            {authRedirect}
            {errorMessage}
            <form onSubmit={this.submitHandler}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type='text' id="email" className="form-control" name='email' value={this.state.email} onChange={this.inputChangedHandler} required />
                </div>

                  <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input type='password' id="password" className="form-control" name='password' value={this.state.password} onChange={this.inputChangedHandler} required />
                  </div>
                <button className="btn btn-primary" >SUBMIT</button>
            </form>
            <br/>
            <button
                className="btn btn-danger"
                onClick={this.switchAuthModeHandler}>
                SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                </button>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
    isAuthenticated: state.token !== null,
    authRedirectPath: state.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: ( email, password, isSignup ) => dispatch( auth( email, password, isSignup ) ),
    onSetAuthRedirectPath: () => dispatch( setAuthRedirectPath( '/' ) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );
