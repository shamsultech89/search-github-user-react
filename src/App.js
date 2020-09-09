import React, { useEffect} from 'react';
import { Switch, Route, Redirect, NavLink, withRouter } from 'react-router-dom';
import './App.css';

import Users from './components/Users/Users';
import Auth from './components/Auth/Auth';

import Logout from './components/Auth/Logout/Logout';
import { authCheckState } from './store/actions/auth';
import { connect } from 'react-redux';


const DefaultPage = () => {
  return (
    <p>Welcome User!</p>
  );
};

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  })

  let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={Users} />
        <Redirect to="/auth" />
      </Switch>
    );

    if ( props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/home" component={DefaultPage} />
          <Route path="/" component={Users} />
          <Redirect to="/" />
        </Switch>
      );
    }

  let links = (
      <ul className="nav nav-pills">
        <li className="nav-item"><NavLink to="/" exact className="nav-link" >Users</NavLink></li>
        <li className="nav-item"><NavLink to="/auth" exact className="nav-link" >Login</NavLink></li>
      </ul>
    );

    if (props.isAuthenticated) {
      links = (
        <ul className="nav nav-pills">
          <li><NavLink to="/home" className="nav-link" >Home</NavLink></li>
          <li><NavLink to="/" exact className="nav-link" >Users</NavLink></li>
          <li className="nav-item">
            <NavLink to="/logout" exact className="nav-link" >Logout</NavLink>
          </li>
        </ul>
      )
    }


  return (
    <div className="App">
      { links }
      <br/>
      { routes }
    </div>
  );
};


const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );

