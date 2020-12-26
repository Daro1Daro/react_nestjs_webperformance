import React from 'react';

import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import './login-and-register-page.styles.scss';

const LoginAndRegisterPage = () => (
  <div className={'login-and-register-page'}>
    <SignInForm />
    <SignUpForm />
  </div>
);

export default LoginAndRegisterPage;