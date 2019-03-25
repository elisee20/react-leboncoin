import React, { Component, Fragment } from "react";
import "../Publish.css";
import ReactFileReader from "react-file-reader";
import ImageToUpload from "./ImageToUpload"

export default class Form extends Component {

    renderImageUpload() {
        var counter = this.props.files.length;
        let previewUpload = [];
        for (let i = 0; i < counter; i++) {
          previewUpload.push(
            <div key={`preview-Img-${i}`} className="img-preview">
            <ImageToUpload 
            files={this.props.files}
            deleteImage={this.deleteImage}
            i={i}
            />
            </div>
          );
        }
        for (let i = counter; i < 6; i++) {
          for (let i = counter; i < 6; i++) {
            previewUpload.push(
              <div key={i} className="img-preview">
                <ReactFileReader
                  fileTypes={[".png", ".jpeg", ".jpg"]}
                  base64={true}
                  multipleFiles={false} // `false si une seule image`
                  handleFiles={this.props.handleFiles}
                  // elementId={i}
                >
                 <div>
                  <p>choisir une image</p>
                  <i className="far fa-image" />
                  </div>
                </ReactFileReader>
              </div>
            );
          }
          return previewUpload;
        }
      }

    render(){
        return(
            <form onSubmit={this.props.onSubmit}>
            <div className="half-block">
              <label>Titre de l'annonce</label>
              <input
                type="text"
                id="title"
                name="title"
                value={this.props.value}
                onChange={this.props.handleChange}
              />
              <label>Texte de l'annonce</label>
              <input
                type="text"
                id="description"
                name="description"
                value={this.props.value}
                onChange={this.props.handleChange}
              />
              <label>Prix</label>
              <input
                type="text"
                id="price"
                name="price"
                value={this.props.value}
                onChange={this.props.handleChange}
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
        )
    }
}