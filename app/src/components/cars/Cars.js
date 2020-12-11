import React, { Component } from "react";
import CarItem from "./CarItem";
import PropTypes from "prop-types";

class Cars extends Component {
  render() {
    return this.props.cars.map((car) => (
      <CarItem
        key={car.id}
        car={car}
      />
    ));
  }
}

Cars.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default Cars;
