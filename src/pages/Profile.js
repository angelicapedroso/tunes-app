import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      image: '',
      email: '',
      description: '',
    };

    this.restoreUserInfo = this.restoreUserInfo.bind(this);
  }

  componentDidMount() {
    this.restoreUserInfo();
  }

  async restoreUserInfo() {
    const data = await getUser();
    this.setState({
      name: data.name,
      image: data.image,
      email: data.email,
      description: data.description,
    });
  }

  render() {
    const { name, image, email, description } = this.state;
    return (
      <div>
        <Header />
        <section data-testid="page-profile">
          <img data-testid="profile-image" src={ image } alt={ name } />
          <Link to="/profile/edit">Editar perfil</Link>
          <p>
            Nome:
            { name }
          </p>
          <p>
            E-mail:
            { email }
          </p>
          <p>
            Descrição:
            { description }
          </p>
        </section>
      </div>
    );
  }
}
