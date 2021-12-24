import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      collectionImage: '',
      listMusics: [],
    };

    this.fetchMusic = this.fetchMusic.bind(this);
  }

  componentDidMount() {
    this.fetchMusic();
  }

  async fetchMusic() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    console.log(data);
    this.setState({
      artistName: data[0].artistName,
      collectionName: data[0].collectionName,
      collectionImage: data[0].artworkUrl100,
    }, () => {
      this.setState({
        listMusics: [...data],
      });
    });
  }

  render() {
    const { artistName, collectionName, collectionImage, listMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2>Álbum</h2>
        <img src={ collectionImage } alt={ collectionName } />
        <h3 data-testid="album-name">{ collectionName }</h3>
        <h4 data-testid="artist-name">{ artistName }</h4>
        { listMusics.map((music, index) => (
          index === 0 ? null : <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
          />
        )) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
