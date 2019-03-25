
import React from "react";
import { Link } from "react-router-dom";
import Price from 'format-price';

export default class Listing extends React.Component {

  renderPicture =()=>{
    if (this.props.picture){
      return   (<img
      src={this.props.picture}
      alt="offer"
      className="list-offer-picture"
    />)
    }
else return (  <div className="list-offer-empty-picture" />     )


  }
    render(){
        const i=this.props.i

        return(
            <article key={this.props.id}>
            <Link to={"/offer/" + this.props.id}>
        {this.renderPicture()}  
            </Link>
            <div className="list-offer-block">
              <Link to={"/offer/" +  this.props.id}>
                <p className="list-offer-price">{this.props.data[i].title}</p>
              </Link>
              <p className="list-offer-title">{Price.format('fr-FR', 'EUR',this.props.data[i].price)}</p>
            </div>
          </article>


        ) 
    }
}