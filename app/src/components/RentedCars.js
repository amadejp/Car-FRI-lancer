import React, { Component } from "react";
import PropTypes from "prop-types";
import CarItem from "./cars/CarItem";

class RentedCars extends Component {
  render() {
      console.log("1", this.props.rentedCars);
    if (this.props.rentedCars !== undefined) {
        console.log("2", this.props.rentedCars);
      if (this.props.rentedCars.length > 0 && this.props.rentedCars[0] !== null) {
        return this.props.rentedCars.map((rent) => (
          <div>
            <p>{rent._id}</p>
          </div>
        ));
      } else {
        return (
          <div>
            <p>Nisi si izposodil še nobenega avtomobila.</p>
          </div>
        );
      }
    } else {
      return (
        <div>
          <p>Nalagam...</p>
        </div>
      );
    }
  }
}

RentedCars.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default RentedCars;
