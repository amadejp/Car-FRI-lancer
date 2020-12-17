import React, { Component } from "react";
import PropTypes from "prop-types";
import CarItem from "./cars/CarItem";

class RentedCars extends Component {
  render() {
    if (this.props.rentedCars !== undefined) {
      if (this.props.rentedCars.length > 0 && this.props.rentedCars[0] !== null) {
        return this.props.rentedCars.map((rent) => (
            <tr>
                <td>{rent.name}</td>
                <td>{rent.year}</td>
                <td>{rent.location}</td>
                <td>
                    {rent.price}
                </td>
                <td>
                    {(!rent.available).toString()}
                </td>
            </tr>
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
