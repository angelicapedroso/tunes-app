// Ajuda da Rafaela Camargos com requisito 2
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import OnLoad from '../components/OnLoad';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      inputLogin: '',
      loading: false,
      requisition: false,
    };
    this.verificationButtonDisabled = this.verificationButtonDisabled.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButtonSubmit = this.onClickButtonSubmit.bind(this);
    this.saveUserInformation = this.saveUserInformation.bind(this);
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({ inputLogin: value }, () => {
      this.setState({ buttonDisabled: this.verificationButtonDisabled() });
    });
  }

  onClickButtonSubmit(event) {
    event.preventDefault();
    this.saveUserInformation();
  }

  async saveUserInformation() {
    const { inputLogin } = this.state;
    const loginInformation = { name: inputLogin };
    this.setState({ loading: true });
    const userData = await createUser(loginInformation);
    if (userData) {
      return this.setState({ loading: false, requisition: true });
    }
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
        loading,
        requisition,
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
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="button-login">
            <input
              data-testid="login-submit-button"
              type="submit"
              value="Entrar"
              name="button-login"
              onClick={ this.onClickButtonSubmit }
              disabled={ buttonDisabled }
            />
          </label>
          { loading && <OnLoad /> }
          { requisition && <Redirect to="/search" /> }
        </form>
      </div>
    );
  }
}
