import React, { Component } from "react";
import CarItem from "./CarItem";
import PropTypes from "prop-types";

import "../../styles/CarItem.css";

class Cars extends Component {
  render() {
    if (this.props.cars[0] !== null) {
      return this.props.cars.map((car) => (
          <div className="col auto mb-4">
          <CarItem key={car.id} car={car} />
          </div>
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
