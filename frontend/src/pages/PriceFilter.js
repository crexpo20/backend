// Importando el icono de cerrar de la librería React Icons y los hooks necesarios de React
import { AiOutlineCloseCircle } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
// Importando el archivo de estilos CSS
import '../CSS/PriceFilters.css';


function PriceFilter(props) {
  // Estados para manejar los precios mínimo y máximo, y para controlar la visibilidad del filtro
  const [minPrice, setMinPrice] = useState(localStorage.getItem('precioMinimo') || '');
  const [maxPrice, setMaxPrice] = useState(localStorage.getItem('precioMaximo') || '');
  const [showFilter, setShowFilter] = useState(true);
  // Estados para manejar las selecciones de habitaciones, camas y baños
  const [selectedRoom, setSelectedRoom] = useState(localStorage.getItem('habitaciones') || 'Cualquiera');
  const [selectedBed, setSelectedBed] = useState(localStorage.getItem('camas') || 'Cualquiera');
  const [selectedBath, setSelectedBath] = useState(localStorage.getItem('baños') || 'Cualquiera');
  const [rating, setRating] = useState(0);
  const [hoverAt, setHoverAt] = useState(null);
  // Agrega un nuevo estado para los servicios con un objeto que contenga cada servicio
  const [services, setServices] = useState({
    wifi: 0,
    parqueo: 0,
    cocina: 0,
    refrigerador: 0,
   lavadora: 0,
    piscina: 0,
  });
  //Estado para privado o compartido
  const [tipoInmueble, setTipoInmueble] = useState({
    privado: 0,
    compartido: 0
  });
  

  useEffect(() => {
    resetFilterValues();
  }, []);
  const resetFilterValues = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedRoom('Cualquiera');
    setSelectedBed('Cualquiera');
    setSelectedBath('Cualquiera');
    // ... restablece otros estados si es necesario ...
  };

  // Funciones para manejar los cambios en los inputs de precios mínimo y máximo
  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
    localStorage.setItem('precioMinimo', value);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    localStorage.setItem('precioMaximo', value);
  };

  // Función para cerrar el filtro de precios
  const handleCloseClick = () => {
    setShowFilter(false);
  };

  // Función para manejar la submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('precioMinimo', minPrice);
    localStorage.setItem('precioMaximo', maxPrice);
    
    // Dispara un evento personalizado para notificar que los precios han cambiado
    window.dispatchEvent(new CustomEvent('priceFilterChanged', {
      detail: {
        minPrice: minPrice,
        maxPrice: maxPrice,
        rooms: selectedRoom,
        beds: selectedBed,
        baths: selectedBath
      }
    }));
  
    setShowFilter(false); // Suponiendo que esto cierra tu modal de filtro
  };
  
   // Funciones para manejar las selecciones de habitaciones, camas y baños y guardar en localStorage
   const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    localStorage.setItem('habitaciones', room);
  };

  const handleBedSelection = (bed) => {
    setSelectedBed(bed);
    localStorage.setItem('camas', bed);
  };

  const handleBathSelection = (bath) => {
    setSelectedBath(bath);
    localStorage.setItem('baños', bath);
  }; 

 // Función para manejar los cambios en las casillas de verificación de los servicios
 const handleServiceChange = (service) => {
    // Actualiza el estado del servicio conmutando entre 0 y 1
    setServices((prevServices) => ({
      ...prevServices,
      [service]: prevServices[service] === 0 ? 1 : 0,
    }));
  };

  const handleTipoInmuebleChange = (tipo) => {
    // Actualiza el estado de tipoInmueble dependiendo del tipo seleccionado
    setTipoInmueble({
      privado: tipo === 'privado' ? 1 : 0,
      compartido: tipo === 'compartido' ? 1 : 0,
    });
  };
  

;
  // Renderizado condicional: Si showFilter es true, muestra el filtro de precios
  return (
    showFilter && (
      <div className="price-filter-container">
        <div className="price-filter-popup" style={{ overflowY: 'auto', maxHeight: '500px' }}>
          <div className="filter-header">
          <div className="title-container">
          <span className="filter-title">Filtro</span>
        <button className="close-button" onClick={handleCloseClick}>
          <AiOutlineCloseCircle />
        </button>
            </div>
           
          </div>
         
          <h2>Rango de Precios</h2>
          <div className="price-inputs">
            <div className="input-group">
              <label htmlFor="minPrice">Mínimo:</label>
              <input
                type="number"
                id="minPrice"
                value={minPrice}
                onChange={handleMinPriceChange}
                placeholder="Precio mínimo"
              />
            </div>
            <div className="input-group">
              <label htmlFor="maxPrice">Máximo:</label>
              <input
                type="number"
                id="maxPrice"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                placeholder="Precio máximo"
              />
            </div>
          </div>
          
          <h2>Habitaciones y camas</h2>
          <label>Habitaciones</label>
          <div className="selector-group">
            {['Cualquiera', '1', '2', '3', '4', '5', '6', '7', '8+'].map((room) => (
              <button
                key={room}
                className={`selector-button ${selectedRoom === room ? 'selected' : ''}`}
                onClick={() => handleRoomSelection(room)}
              >
                {room}
              </button>
            ))}
          </div>
          
          <label>Camas</label>
          <div className="selector-group">
            {['Cualquiera', '1', '2', '3', '4', '5', '6', '7', '8+'].map((bed) => (
              <button
                key={bed}
                className={`selector-button ${selectedBed === bed ? 'selected' : ''}`}
                onClick={() => handleBedSelection(bed)}
              >
                {bed}
              </button>
            ))}
          </div>
  
          <label>Baños</label>
          <div className="selector-group">
            {['Cualquiera', '1', '2', '3', '4', '5', '6', '7', '8+'].map((bath) => (
              <button
                key={bath}
                className={`selector-button ${selectedBath === bath ? 'selected' : ''}`}
                onClick={() => handleBathSelection(bath)}
              >
                {bath}
              </button>
            ))}
          </div>
          
          <h2>Servicios</h2>
          <div className="service-inputs">
            {Object.keys(services).map((serviceKey) => (
              <label key={serviceKey} className="service-label">
                <input
                  type="checkbox"
                  checked={services[serviceKey] === 1}
                  onChange={() => handleServiceChange(serviceKey)}
                />
                {serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1)}
              </label>
            ))}
          </div>
              
          <h2>Tipo de inmueble</h2>
        <div className="tipo-inmueble-inputs">
          <label className="tipo-inmueble-label">
            <input
              type="checkbox"
              checked={tipoInmueble.privado === 1}
              onChange={() => handleTipoInmuebleChange('privado')}
            />
            Privado
          </label>
          <label className="tipo-inmueble-label">
            <input
              type="checkbox"
              checked={tipoInmueble.compartido === 1}
              onChange={() => handleTipoInmuebleChange('compartido')}
            />
            Compartido
          </label>
        </div>

        <div className="rating-container">
        <h2 className="calificacion-title">Calificación:</h2>
        {[...Array(5)].map((n, i) => (
          <span 
            key={i}
            className={`star ${i < (hoverAt || rating) ? "selected" : ""}`}
            onClick={() => setRating(i + 1)}
            onMouseEnter={() => setHoverAt(i + 1)}
            onMouseLeave={() => setHoverAt(null)}
          >
            &#9733;
          </span>
        ))}
      </div>


        <div className="accept-button-container">
          <form onSubmit={handleSubmit}>
            <button type="submit" className="submit-button">Aceptar</button>
          </form>
        </div>
      </div>
    </div>
  )
);
  


   }
// Exportando el componente para poder usarlo en otros archivos
export default PriceFilter;