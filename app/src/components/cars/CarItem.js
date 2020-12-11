import React, { Component } from "react";
import PropTypes from "prop-types";

export class CarItem extends Component {
  render() {
    if (this.props.car !== null) {
      const { key, name } = this.props.car;
      return <div>{name}</div>;
    } else {
      {
        return <p>Žal ni na voljo nobenega avtomobila.</p>;
      }
    }
  }
}

// PropTypes
CarItem.propTypes = {
  car: PropTypes.object.isRequired,
};

export default CarItem;
