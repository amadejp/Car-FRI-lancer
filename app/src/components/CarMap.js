import React, { Component } from "react";
import PropTypes from "prop-types";

export class CarMap extends Component {
  setReservation(car) {
    localStorage.setItem("reservation", car);
    window.location = "/rent-form";
  }

  render() {
      if (this.props.car.name !== null) {
        const {id, name, price} = this.props.car;
        return <div className="card" style={{ width: "10rem", margin: "2px" }}>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{price}€ / dan</p>
                <button
                onClick={() => this.setReservation(id)}
                className="btn btn-primary"
                >
                Naroči
                </button>
            </div>
        </div>
      }
  }
}

CarMap.propTypes = {
  car: PropTypes.object.isRequired,
};

export default CarMap;
