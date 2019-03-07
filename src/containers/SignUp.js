import React, { Component } from "react";
import axios from "axios";
import "./SignUp.css";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    username: ""
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;

    // Utile si le formulaire contient des éléments "checkbox"
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    // event.preventDefault(event);
    axios
      .post("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
      .then(response => {
        console.log(response.data);
        if (response.data && response.data.token) {
          this.props.logIn({
            token: response.data.token,
            username: response.data.account.username,
            _id: response.data._id
          });

          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    return (
      <section className="top">
        <div className="signup-page">
          <div className="half-block">
            <h2>Pourquoi créer un compte</h2>
            <div>
              <div className="half">
                <i className="fa fa-clock-o" aria-hidden="true" />
                <div>
                  <h3>Gagnez du temps</h3>
                  <span>
                    Publiez vos annonces rapidement, avec vos informations
                    pré-remplies chaque fois que vous souhaitez déposer une
                    nouvelle annonce
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="half">
                <div className="fa fa-clock-o" aria-hidden="true" />
                <div>
                  <h3> Soyez les premiers informés</h3>
                  <div>
                    Créez vos alertes Immo ou Emploi et ne manquez jamais
                    l’annonce qui vous intéresse
                  </div>
                </div>
              </div>
            </div>
            <div className="half">
              <i className="far fa-eye" aria-hidden="true" />
              <div>
                <h3>Visibilité</h3>
                <div>
                  Suivez les statistiques de vos annonces (nombre de fois ou
                  votre annonce a été vue, nombre de contacts reçus)
                </div>
              </div>
            </div>
          </div>
          <div className="half-block">
            <h2>Créer un compte</h2>
            <form onSubmit={this.onSubmit} id="signup-form">
              <div className="full-half-block">
                <label htmlFor="username">Pseudo</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="full-half-block-form"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="full-half-block-form"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <span className="half-block-2-columns">
                <div>
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="spacer" />
                <div>
                  <label htmlFor="password">Confirmer le mot de passe </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
              </span>
              <div className="spacer-height" />
              <span>
                <li>
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="privacy">
                    Je souhaite recevoir les offres partenaires du site
                    leboncoin susceptibles de m'intéresser
                  </label>
                </li>
                <li>
                  <input
                    id="cgv"
                    name="cgv"
                    type="checkbox"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="cgv">
                    "J'accepte les Conditions Générales de Vente"
                  </label>
                </li>
              </span>
              <div className="spacer-height" />

              <button type="submit">Créer mon compte personnel</button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default SignUp;
