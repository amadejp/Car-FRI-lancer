import React, { Component } from "react";
import PropTypes from "prop-types";

export class CarItem extends Component {
  render() {
    const { id, name } = this.props.car;
    return <div>{name}</div>;
  }
}

// PropTypes
CarItem.propTypes = {
  car: PropTypes.object.isRequired,
};

export default CarItem;
