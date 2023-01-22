import React from 'react'
import './App.css'
import Map from './Map'
import { Marker } from './Marker'

function App() {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([])
  const [zoom, setZoom] = React.useState(16)
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  })

  const onClick = (event: google.maps.MapMouseEvent) => {
    setClicks([...clicks, event.latLng!]) // TODO: handle exclamation mark gracefully
  }

  const onIdle = (map: google.maps.Map) => {
    setZoom(map.getZoom()!) // TODO: handle exclamation mark gracefully
    setCenter(map.getCenter()!.toJSON()) // TODO: handle exclamation mark gracefully
  }

  return (
    <div className="App" style={{height: "1000px", width: "1000px", background: "red"}}>
      <h1>Urbex Mapper</h1>
      <Map style={{"margin": "10px"}}  center={center} zoom={zoom} onClick={onClick} onIdle={onIdle}>
        {clicks.map((latLng, index) => (<Marker key={index} position={latLng} />))}
      </Map>
    </div>
  )
}

export default App
