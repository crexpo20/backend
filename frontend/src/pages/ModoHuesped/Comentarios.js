import React, { useState } from 'react';
import './Comentarios.css';

function Comentarios({ isOpen, onClose }) {
  const [comentario, setComentario] = useState('');
  const [rating, setRating] = useState({
    limpieza: 0,
    comunicacion: 0,
    exactitud: 0,
  });
  const [hoverAt, setHoverAt] = useState(null);

  const handleMouseEnter = (category, index) => {
    setHoverAt({ ...hoverAt, [category]: index + 1 });
  };

  const handleMouseLeave = () => {
    setHoverAt(null);
  };

  const handleClick = (category, index) => {
    setRating({ ...rating, [category]: index + 1 });
  };

  const handleSubmit = () => {
    console.log(comentario, rating);
    onClose(); // Cierra el modal
  };

  if (!isOpen) return null;

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Calificaciones</h2>
          <span className="close-button" onClick={onClose}>&times;</span> {/* Botón de cerrar con equis */}
        </div>
        <div className="modal-body">
          <div className="ratings-container">
            {['limpieza', 'comunicacion', 'exactitud'].map(category => (
              <div key={category} className="calificacion-categoria">
                <div className="calificacion-titulo">{category.charAt(0).toUpperCase() + category.slice(1)}</div> {/* Capitaliza la primera letra */}
                <div className="star-rating">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`star ${index < (hoverAt?.[category] || rating[category]) ? "selected" : ""}`}
                      onMouseEnter={() => handleMouseEnter(category, index)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(category, index)}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="comments-container">
            <h2>Comentarios</h2>
            <textarea 
              placeholder="Escribe tu comentario aquí..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
  <button className="accept-button" onClick={handleSubmit}>Aceptar</button>
</div>
      </div>
    </div>
  );
}


export default Comentarios;

