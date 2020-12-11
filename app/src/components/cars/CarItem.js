import React, { Component } from "react";
import PropTypes from "prop-types";

export class CarItem extends Component {
  render() {
    console.log(this.props);
    if (this.props.name !== null) {
      return (
        <div className="card" style={{ width: "18rem" }}>
          <img className="card-img-top" src={this.props.pic} alt="Card image cap" />
          <div className="card-body">
      <h5 className="card-title">{this.props.name}</h5>
            <p className="card-text">
              Car description, specs, price
            </p>
            <a href="#" className="btn btn-primary">
              Naroči
            </a>
          </div>
        </div>
      );
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
