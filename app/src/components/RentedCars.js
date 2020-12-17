import React, { Component } from "react";
import PropTypes from "prop-types";

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
          <tr>
            <td>Nisi si izposodil še nobenega avtomobila.</td>
          </tr>
        );
      }
    } else {
      return (
        <div>
          <td>Nalagam...</td>
        </div>
      );
    }
  }
}

RentedCars.propTypes = {
  rentedCars: PropTypes.array.isRequired,
};

export default RentedCars;
