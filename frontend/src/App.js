import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home-page/home-page.component';
import Dashboard from './pages/dashboard/dashboard.component';
import SingleResultsPage from './pages/single-results-page/single-results-page.component';
import ProjectPage from './pages/project-page/project-page.component';
import ActivationPage from './pages/activation-page/activation-page.component';
import NotFoundPage from './pages/not-found-page/not-found-page.component';

import HeaderContainer from './components/header/header.container';
import PrivateRoute from './components/private-route/private-route.component';
import PublicOnlyRoute from './components/public-only-route/public-only-route.component';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderContainer/>
        <Switch>
          <Route exact path={'/'} component={HomePage}/>
          <Route path={'/activate/:token'} component={ActivationPage}/>
          <PublicOnlyRoute exact path={'/sign-in'} />
          <PrivateRoute exact path={'/dashboard'} component={Dashboard}/>
          <PrivateRoute path={'/project/:projectId'} component={ProjectPage}/>
          <PrivateRoute path={'/single-results/:resultsId'} component={SingleResultsPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
