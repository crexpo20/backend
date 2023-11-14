import React, { Component } from 'react';
import axios from 'axios';

class Habilitar extends Component {
  constructor() {
    super();
    this.state = {
      userData: {
        idusuario: null,
        username: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: null,
        contraseña: '',
        anfitrion: 0,
      },
    };
  }

  async actualizarUsuario(userData) {
    try {
      const idusuario = localStorage.getItem('userID'); // ID del usuario que deseas actualizar
      const response = await axios.put(`https://telossuite.amicornios.com/api/putusuario/${idusuario}`, userData);

      if (response.status === 200) {
        console.log('Usuario actualizado con éxito.');
      } else {
        console.error('Error al actualizar el usuario.');
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  }

  handleAceptar = () => {
    const { userData } = this.state;
    
    // Crear el objeto userUp con los cambios necesarios
    const userUp = {
      ...userData,
      anfitrion: 1, // Cambia el campo "anfitrion" a 1
    };
    
    // Actualiza el usuario en la API
    const idusuario = localStorage.getItem('userID'); // ID del usuario que deseas actualizar
    axios.put(`https://telossuite.amicornios.com/api/putusuario/${idusuario}`, userUp)
      .then((response) => {
        if (response.status === 200) {
          console.log('Usuario actualizado con éxito.');
          localStorage.setItem("anfitrion", userUp.anfitrion);
          window.location.reload();
        } else {
          console.error('Error al actualizar el usuario.');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el usuario:', error);
      });
  };
  

  componentDidMount() {
    const idusuario = localStorage.getItem('userID');

    axios.get(`https://telossuite.amicornios.com/api/getusuario/${idusuario}`)
      .then((response) => {
        this.setState({ userData: response.data });
      })
      .catch((error) => {
        console.error('Error al obtener datos de usuario:', error);
      });
  }

  render() {
    const { userData } = this.state;

    return (
      <div id='hab'>
        <p>Hola, {userData.nombre}</p>
        <p>En TelosSuite, además de buscar un inmueble de tu preferencia, también puedes publicar tu propio inmueble.</p>
        <p>Para comenzar a publicar, presiona "ACEPTAR". Recuerda que debes iniciar sesión con tu cuenta de usuario y cambiar a la vista de <b>Modo Anfitrión</b> para ir a tu propio espacio.</p>

        <button onClick={this.handleAceptar}>ACEPTAR</button>

      </div>
    );
  }
}

export default Habilitar;
