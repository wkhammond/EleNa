import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import { withStyles } from '@material-ui/core/styles';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
const greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
const purpleIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
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
    }

    render() {
        const { classes } = this.props;

        const position = [this.state.lat, this.state.lng];
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
                    {this.state.startPos && <Marker position={this.state.startPos} icon={greenIcon} >
                        <Popup>
                            <span>Start</span>
                        </Popup>
                    </Marker>}
                    {this.state.destPos && <Marker position={this.state.destPos} icon={purpleIcon} >
                        <Popup>
                            <span>Destination</span>
                        </Popup>
                    </Marker>}
                </Map>
            </div>
        );
    }
}

export default withStyles(styles)(CustomMap);