import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardHeader,
} from '@material-ui/core';

const styles = theme => ({
})

class CustomMap extends React.Component {



    render() {

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

        return (
            <div>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"></link>
            <Map center={[45.4, -75.7]} zoom={12} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>
            </div>
        )
    }
}

export default withStyles(styles)(CustomMap);