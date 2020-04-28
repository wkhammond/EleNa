import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import { Icon } from 'leaflet';
import { withStyles } from '@material-ui/core/styles';
import L from 'leaflet';
import {
    Card,
    CardContent,
    CardHeader,
} from '@material-ui/core';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

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
            startPos: props.startPos,
            destPos: props.destPos,
            zoom: 13,
            lat: props.startPos ? props.startPos[0] : 42.360051,
            lng: props.startPos ? props.startPos[1] : -71.060512
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
                    {this.state.startPos && <Marker position={this.state.startPos} >
                        <Popup>
                            <span>test text</span>
                        </Popup>
                    </Marker>}
                    {this.state.destPos && <Marker position={this.state.destPos} />}
                </Map>
            </div>
        );
    }
}

export default withStyles(styles)(CustomMap);