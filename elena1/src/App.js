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
      <head profile="http://gmpg.org/xfn/11">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    
          <script type='text/javascript' src='//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js'></script>
          <script type='text/javascript' src='http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js'></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      
          <link rel="stylesheet" type="text/css" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" ></link>
          <link rel="stylesheet" type="text/css" href="mystyle.css"></link>
          
        </head>
    
      <body>
          <h1>Elevation Navigation</h1>
          
          <p>Input your starting and ending locations, and answer the additional questions to get a route. </p>
          
          <div id="map" style={{height: 440, border: 1}}></div>
    
          <script type='text/javascript' src='src/maps/markers.js'></script>
          <script type='text/javascript' src='src/maps/map.js'></script>
          <script type='text/javascript' src='App.js'></script>

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
          
      </body>
   </div>
  );
}

export default App;
