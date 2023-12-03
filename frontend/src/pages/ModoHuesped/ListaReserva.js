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
    console.log(idInmueble)
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
      const response = await axios.get(`https://telossuite.amicornios.com/api/getreusuario/${this.state.idusuario}`);
     
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
      const estado = reserva.estado;
      return fechaFinReserva < fechaHoy && estado === "aceptado";
    });

    const reservasEnCurso = this.state.inmueble.filter(reserva => {
      const fechaFinReserva = new Date(reserva.fechafin);
      const fechaInicioReserva = new Date(reserva.fechaini);
      const estado = reserva.estado;
      return ( fechaHoy <= fechaFinReserva   && fechaHoy >= fechaInicioReserva && estado === "aceptado" );
    });

    const reservasProximas = this.state.inmueble.filter(reserva => {
      const fechaInicioReserva = new Date(reserva.fechaini);
      const estado = reserva.estado;
      return fechaInicioReserva > fechaHoy  && estado === "aceptado";
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
             <p>{reserva.idreserva}</p>
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
                     <p>ID Inmueble: {reserva.idinmueble}</p><p> Fecha Fin: {reserva.fechafin}</p>
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

          {this.state.isModalOpen && (
          
          <Comentarios
            isOpen={this.state.isModalOpen}
            onClose={this.closeModal}
            idInmueble={this.state.idInmueble} 
            
          
          />
        
        )}
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
  onClick={(event) => this.handleCalificarClick(reserva.idreserva, reserva.idinmueble, event)}
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

}

export default ListaReservaWithNavigate;