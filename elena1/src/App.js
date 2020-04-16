import React from 'react';
import '../node_modules/leaflet/dist/leaflet.css';
import './App.css';
import logo from './logo.svg';
import Main from './views/Main'
import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';


function App() {
    return (
        <Main/>
    );
}

export default App;
