import React, { Component } from "react";
import PropTypes from "prop-types";
import CarItem from "./cars/CarItem";

class RentedCars extends Component {
    render() {
        if (this.props.userData !== null) {
            const { id, name, ownedCars, rentedCars } = this.props.userData;
            return (
                <div>
                    <p>ID : {id}</p>
                    <p>Name : {name}</p>
                    <p>Število mojih avtov : {ownedCars.length}</p>
                    <p>Število izposojenih avtov : {rentedCars.length}</p>
                </div>
            )
        } else {
            return <p>Tega ne bi smel videti...</p>
        }
    }
}

RentedCars.propTypes = {
    userData: PropTypes.object.isRequired
};

export default RentedCars;