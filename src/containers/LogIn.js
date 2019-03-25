import React, { Component } from "react";
import axios from "axios";
import "./LogIn.css";

class LogIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    const url=
    "http://localhost:3100/api/user/log_in"
    // "https://leboncoin-api.herokuapp.com/api/user/log_in"


    axios
      .post(
        url
        , {
        email: this.state.email,
        password: this.state.password
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
      <div className="signup-page">
        <div className={["half-block", "center"].join(" ")}>
          <div className="wrapper">
            <h2>Connexion</h2>
            <form
              onSubmit={this.onSubmit}
              id="login-form"
              className="signup-form"
            >
              <label htmlFor="email">Adresse Email</label>
              <input
                id="email"
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <div className="spacer-height" />
              <button type="submit">Se connecter</button>
            </form>
          </div>

          <div className="horizontal-bar" />
          <div className="wrapper">
            <h3>Vous n'avez pas de compte?</h3>
            <button className="reverse"> Créer un compte </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
