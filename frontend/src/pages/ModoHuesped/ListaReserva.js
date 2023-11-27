import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../CSS/cards.css';
import axios from "axios";
import './cards.css'
import { useNavigate } from 'react-router-dom';
import Comentarios from './Comentarios';

function ListaReservaWithNavigate(props) {
  const navigate = useNavigate();
  
  return <ListaReserva {...props} navigate={navigate} />;
}
class ListaReserva extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedReservaId: null,
     idusuario : localStorage.getItem("userID"),
      inmueble: [],
      reservasPasadas: [],
      reservasEnCurso: [],
      reservasProximas: [],
      inmueblevista:[],
    };
    this.getProductos = this.getProductos.bind(this);
  
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }


  handleReservaClick = (idInmueble) => {
    this.props.navigate(`/vistaInm/${idInmueble}`);
  };

  handleCalificarClick = (reservaId, idInmueble, event) => {
    event.stopPropagation();
    this.setState({ isModalOpen: true, selectedReservaId: reservaId, idInmueble: idInmueble });
  }
  
  closeModal() {
    // Cierra el modal
    this.setState({ isModalOpen: false });
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
              <h2>Finalizadas ({this.state.reservasPasadas.length})</h2>
              {this.state.reservasPasadas.map(reserva => (
          <div className='cont' key={reserva.idreserva}>
            <div className='reserva' onClick={() => this.handleReservaClick(reserva.idinmueble)}>
              <p>ID Inmueble: {reserva.idinmueble}, Fecha Fin: {reserva.fechafin}</p>
              {/* Asegúrate de pasar el evento al método handleCalificarClick */}

              
              <span 
  onClick={(event) => this.handleCalificarClick(reserva.idreserva, reserva.idinmueble, event)}
  className="calificar-text"
>
  Calificar
</span>

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

          {this.state.isModalOpen && (
          <Comentarios
            isOpen={this.state.isModalOpen}
            onClose={this.closeModal}
            idInmueble={this.state.idInmueble} 
            idUsuario={this.state.idusuario} 
            reservaId={this.state.selectedReservaId}
          />
        )}
        </body>
      </>
    );
  }
}
export default ListaReservaWithNavigate;

