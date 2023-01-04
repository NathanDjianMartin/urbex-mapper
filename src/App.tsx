import './App.css'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React from 'react';
import Map from './Map'

function App() {
  return (
    <div className="App">
      <h1>Urbex Mapper</h1>
      <Map />
    </div>
  )
}

export default App
