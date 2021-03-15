import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.styles.scss';

const Header = ({ currentUser, signOutStart }) => (
  <div className={'header'}>
    <Link className={'logo-container'} to={'/'}>
      <Logo className={'logo'}/>
    </Link>
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
);

export default Header;