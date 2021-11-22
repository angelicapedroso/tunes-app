import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import OnLoad from '../components/OnLoad';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      inputArtist: '',
      loading: false,
      messageSearchArtist: '',
      albums: [],
    };
    this.verificationButtonDisabled = this.verificationButtonDisabled.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButtonSearch = this.onClickButtonSearch.bind(this);
    this.requisitionSearchArtist = this.requisitionSearchArtist.bind(this);
  }

  onClickButtonSearch() {
    this.requisitionSearchArtist();
    this.setState({ inputArtist: '' });
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({ inputArtist: value }, () => {
      this.setState({ buttonDisabled: this.verificationButtonDisabled() });
    });
  }

  async requisitionSearchArtist() {
    const { inputArtist } = this.state;
    this.setState({ loading: true });
    const searchAlbum = await searchAlbumsAPI(inputArtist);
    if (searchAlbum.length) {
      this.setState({
        loading: false,
        messageSearchArtist: `Resultado de álbuns de: ${inputArtist}`,
        albums: searchAlbum,
      });
    } else {
      this.setState({
        loading: false,
        messageSearchArtist: 'Nenhum álbum foi encontrado',
        albums: [],
      });
    }
  }

  verificationButtonDisabled() {
    const { inputArtist } = this.state;
    const minimumCharacterLogin = 2;
    if (inputArtist.length >= minimumCharacterLogin) return false;
    return true;
  }

  render() {
    const { buttonDisabled,
      inputArtist,
      loading,
      messageSearchArtist,
      albums,
    } = this.state;

    return (
      <div>
        <Header />
        { loading ? <OnLoad />
          : (
            <div data-testid="page-search">
              <form>
                <label htmlFor="name">
                  <input
                    data-testid="search-artist-input"
                    name="messageSearchArtist"
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
                    onClick={ this.onClickButtonSearch }
                  />
                </label>
              </form>
            </div>) }

        <div>
          <section>
            <h2>{ messageSearchArtist }</h2>
            { albums.map((info) => (
              <div key="info.artistId">
                <p>{ info.artistName }</p>
                <h4>{ info.collectionName }</h4>
                <img src={ info.artworkUrl100 } alt={ info.collectionName } />
                <Link
                  data-testid={ `link-to-album-${info.collectionId}` }
                  to={ `/album/${info.collectionId}` }
                >
                  Album
                </Link>
              </div>
            )) }
          </section>

        </div>
      </div>
    );
  }
}
