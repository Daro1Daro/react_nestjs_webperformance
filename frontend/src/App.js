import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home-page/home-page.component';
import Dashboard from './pages/dashboard/dashboard.component';
import PrivateRoute from './components/private-route/private-route.component';
import AuthorizationRoute from './components/authorization-route/authorization-route.component';

import './App.css';
import Header from './components/header/header.component';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path={'/'} component={HomePage}/>
          <AuthorizationRoute exact path={'/sign-in'} />
          <PrivateRoute exact path={'/dashboard'} component={Dashboard}/>
        </Switch>
      </div>
    );
  }
};

export default App;
