import React, { useState } from 'react';
import './Comentarios.css';
import axios from 'axios';


function Comentarios({ isOpen, onClose, idInmueble, idUsuario, reservaId }) {
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

  const handleSubmit = async () => {
    // Calculate the average rating
    const promedio = Math.round((rating.limpieza + rating.exactitud + rating.comunicacion) / 3);
  
    const comentarioData = {
      idinmueble: idInmueble,
      idusuario: idUsuario,
      descripcion: comentario,
      limpieza: rating.limpieza,
      exactitud: rating.exactitud,
      comunicacion: rating.comunicacion,
      puntuacion: promedio,
    };

    // Log the data to be sent
  console.log('Data to be sent:', comentarioData);

  try {
    const response = await axios.post('/api/postcomentario', comentarioData);
    console.log('Comment successfully sent:', response.data);
  } catch (error) {
    // Log detailed error information
    console.error('Error sending the comment:', error.response ? error.response.data : error);
  }

  onClose(); // Close the modal
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

