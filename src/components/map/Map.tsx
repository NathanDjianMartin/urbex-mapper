import React from 'react';
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from 'fast-equals';

interface MapProps extends google.maps.MapOptions {
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  ...options
}) => {

  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options)
    }
  }, [map, options])

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // clears existing listeners and replace them when a handler is updated
  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) => {
        google.maps.event.clearListeners(map, eventName)
      });

      if (onClick) {
        map.addListener("click", onClick)
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <div>
      <div ref={ref} style={{height: "95vh"}} />
      {
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // set map prop on child component
            // @ts-ignore
            return React.cloneElement(child, { map }) // TODO: use renderItem prop instead https://beta.reactjs.org/reference/react/cloneElement
          }
        })
      }
    </div>
  )
}

export default Map

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
