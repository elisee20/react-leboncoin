import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

const prefix = "https://leboncoin-api.herokuapp.com/api/offer";
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
    console.log(params);
    if (params.length === 0) url = prefix;

    if (params.length > 1) {
      url = prefix + "?" + params[0];
      for (let i = 1; i < params.length; i++) {
        url = url + "&" + params[i];
      }
    }
    if (params.length === 1) {
      url = prefix + "?" + params[0];
    }
    console.log(url);
    return url;
  };
  onSubmit = event => {
    event.preventDefault();
    url = this.getParamsUrl();
    console.log("url2" + url);
    this.getContent(url);
  };
  getContent = url => {
    this.setState({ isLoading: true });
    axios
      .get(url)
      .then(response => {
        // console.log(response.data);
        this.setState({ data: response.data, isLoading: false });
        // console.log(this.state.data);
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

  displayListing = () => {
    if (this.state.data.length === 0 && this.state.isLoading === false) {
      return <h2 className="  ">Aucun résultat n'est disponible</h2>;
    } else {
      var offer = [];
      for (let i = 0; i < this.state.data.length; i++) {
        // console.log(this.state.data[i].title);
        offer.push(
          <article key={this.state.data[i]._id}>
            <Link to={"/offer/" + this.state.data[i]._id}>
              <div className="list-offer-picture" />
            </Link>
            <div className="list-offer-block">
              <Link to={"/offer/" + this.state.data[i]._id}>
                <p className="list-offer-price">{this.state.data[i].title}</p>
              </Link>
              <p className="list-offer-title">{this.state.data[i].price}</p>
            </div>
          </article>
        );
      }
      console.log(offer);
      return <div>{offer}</div>;
    }
  };
  render() {
    return (
      <React.Fragment>
        <section className="top-home">
          <form onSubmit={this.onSubmit} id="search-offer-form">
            <div className="search-menu">
              <input
                value={this.state.value}
                className="search-bar"
                name="title"
                onChange={this.handleChangeText}
                type="search"
                placeholder="Que recherchez-vous?"
              />
              <button
                type="submit"
                id="search-button"
                className="search-button"
              >
                Rechercher
              </button>
            </div>
            <div className="filter-menu">
              <article>
                <label>Prix entre </label>
              </article>
              <article className="price-range">
                <input
                  className="price-filter"
                  value={this.state.value}
                  name="priceMin"
                  onChange={this.handleChangeText}
                  type="search"
                  placeholder="Prix min"
                />
                <label>et </label>
                <input
                  className="price-filter"
                  value={this.state.value}
                  name="priceMax"
                  onChange={this.handleChangeText}
                  type="search"
                  placeholder="Prix max"
                />
              </article>
              <article>
                <div
                  className="order-button"
                  onClick={() => this.filterResults()}
                  id={
                    this.state.sort === "date-desc" ? "orderAsc" : "orderDesc"
                  }
                >
                  {this.renderAscDate()}
                </div>
              </article>
            </div>
          </form>
        </section>
        <section>
          <div className="search">{this.renderForm}</div>
          <div className="list-offer">{this.displayListing()}</div>
        </section>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getContent(prefix);
  }
}
export default Home;
