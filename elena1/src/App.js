import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import './maps/map.js';
import './maps/markers.js';
import Main from './views/Main'
import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';


function App() {
    return (
        // <div > {/*style={{width: "100%",height: "100%"}}>*/}
            <Map center={[51.505, -0.09]} zoom={13} zoomControl={false}>
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="topright" />
            </Map>
        // </div>
    );
}
const ZoomControlExample = () => (
    <Map center={[51.505, -0.09]} zoom={13} zoomControl={false}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
    </Map>
  )

export default ZoomControlExample;
