import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserService from '../../services/user.service';

const PrivateRoute = ({ component: Component, ...otherProps }) => (
  <Route
    {...otherProps}
    render={(props) =>
      UserService.isAuthenticated() ? <Component {...props} /> : <Redirect to="/sign-in"/>
    }
  />
);

export default PrivateRoute;