import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import OnLoad from './OnLoad';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checkedDisabled: false,
      loading: false,
    };

    this.FavoriteSong = this.FavoriteSong.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ checkedDisabled: true }, () => {
      this.FavoriteSong();
    });
  }

  FavoriteSong() {
    const { musicInfo } = this.props;
    this.setState({ loading: true });
    addSong(musicInfo).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checkedDisabled, loading } = this.state;
    return (
      <div>
        { loading ? (
          <OnLoad />
        ) : (
          <div>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>

            <label htmlFor="favorite">
              Favorita
              <input
                type="checkbox"
                name="favorite"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleChange }
                checked={ checkedDisabled }
              />
            </label>
          </div>
        ) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  musicInfo: PropTypes.shape().isRequired,
  trackId: PropTypes.number.isRequired,
};
