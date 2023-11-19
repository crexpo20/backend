import React, { useContext } from 'react';
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';

//Declaramos el componente de la funcion mapa que recibe la latitud y longitud de la ubicación
const MapaRegistro = ({ lat, lng, updateMarker}) => {
    //inicializamos los estados de map y marker
    const [map, setMap] = React.useState(null)
    const [markerPosition, setMarkerPosition] = React.useState(null);

    //Maneja el marker cuando hacemos click en el mapa
    
    const onMapClick = (e) => {
        
           const markerData = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
           }
           
           setMarkerPosition(markerData);
            updateMarker(markerData);
          
      };
    
      //El mapa se carga
    const onLoad = React.useCallback(function callback(map) {
        //Controlamos el zoom del mapa
        map.setZoom(12); 
        setMap(map);
      }, []);
    
    const onUnmount = React.useCallback(function callback() {
        setMap(null)
    }, [])

    //Hook useJsApiLoader para cargar la API de Google Maps
    const { isLoaded } = useJsApiLoader({
        id:"297878562058-b1kq496r98fnk5ctcgtunjmgt5erbp6o.apps.googleusercontent.com",
        googleMapsApiKey: 'AIzaSyDNevJ_JORRAmI5u-wPZCtznZzHgSbuqrw',
    });

    //Imprime si la API de Google Maps está cargada
    console.log(isLoaded)
    //Definición de las coordenadas centrales del mapa
    const center = markerPosition
    ? { lat: markerPosition.lat, lng: markerPosition.lng }
    : { lat: parseFloat(lat), lng: parseFloat(lng) };

    return isLoaded ? (
      <GoogleMap
        mapContainerStyle={{ width: '700px', height: '350px' }}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
      >
        {markerPosition && (
          <Marker position={{ lat: markerPosition.lat, lng: markerPosition.lng }} />
        )}
      </GoogleMap>
    ) : null; // Devuelve null si la API de Google Maps no está cargada.
};

export default MapaRegistro;
