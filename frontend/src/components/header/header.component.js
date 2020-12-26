import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.actions";

import './header.styles.scss';

const Header = ({ currentUser, signOutStart }) => (
  <div className={'header'}>
    <div className={'options'}>
      <Link className={'option'} to={'/dashboard'}>DASHBOARD</Link>
      {
        currentUser ?
          <div className={'option'} onClick={() => signOutStart()}>
            SIGN OUT
          </div>
          :
          <Link className={'option'} to={'/sign-in'}>SIGN IN</Link>
      }
    </div>
  </div>
)

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);