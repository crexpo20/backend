import React, {Component} from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/ReservaInmueble.css';
import {IoIosArrowDropleftCircle } from 'react-icons/io';
import Fechas from '../components/fechas';
import CuantosBoton from '../components/cuantos/botoncuantos';
import { inmuebles } from '../components/inmuebles';

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
  }
  const getUsuarioID = () => {
    // Puedes ajustar la clave según cómo estés almacenando el ID del usuario en localStorage
    return localStorage.getItem('idusuario');
  };
  
class ReservaInm extends Component{
    constructor(props) {
        super(props);
        this.state = {
          inmueble: {},
          anfitrion: {},
          showFechaModal: false,
          showHuespedModal: false,
          showConfirmacionModal: false,
          fechaini: null,
          fechafin: null,
        };
    
        this.getInmuebles = this.getInmuebles.bind(this);
      }
    
      componentDidMount() {
        const id = this.props.params.espaciosID;
        this.getInmuebles();
      }
    
      getInmuebles = async () => {
        try {
          const response = await axios.get(`https://telossuite.amicornios.com/api/getinmuebles/${this.props.params.espaciosID}`);
          const anfitriondata = await axios.get(`https://telossuite.amicornios.com/api/getusuario/${response.data.idusuario}`);
          this.setState({ inmueble: response.data, anfitrion: anfitriondata.data });
        } catch (error) {
          console.log(error);
        }
      };
    
      openFechaModal = () => {
        this.setState({ showFechaModal: true });
      };
    
      closeFechaModal = () => {
        this.setState({ showFechaModal: false });
      };
    
      openHuespedModal = () => {
        this.setState({ showHuespedModal: true });
      };
    
      closeHuespedModal = () => {
        this.setState({ showHuespedModal: false });
      };
      openConfirmacionModal = async (e) => {
        e.preventDefault();
        this.setState({ showConfirmacionModal: true });
        const reserva = {
          idinmueble: this.state.inmueble.idinmueble,
           idusuario :parseInt(localStorage.getItem("userID")),   
           id :  "sindefinit",
           idanfitrion : this.state.inmueble.idusuario,
           fechaini : localStorage.getItem("fechaini"),
           fechafin : localStorage.getItem("fechafin"),
          huespedes :2,
          politicacancelacion : "nohay",
          montototal :this.calcularTotal(),
          estado : "pendiente",
          comentado:0,
        }
        const postReserva = async (url, reserva) => {
          const response = await fetch(url, {
                        
            method: 'POST',
            body: JSON.stringify(reserva),
            headers: {
                  'Content-Type': 'application/json',
            }
            
            
          });
          return response;
          
        }
        const respuestaJson = await postReserva( "https://telossuite.amicornios.com/api/postreserva", reserva);

        console.log("Response:------> " + respuestaJson.status);
        console.log('Datos de registro:', reserva);
      
          
      };
    
      closeConfirmacionModal = () => {
        this.setState({ showConfirmacionModal: false });
      };

      // Función para calcular la cantidad de noches
      // Función para calcular la cantidad de noches
      calcularNoches = () => {
        const fechaini = localStorage.getItem("fechaini");
        const fechafin = localStorage.getItem("fechafin");
      
        if (fechaini && fechafin) {
          const fechaInicio = new Date(fechaini);
          const fechaFin = new Date(fechafin);
      
          const diffTime = Math.abs(fechaFin - fechaInicio);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays;
        }
        return 0;
      };

  // Función para calcular el total a pagar
  calcularTotal = () => {
    const { inmueble } = this.state;
    const precioPorNoche = inmueble?.precio || 0;
    const noches = this.calcularNoches();
    return precioPorNoche * noches;
  };

    render(){
      return(
        <>
            <div className='Grid1'>
                <Link to={`/vistaInm/${this.state?.inmueble?.idinmueble}`} className='BotonAnterior'>
                <IoIosArrowDropleftCircle size={30} />
                </Link>
                <h1 className='TituloReserva'>Confirma y reserva</h1>
            </div>
            <div className='Grid2'>
                <div className='Colum1'>
                    <h2>Tu viaje</h2>
                    <div className='Fechas'>
                        <div>
                            <div className='fecha'>
                                <h3>Fechas</h3>
                            </div>
                            <h4>{localStorage.getItem("fechaini") } al {localStorage.getItem("fechafin") } </h4>
                        </div>
                    </div>
                    <div className='Huespedes'>
                            <div className='huesped'>
                            <h3>Huéspedes</h3>
                            
                            </div>
                        <h4> {this.state?.inmueble?.capacidad} huéspedes</h4>
                    </div>
                </div>
                <div className='Colum2'>
                    <div className="InformacionPrecio">
                        <h5>{this.state?.inmueble?.tipopropiedad} en {this.state?.inmueble?.ciudad} - {this.state?.inmueble?.tituloanuncio}</h5>
                        <div className="divisor-plomo"></div>
                        <h2>Información del precio</h2>
                        <div className='total'>
                            <h4>Bs. {this.state?.inmueble?.precio} x {this.calcularNoches()} noches</h4>
                            <h4>Total a pagar Bs. {this.calcularTotal()}</h4>
                        </div>
                        <div>
                        <Link>
                            <button className="reserva-button" onClick={this.openConfirmacionModal}>
                            Reservar ahora
                            </button>
                        </Link>
                        </div>
                    </div>

                </div>
            </div>
            
         <Outlet />
         {this.state.showFechaModal && (
            <div className="modalReserva">
                <div className="modal-content-reserva">
                <span className="closeReserva" onClick={this.closeFechaModal}>
                    &times;
                </span>
                <li id="prim" className='FechaReserva'><Fechas /></li>
                <br></br>
                <Link to='/Reserva'>
                    <button className="guardar-button">
                    Guardar cambios
                    </button>
                </Link>
                </div>
            </div>
            )}

            {this.state.showHuespedModal && (
            <div className="modalReserva">
                <div className="modal-content-reserva">
                <span className="closeReserva" onClick={this.closeHuespedModal}>
                    &times;
                </span>
                <li><CuantosBoton /></li>
                <br></br>
                <Link to='/Reserva'>
                    <button className="guardar-button">
                    Guardar cambios
                    </button>
                </Link>
                </div>
            </div>
            )}
            {this.state.showConfirmacionModal && (
          <div className="modalReserva">
            <div className="modal-content-reserva">
              <span className="closeReserva" onClick={this.closeConfirmacionModal}>
                &times;
              </span>
              {/* Contenido del modal de confirmación */}
              <h3>Solicitud de reserva enviada</h3>
              <p>{`La solicitud de reserva del inmueble "${this.state?.inmueble?.tituloanuncio}" fue enviada al anfitrión ${this.state?.anfitrion?.nombre} ${this.state?.anfitrion?.apellido}. Dentro de 24 horas, tendremos su respuesta.`}</p>
              <p>Puede ver el estado de su reserva en "Mis reservas" en el Menú.</p>
              <div>
                <Link to={`/modUsuario/${getUsuarioID()}`}>
                  <button className="guardar-button" onClick={this.closeConfirmacionModal}>
                    Ver estado de reserva
                  </button>
                </Link>
                <Link to='/'>
                  <button className="guardar-button">
                    Salir
                  </button>
                </Link>
                </div>
            </div>
          </div>
        )}

        </>
        
      );
    }
  }
  export default withParams(ReservaInm);

