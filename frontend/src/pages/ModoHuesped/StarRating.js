import React, { useState } from 'react';
import './StarRating.css'; // Asume que tienes un archivo CSS para estilos

const StarRating = ({ category, onChange }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      <h2>{category}</h2>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onChange(ratingValue)}
            />
            <span
              className={`star ${ratingValue <= hover ? "hover" : ""}`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            >☆</span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
