import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      inputLogin: '',
    };
    this.verificationButtonDisabled = this.verificationButtonDisabled.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  inputChange({ target }) {
    const { value } = target;
    this.setState({ inputLogin: value }, () => {
      this.setState({ buttonDisabled: this.verificationButtonDisabled() });
    });
  }

  verificationButtonDisabled() {
    const { inputLogin } = this.state;
    const minimumCharacterLogin = 3;
    if (inputLogin.length >= minimumCharacterLogin) return false;
    return true;
  }

  render() {
    const
      {
        buttonDisabled,
        inputLogin,
      } = this.state;

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="login-name-input"
              name="name"
              type="text"
              value={ inputLogin }
              onChange={ this.inputChange }
            />
          </label>

          <label htmlFor="button-login">
            <input
              data-testid="login-submit-button"
              type="submit"
              value="Entrar"
              name="button-login"
              // onClick={ createUser }
              disabled={ buttonDisabled }
            />
          </label>
        </form>
      </div>
    );
  }
}
