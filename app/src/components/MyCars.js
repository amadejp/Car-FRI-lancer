import React, { Component } from "react";
import PropTypes from "prop-types";

// tukaj bodo prikazani avtomobili uporabnika in gumb za dodajanje novega avtomobila

class MyCars extends Component {
  render() {
    if (this.props.ownedCars[0] !== null) {
      if (this.props.ownedCars.length > 0) {
        return this.props.ownedCars.map((car) => (
            <tr>
                <td>{car.name}</td>
                <td>{car.year}</td>
                <td>{car.location}</td>
                <td>
                    {car.price}
                </td>
                <td>
                    {(!car.available).toString()}
                </td>
            </tr>
        ));
      } else {
        return (
          <div>
            <p>Žal še nimaš dodanega avtomobila...</p>
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

MyCars.propTypes = {
  myCars: PropTypes.array.isRequired,
};

export default MyCars;
