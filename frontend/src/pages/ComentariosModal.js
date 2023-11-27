import React, { useState, useEffect } from 'react';
import '../CSS/ComentariosModal.css';

const ComentariosModal = ({ showModal, toggleModal, inmuebleId }) => {
  const [comentariosConNombres, setComentariosConNombres] = useState([]);

  useEffect(() => {
    if (showModal && inmuebleId) {
      fetch(`https://telossuite.amicornios.com/api/getcomentarios/${inmuebleId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(comentarios => {
          // Crear un array de promesas para obtener los nombres de los usuarios de los comentarios
          const promesasDeNombres = comentarios.map(comentario => {
            return fetch(`https://telossuite.amicornios.com/api/getusuario/${comentario.idusuario}`)
              .then(respuesta => respuesta.json())
              .then(usuario => {
                // Suponiendo que la respuesta de la API incluye un campo 'nombre'
                // y que el comentario ya tiene las calificaciones de limpieza, comunicacion, y exactitud
                return {
                  ...comentario,
                  nombreUsuario: usuario.nombre, // Agrega el nombre del usuario al objeto comentario
                  calificaciones: { // Suponiendo que estas propiedades vienen en cada comentario
                    limpieza: comentario.limpieza,
                    comunicacion: comentario.comunicacion,
                    exactitud: comentario.exactitud,
                  },
                };
              });
          });
          return Promise.all(promesasDeNombres); // Resolver todas las promesas
        })
        .then(comentariosConCalificaciones => {
          setComentariosConNombres(comentariosConCalificaciones); // Actualizar el estado con los comentarios, nombres de usuarios y calificaciones
        })
        .catch(error => {
          console.error('Error al obtener los comentarios o los usuarios:', error);
        });
    }
  }, [showModal]);
 
  useEffect(() => {
    if (showModal) {
      fetch('https://telossuite.amicornios.com/api/getcomentario/')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(comentarios => {
          // Crear un array de promesas para obtener los nombres de los usuarios de los comentarios
          const promesasDeNombres = comentarios.map(comentario => {
            return fetch(`https://telossuite.amicornios.com/api/getusuario/${comentario.idusuario}`)
              .then(respuesta => respuesta.json())
              .then(usuario => {
                // Suponiendo que la respuesta de la API incluye un campo 'nombre'
                // y que el comentario ya tiene las calificaciones de limpieza, comunicacion, y exactitud
                return {
                  ...comentario,
                  nombreUsuario: usuario.nombre, // Agrega el nombre del usuario al objeto comentario
                  calificaciones: { // Suponiendo que estas propiedades vienen en cada comentario
                    limpieza: comentario.limpieza,
                    comunicacion: comentario.comunicacion,
                    exactitud: comentario.exactitud,
                  },
                };
              });
          });
          return Promise.all(promesasDeNombres); // Resolver todas las promesas
        })
        .then(comentariosConCalificaciones => {
          setComentariosConNombres(comentariosConCalificaciones); // Actualizar el estado con los comentarios, nombres de usuarios y calificaciones
        })
        .catch(error => {
          console.error('Error al obtener los comentarios o los usuarios:', error);
        });
    }
  }, [showModal]);
  
  
 

  if (!showModal) {
    return null;
  }
  

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={toggleModal}>&times;</span>
        <div className="comentarios-container">
          <h2>Comentarios</h2>
          {comentariosConNombres.length > 0 ? (
            comentariosConNombres.map((comentario, index) => (
              <div key={index} className="comentario-item">
                <p><strong>{comentario.nombreUsuario}:</strong> {comentario.descripcion}</p>
                <div>
                  {['limpieza', 'comunicacion', 'exactitud'].map(categoria => (
                    <div key={categoria} className="calificacion-categoria">
                      <div className="categoria-titulo">{categoria}</div>
                      <div className="star-rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`star ${i < comentario.calificaciones[categoria] ? 'selected' : ''}`}>
                            &#9733;
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
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

