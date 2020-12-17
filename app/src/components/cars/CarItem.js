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
  setReservation(car) {
    localStorage.setItem("reservation", car);
    window.location = "/rent-form";
  }

  render() {
    if (this.props.car.name !== null && this.props.car.available === "true") {
      const { id, name, pic, trans, power, acc, price } = this.props.car;
      return (
        <div className="col auto mb-4">
          <div className="card" style={{ width: "16rem", margin: "10px" }}>
            <img className="card-img-top" src={pic} alt="car pic" />
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
                <p className="Car-price">{price}€ / dan</p>
                <button
                  onClick={() => this.setReservation(id)}
                  className="btn btn-primary"
                >
                  Naroči
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

CarItem.propTypes = {
  car: PropTypes.object.isRequired,
};

export default CarItem;
