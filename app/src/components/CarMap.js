import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export class CarMap extends Component {
  setReservation(car) {
    localStorage.setItem("reservation", car);
    window.location = "/rent-form";
  }

    pokaziSkrij(id) {
        console.log(id);
        var items = document.getElementsByName(id);
        for (let item of items) {
            if (item.style.display === "none") {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
    }

  render() {
      if (this.props.car.name !== null) {
        const {id, name, price} = this.props.car;
        return (
        <div>
            <div 
            className="card"
            name={id}
            style={{ width: "fit-content", margin: "2px", display: "none" }}
            onClick={() => this.pokaziSkrij(id)}>
                <div className="card-body">
                    <h5 className="card-title">
                        {name}
                    </h5>
                    <p className="card-text">
                        {price}€ / dan
                    </p>
                    <button onClick={() => this.setReservation(id)} className="btn btn-primary">
                        Naroči
                    </button>
                </div>
            </div>
            <div
            name={id}
            onClick={() => this.pokaziSkrij(id)}>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="fa-3x" style={{ color: "DarkRed", transform: "translate(-50%, -100%)" }}/>
            </div>
        </div>
        )}
  }
}

CarMap.propTypes = {
  car: PropTypes.object.isRequired,
};

export default CarMap;
