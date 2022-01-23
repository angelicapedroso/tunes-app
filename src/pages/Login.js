// Ajuda da Rafaela Camargos com requisito 2
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MdHeadset } from 'react-icons/md';
import { createUser } from '../services/userAPI';
import OnLoad from '../components/OnLoad';
import '../style/Login.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      inputLogin: '',
      loading: false,
      requisition: false,
      inputPassword: '',
    };
    this.verificationButtonDisabled = this.verificationButtonDisabled.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButtonSubmit = this.onClickButtonSubmit.bind(this);
    this.saveUserInformation = this.saveUserInformation.bind(this);
  }

  onInputChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
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
        inputPassword,
      } = this.state;

    return (
      <div data-testid="page-login" className="page-login">
        <form className="container-form">
          <h2>
            TrybeTunes
            { ' ' }
            <MdHeadset />
            { ' ' }
          </h2>
          <label htmlFor="name">
            Usuário:
            <input
              className="input-login"
              data-testid="login-name-input"
              name="inputLogin"
              type="text"
              value={ inputLogin }
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="password">
            Senha:
            <input
              className="input-login"
              name="inputPassword"
              type="password"
              value={ inputPassword }
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="button-login">
            <input
              className="button-login"
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
