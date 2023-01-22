import React from 'react'
import Map from './map/Map'

function App() {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([])
  const [zoom, setZoom] = React.useState(16)
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  })

  const onClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setClicks([...clicks, event.latLng])
    }
  }

  const onIdle = (map: google.maps.Map) => {
    const mapZoom = map.getZoom()
    if (mapZoom) {
      setZoom(mapZoom) 
    }
    const mapCenter = map.getCenter()
    if (mapCenter) {
      setCenter(mapCenter.toJSON())
    }
  }

  return (
    <div>
      <Map center={center} zoom={zoom} onClick={onClick} onIdle={onIdle} />
    </div>
  )
}

export default App
