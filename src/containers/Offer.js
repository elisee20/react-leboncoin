import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Offer.css";
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

  render() {
    // console.log(this.props.match.params.id);
    return (
      <main key={this.state.data._id}>
        <header>{this.renderForm}</header>
        <div className="left-block">
          <div className="picture" />
          <div className="offer-title-block">
            <p>{this.state.data.title}</p>
            <p className="price">{this.state.data.price}</p>
          </div>
          <div className="offer-description">{this.state.data.description}</div>
        </div>
        <div className="right-block">
          <i className="fas fa-user-circle" />
          {/* {this.state.data.creator.account.username} */}

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
        "https://leboncoin-api.herokuapp.com/api/offer/" +
          this.props.match.params.id
      )
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
