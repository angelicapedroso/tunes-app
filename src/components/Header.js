import React, { Component } from 'react';
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
          <h2 data-testid="header-user-name">{ loginData }</h2>
        </header>
      ));
  }
}
