
import React from "react";

export default class SearchBar extends React.Component {

render(){
return(
    <form id="search-offer-form" onSubmit={this.props.onSubmit}>
    <div className="search-menu">
      <input
        value={this.props.value}
        className="search-bar"
        name="title"
        onChange={this.props.handleChangeText}
        type="search"
        placeholder="Que recherchez-vous?"
        onBlur={()=>{this.props.getContent(this.props.getParamsUrl())}}
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
          value={this.props.value}
          name="priceMin"
          onChange={this.props.handleChangeText}
          type="search"
          placeholder="Prix min"
          onBlur={()=>{this.props.getContent(this.props.getParamsUrl())}}
          />
        <label>et </label>
        <input
          className="price-filter"
          value={this.props.value}
          name="priceMax"
          onChange={this.props.handleChangeText}
          type="search"
          placeholder="Prix max"
          onBlur={()=>{this.props.getContent(this.props.getParamsUrl())}}
          />
      </article>
      <article>
        <div
          className="order-button"
          onClick={() => this.props.filterResults()}
          id={
            this.props.sort === "date-desc" ? "orderAsc" : "orderDesc"
          }
        >
          {this.props.renderAscDate()}
        </div>
      </article>
    </div>
  </form>

)
        }}

