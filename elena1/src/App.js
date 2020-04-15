import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import './maps/map.js';
import './maps/markers.js';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";


function App() {
    return (
        <div>
            <h1>Elevation Navigation</h1>

            <p>Input your starting and ending locations, and answer the additional questions to get a route. </p>

            <div id="map" style={{ height: 440, border: 1 }}></div>

            <form class="form-inline" action="/action_page.php">
                <div class="form-group">
                    <label for="start">Starting Location:</label>
                    <input type="start" class="form-control" id="start"></input>
                </div>
                <div class="form-group">
                    <label for="end">Ending Location:</label>
                    <input type="end" class="form-control" id="end"></input>
                </div>
                <div class="slidecontainer">
                    <label for="elevation">How important are changes in elevation?</label>
                    <input type="range" min="1" max="100" value="50" class="slider" id="elevation"></input>
                    <div id="demo"></div>
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
    );
}

export default App;
