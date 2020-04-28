import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import { withStyles } from '@material-ui/core/styles';
<<<<<<< HEAD
=======
import Routing from '../RoutingMachine';
>>>>>>> 839033928a754a77ff4d777835f742b6fb82d912
import {
    Card,
    CardContent,
    CardHeader,
} from '@material-ui/core';

const styles = theme => ({
    map: {
        zIndex: 1
    }
})

class CustomMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coords: props.coords,
            zoom: 13,
            lat: 42.360051,
            lng: -71.060512
        }
        console.log(this.state)
    }

    render() {
        const { classes } = this.props;
        console.log("haiiii")

        const position = [this.state.lat, this.state.lng];
        // var polyline = L.polyline(this.state.coords, { color: 'red' }).addTo(map);
        return (
            <div>
                <Map center={position} zoom={this.state.zoom} className={classes.map} ref={this.saveMap}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    {this.state.coords.map(({ id, from_lat, from_long, to_lat, to_long }) => {
                        return <Polyline key={id} positions={[
                            [from_lat, from_long], [to_lat, to_long],
                        ]} color={'red'} />
                    })}
                </Map>
            </div>
        );
    }
}

export default withStyles(styles)(CustomMap);