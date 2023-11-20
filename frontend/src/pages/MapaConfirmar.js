import React from 'react';
import { GoogleMap, Circle as CircleGoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';

const Mapa = ({ lat, lng}) => {
    const [map, setMap] = React.useState(null)
    
    const onLoad = React.useCallback(function callback(map) {
        // Ajusta el nivel de zoom directamente con la posición central
        map.setZoom(17); 
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
      center={center}
      defaultZoom={1} // Puedes ajustar el nivel de zoom según tus necesidades
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Componente Marker que representa un marcador en el mapa. */}
      <Marker position={center} />
      

    </GoogleMap>) : null
    
};

export default Mapa;