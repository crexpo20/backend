import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/reservaUsuario.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import '../CSS/slick.css'


class PerfilHuesped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreUsuario: "",
      apellidoUsuario: "", 
    };
  }
  

  componentDidMount() {
    const idusuario = localStorage.getItem('idusuario');
    console.log('IDUsuario:', idusuario);
    axios.get(`https://telossuite.amicornios.com/api/getusuario/${idusuario}`)
      .then(response => {
        this.setState({ nombreUsuario: response.data.nombre, apellidoUsuario: response.data.apellido, });
      })
      .catch(error => {
        console.error('Error al obtener datos del usuario:', error);
      });
  }
 

  render() {
    const {  nombreUsuario, apellidoUsuario } = this.state;
   
    return (
      <div>
        <h6> Perfil de {nombreUsuario} {apellidoUsuario}</h6>
      </div>
    );
  }
}

export default PerfilHuesped;
