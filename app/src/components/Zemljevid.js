import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import CarMap from "./CarMap";

// profila bi se jst čist znebil... v db bi mel samo avte, na spletni strani
// pa bi user lahko navigiru med domov, zemljevid, (trenutne) izposoje, moji avti (naj bodo stanja prisotna - ali je izposjen ali ne,
//                                                          zato da lahko car owner ob koncu izposoje potrdi in konča rent)


class Zemljevid extends Component {
    
    static defaultProps = {
        center: {
            lat: 46.05,
            lng: 14.47
        },
        zoom: 11
    };

    render() {
        if (this.props.cars[0] !== null) {
            
            return (
                <div style={{ height: '85vh', width: '100vh' }}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDeTGhQkbsgRiM7eN8l3pWJ5eWItc_r0Ys" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    >   
                    {this.props.cars.map((car) => (
                        <CarMap
                            car={car}
                            lat={car.lat}
                            lng={car.lng}
                        />
                    ))
                    }
                    </GoogleMapReact>
                </div>
            )
        } else {
            return <p>Tega ne bi smel videti...</p>
        }
    }
}

Zemljevid.propTypes = {
    cars: PropTypes.array.isRequired,
  };

export default Zemljevid;