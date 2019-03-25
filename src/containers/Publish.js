import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Form from "./Publish/Form"
import NotLoggedModule from "./Publish/NotLoggedModule"

// import Cookies from "js-cookie";
import axios from "axios";
import "./Publish.css";

class Publish extends Component {
  state = {
    title: "",
    description: "",
    price: "",
    files: []
  };
  handleFiles = files => {
    let newFiles = [...this.state.files];
    newFiles = newFiles.concat(files.base64);
    this.setState(
      {
        files: newFiles
      },
      () => console.log("state", this.state)
    );
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
    console.log(this.state);
  };
  onSubmit = event => {
    const prefix ="http://localhost:3100/api/offer/";
// "https://leboncoin-api.herokuapp.com/api/offer/

    axios
      .post(
        prefix+"publish",
        {
          title: this.state.title,
          description: this.state.description,
          price:  parseInt(this.state.price,10),
          files: this.state.files
        },
        {
          headers: {
            // Authorization: "Bearer " + "AxsiU7NKV18t5COQ"
            Authorization: "Bearer " + this.props.user.token
          }
        }
      )
      .then(response => {
        if (response.status===200) 
      return  this.props.history.push("/offer/"+response.data._id)
      })
      .catch(err => {
        return alert ("une erreur s'est produite, veuillez recommencer")
        // console.log(err);
      });
    event.preventDefault();
  };

  

  deleteImage = file => {
    var index = this.state.files.indexOf(file);
    let newFiles = [...this.state.files];
    newFiles.splice(index, 1);
    this.setState({
      files: newFiles
    });
  };
  render() {
    if (!this.props.user) {
      // console.log(this.props.user);
      return (
  <NotLoggedModule/>
      );
    } else {
      // console.log(this.props.user.token);

      return (
        <Fragment>
          <h2>Publier une annonce</h2>
          <div id="post-advertisement">
            <div className="form-title">
              <h3>Votre annonce</h3>
            </div>
                <Form 
                onSubmit={this.onSubmit}
                handleChange={this.handleChange}
                value={this.state.value}
                renderImageUpload={this.renderImageUpload}
                files={this.state.files}
                handleFiles={this.handleFiles}
                /> 
          </div>
          <div className="half-block" />
        </Fragment>
      );
    }
  }
}
export default Publish;
