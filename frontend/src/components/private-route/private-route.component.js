import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

const PrivateRoute = ({ component: Component, currentUser, ...otherProps }) => (
  <Route
    {...otherProps}
    render={
      (routeProps) => currentUser ? <Component {...routeProps} /> : <Redirect to="/sign-in"/>
    }
  />
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(PrivateRoute);
