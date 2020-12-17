import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LoginAndRegisterPage from './pages/login-and-register-page/login-and-register-page.component';
import HomePage from './pages/home-page/home-page.component';
import Dashboard from './pages/dashboard/dashboard.component';
import PrivateRoute from './components/private-route/private-route.component';

import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';

class App extends Component {
  render() {
    const { currentUser } = this.props;

    return (
      <div>
        <div>Current user: {currentUser?.email}</div>
        <Switch>
          <Route exact path={'/'} component={HomePage}/>
          <Route exact path={'/sign-in'}
                 render={() => currentUser ? (<Redirect to={'/dashboard'}/>) : (<LoginAndRegisterPage/>)}/>
          <PrivateRoute exact path={'/dashboard'} component={Dashboard}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
