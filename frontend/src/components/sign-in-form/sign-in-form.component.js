import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signInStart } from "../../redux/user/user.actions";

import './sign-in-form.styles.scss';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { signInStart } = this.props;
    const { email, password } = this.state;

    signInStart(email, password);
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value,})
  }

  render() {
    return (
      <div className={'sign-in-form'}>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name={'email'}
            type={'email'}
            value={this.state.email}
            handleChange={this.handleChange}
            label={'email'}
            required
          />
          <FormInput
            name={'password'}
            type={'password'}
            value={this.state.password}
            handleChange={this.handleChange}
            label={'password'}
            required
          />
          <div className={'buttons'}>
            <CustomButton type={'submit'}> Sign in </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signInStart: (email, password) => dispatch(signInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignInForm);