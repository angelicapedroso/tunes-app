import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import OnLoad from './OnLoad';
import '../style/Header.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loginData: '',
      loading: false,
    };
    this.retrieveUserData = this.retrieveUserData.bind(this);
  }

  componentDidMount() {
    this.retrieveUserData();
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
          <Link to="/search" data-testid="link-to-search">
            <li>Pesquisar</li>
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <li>Músicas Favoritas</li>
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            <li>Meu Perfil</li>
          </Link>
          <div>
            <h2 data-testid="header-user-name">{ loginData }</h2>
          </div>
        </header>
      ));
  }
}
