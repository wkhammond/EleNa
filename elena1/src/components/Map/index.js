import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { withStyles } from '@material-ui/core/styles';
import Routing from '../RoutingMachine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
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
    state = {
        lat: 57.74,
        lng: 11.94,
        zoom: 13,
        isMapInit: false
    };
    saveMap = map => {
        this.map = map;
        this.setState({
          isMapInit: true
        });
      };

    render() {
        const { classes } = this.props;

        // let selectedNodeArray = [];
        // let unselectedNodeArray = [];

        // let markers = (<div />);
        

        // if (selectedNodeArray.length > 0) {
        //     markers = (
        //         <>
        //             <Marker position={selectedNodeArray[0]}>
        //                 <Popup>
        //                     Starting Location
        //                 </Popup>
        //             </Marker>
        //             <Marker className={'endMarker'} position={selectedNodeArray[(selectedNodeArray.length - 1)]}>
        //                 <Popup>
        //                     Ending Location
        //                 </Popup>
        //             </Marker>
        //         </>
        //     )
        // }

        const start = [42.360051, -71.060512];
        const end = [42.358571, -71.061637];
        const center = [42.356271, -71.062269]

        const position = [this.state.lat, this.state.lng];

        return (
            <div>
            <Map center={position} zoom={this.state.zoom} className={classes.map} ref={this.saveMap}>
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {this.state.isMapInit && <Routing map={this.map}/>}
            </Map>
            </div>
        );
    }
}

export default withStyles(styles)(CustomMap);