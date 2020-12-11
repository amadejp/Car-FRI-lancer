import React, { Component } from "react";
import CarItem from "./CarItem";
import PropTypes from "prop-types";

class Cars extends Component {
  render() {
    if (this.props.cars[0] !== null) {
      console.log(this.props.cars);
      return this.props.cars.map((car) => (
        <CarItem
          key={car.id}
          car={car.name}
        />
      ));
    } else {
      {
        return <p>Žal ni na voljo nobenega avtomobila.</p>;
      }
    }
    
  }
}

Cars.propTypes = {
  cars: PropTypes.array.isRequired,
};

export default Cars;
