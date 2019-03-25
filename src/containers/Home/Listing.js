
import React from "react";
import { Link } from "react-router-dom";
import Item from "./Item";


export default class Listing extends React.Component {

render(){
  
    if (this.props.data.length === 0 && this.props.isLoading === false) {
        return <h2 style={{textAlign:"center"}}>Aucun résultat n'est disponible</h2>;
      } else {
          
    const offer = []; const data=this.props.data
    for (let i = 0; i < data.length; i++) {

if ( this.props.data[i].pictures[0] ) {

    offer.push(
  <Item
  data={this.props.data}
 id={this.props.data[i]._id}
 picture={this.props.data[i].pictures[0].secure_url}
 i={i}
  />
      );
} else { 
    offer.push(
        <Item
        data={this.props.data}
       id={this.props.data[i]._id}
       i={i}
        />
    )}
       
      }
    return <React.Fragment>{offer}</React.Fragment>;
    }
}
}