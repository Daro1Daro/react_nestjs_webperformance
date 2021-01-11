import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { selectSignUpError, selectSignUpSuccess } from '../../redux/user/user.selectors';
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up-form.styles.scss';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    const { signUpStart } = this.props;
    const { username, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert('Passwords don\'t match :(');
      return;
    }

    signUpStart({ username, email, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password, confirmPassword } = this.state;
    const { signUpError, signUpSuccess } = this.props;

    return (
      <div className={'sign-up-form'}>
        <h2 className={'title'}>I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form
          onSubmit={this.handleSubmit}
        >
          <FormInput
            type={'text'}
            name={'username'}
            value={username}
            onChange={this.handleChange}
            label={'Name'}
            required
          />
          <FormInput
            type={'email'}
            name={'email'}
            value={email}
            onChange={this.handleChange}
            label={'Email'}
            autoComplete={'new-password'}
            required
          />
          <FormInput
            type={'password'}
            name={'password'}
            value={password}
            onChange={this.handleChange}
            label={'Password'}
            autoComplete={'new-password'}
            required
          />
          <FormInput
            type={'password'}
            name={'confirmPassword'}
            value={confirmPassword}
            onChange={this.handleChange}
            label={'Confirm Password'}
            required
          />
          {
            signUpError ?
            <div className={'info'}>
              <p className={'error'}>Your username or email address already exists in the database.</p>
            </div>
          : null
          }
          {
            signUpSuccess ?
              <div className={'info'}>
                <p>Thank you for registration. Check your email for an activation link.</p>
              </div>
              : null
          }
          <CustomButton type={'submit'}>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  signUpError: selectSignUpError,
  signUpSuccess: selectSignUpSuccess,
});

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);