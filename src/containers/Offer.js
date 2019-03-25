import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Offer.css";
import Price from 'format-price';

const prefix = "http://localhost:3100/api/offer/"



export default class Offer extends React.Component {
  state = {
    data: {},
    showtel: false,
    query: ""
  };

  changeTelStatus = () => {
    this.setState({
      showtel: !this.state.showtel
    });
  };
  renderPicture =()=>{
    if (this.state.data.pictures && this.state.data.pictures[0] ) 
     return   (<div className="picture-container"><img
      src={this.state.data.pictures[0].secure_url}
      alt="offer"
      className="picture"
    />
    </div>) ; else return(<div className="empty-picture" />)
    }
  

  render() {

    console.log(this.state.data.pictures)
    return (
      <main key={this.state.data._id}>
        <header>{this.renderForm}</header>
        <div className="left-block">
         {this.renderPicture()}
          <div className="offer-title-block">
            <p>{this.state.data.title}</p>
            <p className="price">{Price.format('fr-FR', 'EUR',this.state.data.price)}</p>
          </div>
          <div className="offer-description">{this.state.data.description}</div>
        </div>
        <div className="right-block">
          <i className="fas fa-user-circle" />
          {this.state.data.creator && this.state.data.creator.account?this.state.data.creator.account.username:null}

          <div className="tel-block" onClick={this.changeTelStatus}>
            {this.state.showtel ? "06520506673" : "Voir le numero"}
          </div>
        </div>
      </main>
    );
  }

  componentDidMount() {
    axios
      .get(
        prefix
        // "https://leboncoin-api.herokuapp.com/api/offer/"
         +
          this.props.match.params.id)
      .then(response => {
        console.log(response.data);
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
