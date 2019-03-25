import React, { Component, Fragment } from "react";
import "../Publish.css";
export default class ImageToUpload extends Component {
    render(){
        return(
            <img
            src={this.props.files[this.props.i]}
            alt="preview"
            className="img-preview"
            onClick={() => this.props.deleteImage(this.props.files[this.props.i])}
          />
        )
    }
}