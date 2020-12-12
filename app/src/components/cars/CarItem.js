import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faTachometerAlt,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/CarItem.css";

export class CarItem extends Component {

  render() {
    if (this.props.name !== null) {
      const { name, pic, trans, power, acc, price } = this.props.car;
      return (
          <div className="card" style={{ width: "16rem", margin: "10px" }}>
            <img className="card-img-top" src={pic} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">
                <FontAwesomeIcon icon={faBolt} /> {power} KM
              </p>
              <p className="card-text">
                <FontAwesomeIcon icon={faTachometerAlt} /> {acc} s do 100 km/h
              </p>
              <p className="card-text">
                <FontAwesomeIcon icon={faCog} /> {trans} menjalnik
              </p>
              <div>
                <a href="/rent-form" className="btn btn-primary">Naroči</a>
                <p className="Car-price">{price}€ / dan</p>
              </div>
            </div>
          </div>
      );
    } else {
      {
        return <p>Žal ni na voljo nobenega avtomobila.</p>;
      }
    }
  }
}

CarItem.propTypes = {
  car: PropTypes.object.isRequired,
};

export default CarItem;
