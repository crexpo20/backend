import { AiOutlineCloseCircle } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/PriceFilters.css';



function PriceFilter(props) {
  const [minPrice, setMinPrice] = useState(localStorage.getItem('precioMinimo') || '');
  const [maxPrice, setMaxPrice] = useState(localStorage.getItem('precioMaximo') || '');
  const [selectedRoom, setSelectedRoom] = useState(localStorage.getItem('habitaciones') || 'Cualquiera');
  const [selectedBed, setSelectedBed] = useState(localStorage.getItem('camas') || 'Cualquiera');
  const [selectedBath, setSelectedBath] = useState(localStorage.getItem('baños') || 'Cualquiera');
  const [showFilter, setShowFilter] = useState(true);
  const [services, setServices] = useState({
    wifi: parseInt(localStorage.getItem('wifi') || 0),
    parqueo: parseInt(localStorage.getItem('parqueo') || 0),
    cocina: parseInt(localStorage.getItem('cocina') || 0),
    refrigerador: parseInt(localStorage.getItem('refrigerador') || 0),
    lavadora: parseInt(localStorage.getItem('lavadora') || 0),
    piscina: parseInt(localStorage.getItem('piscina') || 0),
    
  });
  const [rating, setRating] = useState(parseInt(localStorage.getItem('rating') || 0));
  const [hoverAt, setHoverAt] = useState(null);
  const navigate = useNavigate();
  const [tipoInmueble, setTipoInmueble] = useState({
    privado: localStorage.getItem('privado') === '1',
    compartido: localStorage.getItem('compartido') === '1',
  });

 

 // ...

const handleMinPriceChange = (event) => {
  const newMinPrice = event.target.value;
  setMinPrice(newMinPrice); 
  localStorage.setItem('precioMinimo', newMinPrice);
};

const handleMaxPriceChange = (event) => {
  const newMaxPrice = event.target.value;
  setMaxPrice(newMaxPrice); 
  localStorage.setItem('precioMaximo', newMaxPrice);
};

const handleSelectionChange = (key, value) => {
  localStorage.setItem(key, value);

  if (key === 'habitaciones') {
    setSelectedRoom(value);
  } else if (key === 'camas') {
    setSelectedBed(value);
  } else if (key === 'baños') {
    setSelectedBath(value);
  }
};

const handleServiceChange = (serviceKey, newValue) => {
  const newServiceValue = newValue ? '1' : '0';
  localStorage.setItem(serviceKey, newServiceValue);
  setServices(prevServices => ({
    ...prevServices,
    [serviceKey]: parseInt(newServiceValue),
  }));
};

const handleTipoInmuebleChange = (tipo) => {
  // Actualiza el estado y el localStorage
  setTipoInmueble(prevState => {
    const newValue = !prevState[tipo];
    localStorage.setItem(tipo, newValue ? '1' : '0');
    return { ...prevState, [tipo]: newValue };
  });
};

// ...


  const handleCloseClick = () => {
    setShowFilter(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Asegurarse de que los filtros no seleccionados se establezcan en "Cualquiera"
    localStorage.setItem('habitaciones', selectedRoom || 'Cualquiera');
    localStorage.setItem('camas', selectedBed || 'Cualquiera');
    localStorage.setItem('baños', selectedBath || 'Cualquiera');
    // ... y así para los demás filtros
    if (window.location.pathname === '/busqueda') {
      window.location.href = '/busqueda';
    } else {
      navigate(`/busqueda`);
    }
    setShowFilter(false);
  };
  
  
  useEffect(() => {
    const handleStorageChange = () => {
      // Actualizar los estados basados en los valores actuales de localStorage.
      setMinPrice(localStorage.getItem('precioMinimo') || '');
      setMaxPrice(localStorage.getItem('precioMaximo') || '');
      setSelectedRoom(localStorage.getItem('habitaciones') || 'Cualquiera');
      setSelectedBed(localStorage.getItem('camas') || 'Cualquiera');
      setSelectedBath(localStorage.getItem('baños') || 'Cualquiera');
      // ... y así sucesivamente para los demás estados que dependan de localStorage.
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpiar el listener cuando el componente se desmonte.
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  
  // ... el resto de tu componente ...
 
  useEffect(() => {
    // Establecer valores por defecto en localStorage si no existen
    if (!localStorage.getItem('precioMinimo')) {
      localStorage.setItem('precioMinimo', '');
    }
    if (!localStorage.getItem('precioMaximo')) {
      localStorage.setItem('precioMaximo', '');
    }
    if (!localStorage.getItem('habitaciones')) {
      localStorage.setItem('habitaciones', 'Cualquiera');
    }
    // ... y así para los demás filtros
  
    // Actualizar los estados basados en los valores actuales de localStorage.
    // Esta parte ya está en tu código
    // ...
  
  }, []);
  

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
                id="precioMinimo"
                value={minPrice} 
                onChange={handleMinPriceChange}
                 placeholder="Precio mínimo"
                  />
            </div>

            <div className="input-group">
              <label htmlFor="maxPrice">Máximo:</label>
              <input
               type="number"
              id="precioMaximo"
              value={maxPrice} 
             onChange={handleMaxPriceChange}
             placeholder="Precio máximo"
            />
            </div>
          </div>
          
          <h2>Habitaciones y camas</h2>
          <label>Habitaciones</label>
          <div className="selector-group">
            {['Cualquiera', '1', '2', '3', '4', '5', '6', '7', '8'].map((room) => (
                 <button
                 key={room}
                 className={`selector-button ${selectedRoom === room ? 'selected' : ''}`}
                 onClick={() => handleSelectionChange('habitaciones', room)}
               >
                 {room}
               </button>
            ))}
          </div>
          
          <label>Camas</label>
          <div className="selector-group">
            {['Cualquiera', '1', '2', '3', '4', '5', '6', '7', '8'].map((bed) => (
              <button
                key={bed}
                className={`selector-button ${selectedBed === bed ? 'selected' : ''}`}
                onClick={() => handleSelectionChange('camas', bed)}
              >
                {bed}
              </button>
            ))}
          </div>
  
          <label>Baños</label>
          <div className="selector-group">
            {['Cualquiera', '1', '2', '3', '4', '5', '6', '7', '8'].map((bath) => (
              <button
                key={bath}
                className={`selector-button ${selectedBath === bath ? 'selected' : ''}`}
                onClick={() => handleSelectionChange('baños', bath)}
              >
                {bath}
              </button>
            ))}
          </div>
          
          <h2>Servicios</h2>
        <div className="service-inputs">
             {Object.keys(services).map((serviceKey) => {
    // Suponiendo que services[serviceKey] es 1 si está seleccionado, 0 si no lo está
             const isChecked = localStorage.getItem(serviceKey) === '1';
            return (
      <label key={serviceKey} className="service-label">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleServiceChange(serviceKey, !isChecked)}
        />
        {serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1)}
      </label>
    );
  })}
</div>
              
<h2>Tipo de inmueble</h2>
<div className="tipo-inmueble-inputs">
  <label className="tipo-inmueble-label">
    <input
      type="checkbox"
        checked={tipoInmueble.privado}
        onChange={() => handleTipoInmuebleChange('privado')}
      />
    Privado
  </label>
  <label className="tipo-inmueble-label">
    <input
      type="checkbox"
      checked={localStorage.getItem('compartido') === '1'} // Comprueba si el tipo de inmueble compartido está seleccionado
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