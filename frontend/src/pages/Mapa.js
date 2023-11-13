import React from 'react';
import { GoogleMap, Circle as CircleGoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';

const Mapa = ({ lat, lng}) => {
    console.log(lat)
    console.log(lng)
    const [map, setMap] = React.useState(null)
    
    const onLoad = React.useCallback(function callback(map) {
        // Ajusta el nivel de zoom directamente con la posición central
        map.setZoom(15); 
        setMap(map);
      }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  const { isLoaded } = useJsApiLoader({
    id:"297878562058-b1kq496r98fnk5ctcgtunjmgt5erbp6o.apps.googleusercontent.com",
    googleMapsApiKey: 'AIzaSyDNevJ_JORRAmI5u-wPZCtznZzHgSbuqrw',
  });
   console.log(isLoaded)
  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };
  const containerStyle = {
    width: '100%',
    height: '150%',
  };

  return  isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{lat: -17.3852993, lng: -66.2010302}}
      defaultZoom={1} // Puedes ajustar el nivel de zoom según tus necesidades
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Componente CircleGoogleMap que representa un círculo en el mapa. */}
      <CircleGoogleMap
        center={center}
        radius={600}
        options={{
            fillColor: '#0088FF',
            fillOpacity: 0.35,
            strokeColor: '#0088FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            clickable: false,
        }}
        />

    </GoogleMap>) : null
};

export default Mapa;