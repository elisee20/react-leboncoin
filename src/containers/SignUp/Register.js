import React, { Component } from "react";
import axios from "axios";
import "../SignUp.css";

export default class Register extends Component {
render(){
    return(
        <form onSubmit={this.onSubmit} id="signup-form">
        <div className="full-half-block">
          <label htmlFor="username">Pseudo</label>
          <input
            id="username"
            name="username"
            type="text"
            className="full-half-block-form"
            value={this.props.value}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="full-half-block-form"
            value={this.props.value}
            onChange={this.handleChange}
          />
        </div>
        <span className="half-block-2-columns">
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="checkPassword"
              type="password"
              value={this.props.value}
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
              value={this.props.value}
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
              value={this.props.value}
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
              value={this.props.value}
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
    )
}
}