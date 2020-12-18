import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

class RentedCars extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        console.log(this.props);
    }

    state = {
        cars_i_rented: []
    }

    updateState = async () => {
        try {
            var rCars = []
            this.props.rentedCars.forEach(rentedCar => {
                this.props.cars.forEach(car => {
                    if (parseInt(rentedCar._id) === parseInt(car.id)) {
                        var curr = new Date();
                        var date = curr.toISOString().substr(0, 10);
                        var available = "false";
                        if (date >= rentedCar._rentStart && date <= rentedCar._rentEnd) {
                            available = "true";
                        }
                        var rCar = {
                            id: car.id,
                            name: car.name,
                            rentStart: rentedCar._rentStart,
                            rentEnd: rentedCar._rentEnd,
                            available: available
                        }
                        rCars.push(rCar);
                    }
                });
            });
            this.setState({
                cars_i_rented: rCars
            });
        } catch (er) {
            console.log(er);
        }
    }

    componentDidMount() {
        this.updateState()
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps, this.props);
        if (prevProps !== this.props) {
            this.updateState();
        }
    }

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
        } else if (available === "false") {
        return (
            <td>
            <input
                className="form-check-input ml-1"
                type="radio"
                name="returnCar"
                value={id}
                form="returnCar_form"
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
    return this.state.cars_i_rented.map((car) => (
        <tr>
            <td>{car.name}</td>
            <td>{car.rentStart}</td>
            <td>{car.rentEnd}</td>
            {this.availabilityIcon(car.available)}
            {this.needsRadioButton(car.available, car.id)}
        </tr>
    ));
  }
}

RentedCars.propTypes = {
  userBookings: PropTypes.array.isRequired,
};

export default RentedCars;
