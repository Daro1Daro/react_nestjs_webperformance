import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import LoginAndRegisterPage from '../../pages/login-and-register-page/login-and-register-page.component';

const PublicOnlyRoute = ({ component: Component, currentUser, ...otherProps }) => (
  <Route
    {...otherProps}
    render={
      () => currentUser ? <Redirect to={'/dashboard'}/> : <LoginAndRegisterPage/>
    }
  />
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(PublicOnlyRoute);
