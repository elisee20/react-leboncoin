import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ReactFileReader from "react-file-reader";
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
    // console.log("publish");
    // console.log(this.state);
    axios
      .post(
        "https://leboncoin-api.herokuapp.com/api/offer/publish",
        {
          title: this.state.title,
          description: this.state.description,
          price: this.state.price,
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
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  renderImageUpload() {
    var counter = this.state.files.length;
    let imagePreview = [];
    for (let i = 0; i < counter; i++) {
      imagePreview.push(
        <div key={i} className="img-preview">
          <img
            src={this.state.files[i]}
            alt="preview"
            className="img-preview"
            onClick={() => this.deleteImage(this.state.files[i])}
          />
        </div>
      );
    }
    for (let i = counter; i < 6; i++) {
      for (let i = counter; i < 6; i++) {
        imagePreview.push(
          <div key={i} className="img-preview">
            <ReactFileReader
              fileTypes={[".png", ".jpeg", ".jpg"]}
              base64={true}
              multipleFiles={false} // `false si une seule image`
              handleFiles={this.handleFiles}
              // elementId={i}
            >
              <p>choisir une image</p>
              <i className="far fa-image" />
            </ReactFileReader>
          </div>
        );
      }
      return imagePreview;
    }
  }

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
      console.log(this.props.user);
      return (
        <div className="half-block">
          Vous n'etes pas connectés.
          <Link to="/log_in">
            <button className="reverse">Connectez-vous svp</button>
          </Link>
          <p>ou</p>
          <Link to="/sign_up">
            <button>Créez un compte</button>
          </Link>
        </div>
      );
    } else {
      console.log(this.props.user.token);

      return (
        <Fragment>
          <h2>Publier une annonce</h2>
          <div id="post-advertisement">
            <div className="form-title">
              <h3>Votre annonce</h3>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="half-block">
                <label>Titre de l'annonce</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <label>Texte de l'annonce</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <label>Prix</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <section className="photos">
                  <label>
                    Photos : Une annonce avec photo est 7 fois plus consultée
                  </label>
                  <div className="img-preview-section">
                    {this.renderImageUpload()}
                  </div>
                </section>
                <button type="submit" id="publish">
                  Valider
                </button>
              </div>
            </form>
          </div>
          <div className="half-block" />
        </Fragment>
      );
    }
  }
}
export default Publish;
