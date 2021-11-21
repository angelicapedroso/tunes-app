import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      inputArtist: '',
    };
    this.verificationButtonDisabled = this.verificationButtonDisabled.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({ inputArtist: value }, () => {
      this.setState({ buttonDisabled: this.verificationButtonDisabled() });
    });
  }

  verificationButtonDisabled() {
    const { inputArtist } = this.state;
    const minimumCharacterLogin = 2;
    if (inputArtist.length >= minimumCharacterLogin) return false;
    return true;
  }

  render() {
    const { buttonDisabled, inputArtist } = this.state;

    return (
      <div data-testid="page-search">
        <Header />

        <form>
          <label htmlFor="name">
            <input
              data-testid="search-artist-input"
              name="nameArtist"
              placeholder="Nome do Artista ou Banda"
              type="text"
              value={ inputArtist }
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="button-search">
            <input
              data-testid="search-artist-button"
              type="submit"
              value="Pesquisar"
              name="button-search"
              disabled={ buttonDisabled }
            />
          </label>
        </form>
      </div>
    );
  }
}
