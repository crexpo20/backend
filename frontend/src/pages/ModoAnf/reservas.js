import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../CSS/cards.css';
import Modal from 'react-modal';
import StarRating from './StarRating';
import Comentarios from './Comentarios';
import axios from "axios";
import './cards.css'
class Reservas extends Component {
  constructor(props) {
    super(props);
    this.state = {
     idusuario : localStorage.getItem("userID"),
      inmueble: [],
      reservasPasadas: [],
      reservasEnCurso: [],
      reservasProximas: [],
      inmueblevista:[],
      showModal: false,
      descripcion: '',
      puntuacion: 1, // Valor inicial
      reservaActual: null,
    };
    this.getProductos = this.getProductos.bind(this);
  }

  componentDidMount() {
    this.getProductos();
  }
  handleCalificar(reserva) {
    this.setState({ showModal: true, reservaActual: reserva });
  }
  handleCloseModal = () => {
    this.setState({
      showModal: false,
      descripcion: '', // Restaura los valores iniciales
      puntuacion: 1,
      reservaActual: null,
    });
  }

  handleCalificarClick = (reservaId, idInmueble, event) => {
    event.stopPropagation();
    this.setState({ isModalOpen: true, selectedReservaId: reservaId, idInmueble: idInmueble });
  }
  
  closeModal = () => {
    this.setState({ isModalOpen: false });
  }
  


  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  getProductos = async () => {
    try {
      const response = await axios.get(`https://telossuite.amicornios.com/api/getreanfitrion/${this.state.idusuario}`);
     
      this.setState({ inmueble: response.data });
      this.organizarReservas();
    } catch (error) {
      console.error(error);
    }
  }

  organizarReservas() {
    const fechaHoy = new Date();
    
    const reservasPasadas = this.state.inmueble.filter(reserva => {
      const fechaFinReserva = new Date(reserva.fechafin);
      return fechaFinReserva < fechaHoy;
    });

    const reservasEnCurso = this.state.inmueble.filter(reserva => {
      const fechaFinReserva = new Date(reserva.fechafin);
      const fechaInicioReserva = new Date(reserva.fechaini);
      return ( fechaHoy <= fechaFinReserva   && fechaHoy >= fechaInicioReserva);
    });

    const reservasProximas = this.state.inmueble.filter(reserva => {
      const fechaInicioReserva = new Date(reserva.fechaini);
      return fechaInicioReserva > fechaHoy;
    });

    this.setState({
      reservasPasadas,
      reservasEnCurso,
      reservasProximas,
    });
  }

  render() {
    return (
      <>
        <body>
          <div className="containerts">
            <div className="box">
              <h2>Pasadas ({this.state.reservasPasadas.length})</h2>
              {this.state.reservasPasadas.map(reserva => (
              <div className='cont'>
              <div className='reserva' key={reserva.idreserva}>
              <p>ID {reserva.idreserva}</p>
                  <p>ID Inmueble: {reserva.idinmueble}</p><p> Fecha Fin: {reserva.fechafin}</p>
                  {this.renderCalificarButton(reserva)}
                </div>
                </div>
              ))}
            </div>
            <div className="box">
            <h2>En curso ({this.state.reservasEnCurso.length})</h2>
                 
              {this.state.reservasEnCurso.map(reserva => (
                <div className='cont'>
                <div className='reserva' key={reserva.idreserva}>
                     <p>ID Inmueble: {reserva.idinmueble}</p><p>Fecha Fin: {reserva.fechafin}</p>
                  
                </div>
                </div>
              ))}
            </div>
            <div className="box">
              <h2>Próximas ({this.state.reservasProximas.length})</h2>
              {this.state.reservasProximas.map(reserva => (
                  <div className='cont'>
                <div className='reserva' key={reserva.idreserva}>
                  <p>ID Inmueble: {reserva.idinmueble}</p><p>Fecha Inicio: {reserva.fechaini}</p>
                </div>
                 </div>
              ))}
            </div>
          </div>
        </body>
      </>
    );
  }
  renderCalificarButton(reserva) {
    const fechaFinReserva = new Date(reserva.fechafin);
    const fechaHoy = new Date();
    const diasDiferencia = Math.floor((fechaHoy - fechaFinReserva) / (1000 * 60 * 60 * 24)) + 1;

    if (diasDiferencia <= 8 && diasDiferencia >= 0) {
      const diasRestantes = 8 - diasDiferencia;
      return (
        <div>
          <p>Días restantes para calificar: {diasRestantes}</p>
          <span 
  onClick={(event) => this.handleCalificarClick(reserva.idreserva, reserva.idusuario, event)}
  className="calificar-text"
>
  Calificar
</span>
       
        </div>
      );
    } else {
      return <p></p>;
    }
  }
  // ... (tu código existente)
}


  


export default Reservas;
