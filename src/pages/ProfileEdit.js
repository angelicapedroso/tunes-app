import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import OnLoad from '../components/OnLoad';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
      btnDisable: true,
      redirect: false,
    };

    this.validationBtn = this.validationBtn.bind(this);
    this.updateInfoUser = this.updateInfoUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.restoreInfo();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.validationBtn();
    });
  }

  async restoreInfo() {
    this.setState({ loading: true });
    const data = await getUser();
    this.setState({
      loading: false,
      name: data.name,
      image: data.image,
      email: data.email,
      description: data.description,
    });
    this.validationBtn();
  }

  async updateInfoUser() {
    const { name, image, email, description } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, image, description });
    this.setState({ redirect: true, loading: false });
  }

  validationBtn() {
    const { name, image, email, description } = this.state;
    const inputs = [name, image, description];
    if (inputs.every((input) => (
      input.length
    ))
      && email.includes('@')) {
      return this.setState({ btnDisable: false });
    } return this.setState({ btnDisable: true });
  }

  render() {
    const { loading, name, image, email, description, btnDisable, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading
          ? <OnLoad />
          : (
            <section>
              <form>
                <label htmlFor="image">
                  Imagem:
                  <input
                    data-testid="edit-input-image"
                    name="image"
                    type="text"
                    onChange={ this.handleChange }
                    value={ image }
                  />
                </label>
                <label htmlFor="name">
                  Nome:
                  <input
                    data-testid="edit-input-name"
                    name="name"
                    type="text"
                    onChange={ this.handleChange }
                    value={ name }
                  />
                </label>
                <label htmlFor="email">
                  E-mail:
                  <input
                    data-testid="edit-input-email"
                    name="email"
                    type="email"
                    onChange={ this.handleChange }
                    value={ email }
                  />
                </label>
                <label htmlFor="description">
                  Descrição:
                  <textarea
                    data-testid="edit-input-description"
                    name="description"
                    onChange={ this.handleChange }
                    value={ description }
                  />
                </label>
                <button
                  data-testid="edit-button-save"
                  type="button"
                  disabled={ btnDisable }
                  onClick={ this.updateInfoUser }
                >
                  Salvar
                </button>
              </form>
              { redirect && <Redirect to="/profile" /> }
            </section>
          )}
      </div>
    );
  }
}

// consulta neste repositório para resolução do requisito 14: https://github.com/tryber/sd-016-a-project-trybetunes/pull/54
