import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../CSS/cards.css';
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
    };
    this.getProductos = this.getProductos.bind(this);
  }

  componentDidMount() {
    this.getProductos();
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
                  <p>ID Inmueble: {reserva.idinmueble}, Fecha Fin: {reserva.fechafin}</p>
                </div>
                </div>
              ))}
            </div>
            <div className="box">
            <h2>En curso ({this.state.reservasEnCurso.length})</h2>
                 
              {this.state.reservasEnCurso.map(reserva => (
                <div className='cont'>
                <div className='reserva' key={reserva.idreserva}>
                     <p>ID Inmueble: {reserva.idinmueble}, Fecha Fin: {reserva.fechafin}</p>
                </div>
                </div>
              ))}
            </div>
            <div className="box">
              <h2>Próximas ({this.state.reservasProximas.length})</h2>
              {this.state.reservasProximas.map(reserva => (
                  <div className='cont'>
                <div className='reserva' key={reserva.idreserva}>
                  <p>ID Inmueble: {reserva.idinmueble}, Fecha Inicio: {reserva.fechaini}</p>
                </div>
                 </div>
              ))}
            </div>
          </div>
        </body>
      </>
    );
  }
}

export default Reservas;

