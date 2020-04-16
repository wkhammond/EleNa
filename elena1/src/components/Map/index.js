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
            <Map center={[45.4, -75.7]} zoom={13} zoomControl={false}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
            </Map>
            </div>
        )
    }
}

export default withStyles(styles)(CustomMap);