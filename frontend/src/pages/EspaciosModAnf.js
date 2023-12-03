import React, { Component } from 'react';
import {  Link, Outlet } from 'react-router-dom';
import iconoEliminar from '../iconos/iconoEliminar.png';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import '../CSS/slick.css'
import moment from 'moment';
import 'moment/locale/es'; // Puedes ajustar el idioma según tu preferencia


class EspaciosModAnf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inmueble: [],
      reserva:[],
      estado: "",
      modalAbierto: false,
      sitioSeleccionado: null,
    };
    this.getProductos = this.getProductos.bind(this);
  }
  

  componentDidMount() {
    this.getProductos();
   
  }
  
 
  getProductos = async () => {
    try {
      const response = await axios.get('https://telossuite.amicornios.com/api/getinmuebles');
      this.setState({ inmueble: response.data });
      const responses = await axios.get('https://telossuite.amicornios.com/api/getreserva');
      this.setState({ reserva: responses.data });
    } catch (error) {
      console.log(error);
    }
  };

  handleEliminarClick = (sitio) => {
    this.setState({ sitioSeleccionado: sitio, modalAbierto: true });
  };

  confirmarEliminacion = () => {
    const sitioSeleccionado = this.state.sitioSeleccionado;
    if (sitioSeleccionado) {
      this.eliminarSitio(sitioSeleccionado);
    }
  };


  actualizarEstadoReserva = (sitio) => {
    const fechahoy = new Date();

// Si necesitas la fecha en formato específico, por ejemplo, YYYY-MM-DD
const fechahoyFormateada = fechahoy.toISOString().split('T')[0];

console.log('Fecha de hoy:', fechahoyFormateada);

const startDate = new Date(sitio.fechainicio);
const endDate = new Date(sitio.fechafin);
    if(fechahoyFormateada >= startDate && fechahoyFormateada <= endDate){

    }
  };
  confirmarElimi = () => {
    this.setState({ modalAbierto: false });
  };

  changeEstado = () => {
    this.setState({ estado: "ola" });
  }
  eliminarSitio = (sitio) => {
    // Agrega tu lógica para eliminar el sitio, por ejemplo, una llamada a la API
    console.log(`Eliminando sitio: ${sitio.id}`);
    // Luego actualiza el estado o realiza otras acciones necesarias
    // this.setState({ inmueble: updatedData });
    // ...
  };
  esFechaEnRango = (fechaInicio, fechaFin) => {
    const fechaInicioReserva = new Date(fechaInicio);
    const fechaFinReserva = new Date(fechaFin);
    const fechaHoy = new Date();
  
    return fechaHoy >= fechaInicioReserva && fechaHoy <= fechaFinReserva;
  };
  tieneReserva(idInmueble, reservas) {
    const fechaHoy = new Date();
    const formatoFechaHoy = fechaHoy.toISOString().split('T')[0]; // Obtén la fecha actual en formato 'YYYY-MM-DD'
  
    // Filtra las reservas para el idInmueble y el día de hoy
    const reservasHoy = reservas.filter(reserva => 
      reserva.idinmueble === idInmueble &&
      formatoFechaHoy >= reserva.fechaini &&
      formatoFechaHoy <= reserva.fechafin
    );
  
    // Devuelve true si hay al menos una reserva hoy, de lo contrario, false
    return reservasHoy.length > 0;
  }
  
  render() {
    // Configuración del carrusel
    const carouselSettings = {
      
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:true,
      
      
    };

    return (
      <>
        <body>
          <div className="verinm">
            {this.state.inmueble.map((sitio) => {
               if (sitio.idusuario === parseInt(localStorage.getItem('userID'))) {
                
                return (
                  <div className="InmueblesHost" key={sitio.id}>
                    <Slider {...carouselSettings}>
                      <div>
                        <img className="inmueble_fot" src={sitio.imagen1} alt="Inmueble 1" />
                      </div>
                      <div>
                       <img className="inmueble_fot" src={sitio.imagen2} alt="Inmueble 2" />
                      </div>
                      <div>
                        <img className="inmueble_fot" src={sitio.imagen3} alt="Inmueble 1" />
                      </div>
                      <div>
                        <img className="inmueble_fot" src={sitio.imagen4} alt="Inmueble 1" />
                      </div>
                      <div>
                        <img className="inmueble_fot" src={sitio.imagen5} alt="Inmueble 1" />
                      </div>
                  </Slider>
                     
                    <h3 className="inmueble_name">{sitio.tipopropiedad}</h3>
                    <div className="inmueble_info">
                      <p className="inmDet">{sitio.titulo}</p>
                      <p className="inmCamas"> <b>ID DEL INMUEBLE: {sitio.idinmueble}</b></p>
                      
                      <p className="inmCamas"> <b>Precio por noche:</b> bs. {sitio.precio}</p>
                      <p className="inmPrecio"><b>Capacidad:</b>  {sitio.capacidad} persona(s)</p>
                      <p className="inmPrecio"><b>Normas:</b> {sitio.normas}</p>
                         
                        {this.esFechaEnRango(sitio.fechainicio, sitio.fechafin) && 
                              <p className="inmPrecio">Estado del inmueble: <b>Pausado</b></p>
                        }
                        {!this.esFechaEnRango(sitio.fechainicio, sitio.fechafin) && 
                         !this.tieneReserva(sitio.idinmueble, this.state.reserva) &&
                              <p className="inmPrecio">Estado del inmueble: <b>Publicado</b></p>
                        }
                        {
                         this.tieneReserva(sitio.idinmueble, this.state.reserva) &&
                              <p className="inmPrecio">Estado del inmueble: <b>Alquilado</b></p>
                        }

                      
                      
                     
                    </div>
                     
                    <div class='BotonesEditEli'>
                                <div class='BotonEditar'>
                                    <Link to={`/cliente/${sitio.idinmueble}`}>Ver estado</Link>
                                    
                                </div>
                                
                            </div>

                    
                  </div>
                );
              }

              return null;
            })}

            {/* Modal de confirmación para el BOTON ELIMINAR */}
            {this.state.modalAbierto && (
              <div className="modalEliminar">
                <div className="modal-contenido">
                  <p>¿Estás seguro que deseas eliminar {this.state.sitioSeleccionado ? this.state.sitioSeleccionado.nombre : ''}?</p>
                  <br />
                  <button onClick={this.confirmarEliminacion}>Eliminar</button>
                  <button onClick={this.confirmarElimi}>Cancelar</button>
                </div>
              </div>
            )}
          </div>
        </body>
        <Outlet />
      </>
    );
  }
}

export default EspaciosModAnf;
