
import React, { Component, Fragment } from "react";
import "../Publish.css";

import {Link} from "react-router-dom"

export default class NotLoggedModule extends Component {
render(){

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
    )
}



}