import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import CarMap from "./CarMap";

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
                <div style={{ height: '70vh', width: '100vh' }}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: "YourGoogleMapsAPI" }}
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