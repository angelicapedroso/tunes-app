import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import OnLoad from './OnLoad';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loginData: '',
      loading: false,
    };
    this.retrieveUserData = this.retrieveUserData.bind(this);
  }

  async retrieveUserData() {
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState({ loading: false, loginData: name });
  }

  render() {
    const { loginData, loading } = this.state;
    return (
      loading ? (<OnLoad />) : (
        <header data-testid="header-component">
          <h2 data-testid="header-user-name">{ loginData }</h2>

          <nav>
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
            <Link to="/profile" data-testid="link-to-profile">Meu Perfil</Link>
          </nav>
        </header>
      ));
  }
}
