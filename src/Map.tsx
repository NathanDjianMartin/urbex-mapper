import './App.css'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React from 'react';

function Map() {

  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      }));
    }
  }, [ref, map]);

  return (
    <div id="map" ref={ref} />
  )
}

export default Map
