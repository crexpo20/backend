import React, { useState } from 'react';
import '../App.css';

function ModalAnf(props) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showModoAnf, setShowModoAnf] = useState(true);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleFilterClick = () => {
    console.log('Precio mínimo:', minPrice);
    console.log('Precio máximo:', maxPrice);
  };

  const handleCloseClick = () => {
    setShowModoAnf(false);
  };

  return (
    showModoAnf && (
      <div className="price-filter-container">
        <div className="price-filter-popup">
          <button className="close-button" onClick={handleCloseClick}>
            X
          </button>
          <h2 className="jeju-font">Rango de Precios</h2>
       
          </div>
      </div>
    )
  );
}

export default ModalAnf;
