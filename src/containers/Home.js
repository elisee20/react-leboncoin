import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import SearchBar from "./Home/SearchBar";
import Listing from "./Home/Listing";

const prefix =
"http://localhost:3100/api/offer/"

//  "https://leboncoin-api.herokuapp.com/api/offer/";

var url = "";

class Home extends React.Component {
  state = {
    isLoading: true,
    data: [],
    title: "",
    priceMin: "",
    priceMax: "",
    sort: ""
  };
  handleChangeText = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
    console.log(this.state.title);
  };

  getParamsUrl = () => {
    var keys = ["title", "priceMin", "priceMax", "sort"];
    var params = [];
    for (let i = 0; i < keys.length; i++) {
      if (!this.state[keys[i]]) {
        continue;
      } else {
        params.push(keys[i] + "=" + this.state[keys[i]]);
      }
    }
    console.log("params",params);
    if (params.length === 0) return url = prefix;

    if (params.length > 1) {
      url = prefix + "?" + params[0];
      for (let i = 1; i < params.length; i++) {
        url = url + "&" + params[i];
      }
    }
    if (params.length === 1) {
      url = prefix + "?" + params[0];
    }
    console.log("new url",url);
    return url;
  };
  onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    this.getContent(this.getParamsUrl());
  };
  getContent = url => {
    console.log("url",url);
    this.setState({ isLoading: true });
    axios
      .get(url)
      .then(response => {
        console.log(response.data)
        this.setState({ data: response.data, isLoading: false });
        
      })
      .catch(error => console.log(error));
  };

  filterResults = () => {
    this.changeOrder();
    url = this.getParamsUrl();

    this.getContent(url);
  };
  changeOrder = () => {
    if (this.state.sort === "")
      this.setState({
        sort: "date-desc"
      });
    else {
      if (this.state.sort === "date-desc") {
        this.setState({
          sort: "date-asc"
        });
      }
      if (this.state.sort === "date-asc") {
        this.setState({
          sort: "date-desc"
        });
      }
    }
    console.log(this.state.sort);
  };
  renderAscDate = () => {
    if (this.state.sort === "date-desc") {
      return (
        <p className="order-cat">
          Tri: Plus récentes
          <i className="fas fa-sort-up" />
        </p>
      );
    } else {
      return (
        <p className="order-cat">
          Tri: Plus anciennes
          <i className="fas fa-sort-down" />
        </p>
      );
    }
  };


  render() {
    return (
      <React.Fragment>
        <section className="top-home">
        <SearchBar
        onSubmit={this.onSubmit}
        value={this.state.value}
        sort={this.state.sort}
        handleChangeText={this.handleChangeText}
        filterResults={this.filterResults}
        renderAscDate={this.renderAscDate}
        getParamsUrl={this.getParamsUrl}
        getContent={this.getContent}
       />
        </section>
        <section>
        <div className="list-offer">
        <Listing
        data={this.state.data} 
        isLoading={this.state.isLoading}/>
        </div>
        </section>
      </React.Fragment>
    );
  }

  componentDidMount() {

    if (this.props.location.url) {console.log("ok")}
    this.getContent(prefix);
  }
}
export default Home;
