// StarRating.js
import React, { useState } from 'react';

const StarRating = ({ onChange, value }) => {
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
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
              className="star"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            >
              {ratingValue <= (hover || value) ? '★' : '☆'}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
