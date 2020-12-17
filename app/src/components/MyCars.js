import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

class MyCars extends Component {
  availabilityIcon(available) {
    if (available === "true") {
      return (
        <td>
          <FontAwesomeIcon icon={faCheck} />
        </td>
      );
    } else if (available === "pending") {
      return (
        <td>
          <FontAwesomeIcon icon={faQuestion} />
        </td>
      );
    } else {
      return (
        <td>
          <FontAwesomeIcon icon={faTimes} />
        </td>
      );
    }
  }

  needsRadioButton(available, id) {
    if (available === "true") {
        return (
            <td></td>
        );
      } else if (available === "pending") {
        return (
            <td>
            <input
              className="form-check-input ml-1"
              type="radio"
              name="endRent"
              value={id}
              form="endRent_form"
            ></input>
          </td>
        );
      } else {
        return (
            <td></td>
        );
      }
  }

  render() {
    if (this.props.ownedCars[0] !== null) {
      if (this.props.ownedCars.length > 0) {
        return this.props.ownedCars.map((car) => (
          <tr>
            <td>{car.name}</td>
            <td>{car.year}</td>
            <td>{car.location}</td>
            <td>{car.price}</td>
            {this.availabilityIcon(car.available)}
            {this.needsRadioButton(car.available, car.id)}
          </tr>
        ));
      } else {
        return (
          <tr>
            <td>Žal še nimaš dodanega avtomobila...</td>
          </tr>
        );
      }
    } else {
      return (
        <tr>
          <td>Nalagam...</td>
        </tr>
      );
    }
  }
}

MyCars.propTypes = {
  ownedCars: PropTypes.array.isRequired,
};

export default MyCars;
