
import React, { useState } from 'react';
import '../CSS/ComentariosModal.css';


const ComentariosModal = ({ comentarios, showModal, toggleModal }) => {
  const [rating, setRating] = useState({
    limpieza: 0,
    comunicacion: 0,
    exactitud: 0
  });
  const [hoverAt, setHoverAt] = useState(null);

  const handleMouseEnter = (category, index) => {
    setHoverAt({ [category]: index + 1 });
  };

  const handleMouseLeave = () => {
    setHoverAt(null);
  };

  const handleClick = (category, index) => {
    setRating({ ...rating, [category]: index + 1 });
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={toggleModal}>&times;</span>
        <div className="calificaciones-container">
          <h2>Calificaciones</h2>
          {['limpieza', 'comunicacion', 'exactitud'].map(category => (
            <div key={category} className="calificacion-categoria">
              <div className="calificacion-titulo">{category}</div>
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
        <div className="comentarios-container">
          <h2>Comentarios</h2>
          {comentarios.length > 0 ? (
            comentarios.map((comentario, index) => (
              <div key={index} className="comentario-item">
                <p><strong>{comentario.nombre}:</strong> {comentario.descripcion}</p>
              </div>
            ))
          ) : (
            <p>Aún no hay comentarios para este inmueble.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComentariosModal;

