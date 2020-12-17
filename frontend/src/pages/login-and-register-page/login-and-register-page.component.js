import React from 'react';

import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUp from "../../components/register-form/register-form.component";

import './login-and-register-page.styles.scss';

const LoginAndRegisterPage = () => (
  <div className={'login-and-register-page'}>
    <SignInForm />
    <SignUp />
  </div>
);

export default LoginAndRegisterPage;