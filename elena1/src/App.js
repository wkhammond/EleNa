import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import './maps/map.js';
import './maps/markers.js';
import QueryForm from './components/Query'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


function App() {
    return (
        <div>
            <h1>Elevation Navigation</h1>

            <p>Input your starting and ending locations, and answer the additional questions to get a route. </p>

            <QueryForm/>
        </div>
    );
}

export default App;
