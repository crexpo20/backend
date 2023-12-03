// src/pages/PerfilHuesped.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Nuevo componente funcional que utiliza useParams
const PerfilHuespedFuncional = () => {
  const { id } = useParams(); // Obtenemos el parámetro de la URL
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [nombreUsuario1, setNombreUsuario1] = useState("");
  const [apellidoUsuario1, setApellidoUsuario1] = useState("");
  const [reseñas, setReseñas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const nombre = (idUsuario) => {
    const usuarioEncontrado = usuarios.find(usuario => usuario.idusuario === idUsuario);

    if (usuarioEncontrado) {
      return `${usuarioEncontrado.nombre} ${usuarioEncontrado.apellido}`;
    }

    return "Usuario no encontrado";
  };

  useEffect(() => {
    axios.get(`https://telossuite.amicornios.com/api/getusuario/${id}`)
      .then(response => {
        setNombreUsuario(response.data.nombre);
        setApellidoUsuario(response.data.apellido);
      })
      .catch(error => {
        console.error('Error al obtener datos del usuario:', error);
      });
      axios.get('https://telossuite.amicornios.com/api/getreseña')
      .then(response => {
        setReseñas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener reseñas del usuario:', error);
      });
      axios.get('https://telossuite.amicornios.com/api/getusuario')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos del usuario:', error);
      });
  }, [id]);
 


  return (
    <div>
      <h6>Perfil de {nombreUsuario} {apellidoUsuario}</h6>

     
      <div>
      {reseñas.map((reseña,index) => {
       if(reseña.idusuario === parseInt(id)){
      return(
      
         <div>
         
         <p>Anfitrión: {nombre(reseña.idanfitrion)}</p>
         <p>Comentario: {reseña.descripcion}</p>
         <p>Puntuación: {reseña.puntuacion}</p>
         <br></br>
         <br></br>
         <br></br>
       </div>
      )
     
       }
  
})}
      </div>
     
    </div>
  );
};


// Componente de clase que recibe los valores como props
class PerfilHuesped extends React.Component {
  render() {
    return <PerfilHuespedFuncional />;
  }
}

export default PerfilHuesped;
