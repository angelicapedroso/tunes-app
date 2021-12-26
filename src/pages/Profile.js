import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import OnLoad from '../components/OnLoad';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
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
    this.setState({ loading: true });
    const data = await getUser();
    this.setState({
      loading: false,
      name: data.name,
      image: data.image,
      email: data.email,
      description: data.description,
    });
  }

  render() {
    const { loading, name, image, email, description } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-profile">
          { loading
            ? <OnLoad />
            : (
              <div>
                <section>
                  <img data-testid="profile-image" src={ image } alt={ name } />
                  <Link to="/profile/edit">Editar perfil</Link>
                  <p>
                    Nome:
                  </p>
                  <p>
                    { name }
                  </p>
                  <p>
                    E-mail:
                  </p>
                  <p>
                    { email }
                  </p>
                  <p>
                    Descrição:
                  </p>
                  <p>
                    { description }
                  </p>
                </section>
              </div>
            ) }
        </div>
      </div>
    );
  }
}
