import React, { Component } from "react";
import axios from "axios";
import "../SignUp.css";

export default class LeftBlock extends Component {

    render(){
        return(
<div className="half-block">
            <h2>Pourquoi créer un compte</h2>
            <div>
              <div className="half">
                <i className="fa fa-clock-o" aria-hidden="true" />
                <div>
                  <h3>Gagnez du temps</h3>
                  <span>
                    Publiez vos annonces rapidement, avec vos informations
                    pré-remplies chaque fois que vous souhaitez déposer une
                    nouvelle annonce
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="half">
                <div className="fa fa-clock-o" aria-hidden="true" />
                <div>
                  <h3> Soyez les premiers informés</h3>
                  <div>
                    Créez vos alertes Immo ou Emploi et ne manquez jamais
                    l’annonce qui vous intéresse
                  </div>
                </div>
              </div>
            </div>
            <div className="half">
              <i className="far fa-eye" aria-hidden="true" />
              <div>
                <h3>Visibilité</h3>
                <div>
                  Suivez les statistiques de vos annonces (nombre de fois ou
                  votre annonce a été vue, nombre de contacts reçus)
                </div>
              </div>
            </div>
          </div>

        )
    }
}