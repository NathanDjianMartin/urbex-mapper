import React from 'react'
import Map from './map/Map'
import Marker from './map/Marker'

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
    <div>
      <Map center={center} zoom={zoom} onClick={onClick} onIdle={onIdle}>
        {clicks.map((latLng, index) => (<Marker key={index} position={latLng} />))}
      </Map>
    </div>
  )
}

export default App
