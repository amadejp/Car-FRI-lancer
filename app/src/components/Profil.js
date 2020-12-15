import React, { Component } from "react";
import PropTypes from "prop-types";
import CarItem from "./cars/CarItem";

// profila bi se jst čist znebil... v db bi mel samo avte, na spletni strani
// pa bi user lahko navigiru med domov, zemljevid, (trenutne) izposoje, moji avti (naj bodo stanja prisotna - ali je izposjen ali ne,
//                                                          zato da lahko car owner ob koncu izposoje potrdi in konča rent)

class Profil extends Component {
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

Profil.propTypes = {
    userData: PropTypes.object.isRequired
};

export default Profil;