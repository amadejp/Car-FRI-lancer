import React, { Component } from "react";
import PropTypes from "prop-types";

class RentedCars extends Component {
  render() {
    if (this.props.userBookings !== undefined) {
      if (this.props.userBookings.length > 0 && this.props.userBookings[0] !== null) {
        return this.props.userBookings.map((rent) => (
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
  userBookings: PropTypes.array.isRequired,
};

export default RentedCars;
