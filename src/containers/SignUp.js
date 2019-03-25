import React, { Component } from "react";
import axios from "axios";
import "./SignUp.css";
import LeftBlock from "./SignUp/LeftBlock"
import Register from "./SignUp/Register"

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    error:false
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
      .post(
        "http://localhost:3100/api/user/sign_up"
        // "https://leboncoin-api.herokuapp.com/api/user/sign_up"
        , {
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
          <LeftBlock/>
          <div className="half-block">
            <h2>Créer un compte</h2>
            <Register 
              value={this.state.value}
              handleChange={this.handleChange}
              onSubmit={this.onSubmit}
              />
          </div>
        </div>
      </section>
    );
  }
}

export default SignUp;
