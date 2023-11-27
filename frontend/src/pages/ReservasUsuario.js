import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/reservaUsuario.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import '../CSS/slick.css'

const idusuario = localStorage.getItem('userID');
localStorage.setItem('idusuario', idusuario);

class ReservasUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservados: [],
      inmuebleDetalles: {},
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

    axios.get(`https://telossuite.amicornios.com/api/getreusuario/${idusuario}`)
      .then(response => {
        
        this.setState({ reservados: response.data });

        // Obtener detalles de cada inmueble reservado
        response.data.forEach(reservaU => {
          axios.get(`https://telossuite.amicornios.com/api/getinmueble/${reservaU.idinmueble}`)
            .then(res => {
              console.log('Detalles del inmueble:', res.data);
              const { inmuebleDetalles } = this.state;
              const updatedDetalles = {
                ...inmuebleDetalles,
                [reservaU.idinmueble]: res.data
              };
              this.setState({ inmuebleDetalles: updatedDetalles });
              console.log(this.state.inmuebleDetalles);
            })
            .catch(err => {
              console.error('Error al obtener detalles del inmueble:', err);
            });
        });
      })
      .catch(error => {
        console.error('Error al obtener reservas:', error);
      });
  }
  handlePagar = (idInmueble) => {
    // Aquí deberías poner la lógica para procesar el pago del inmueble
    // Puedes redirigir a una página de pago, mostrar un modal, etc.
    console.log(`/Pago/${idInmueble}`);
  }

  render() {
    const { reservados, inmuebleDetalles, nombreUsuario, apellidoUsuario } = this.state;
    const carouselSettings = {
      
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:true
      
    };
    return (
      <div>
        <h6> Lista de reservas de {nombreUsuario} {apellidoUsuario}</h6>
        {reservados.length > 0 ? (
          <table className="reservados-table"> 
            <thead>
              <tr >
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Ciudad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {reservados.map(reservaU => (
                <tr key={reservaU.idinmueble}>
                  {inmuebleDetalles[reservaU.idinmueble] && (
                    <>
                      <td>
                        <Link  to={`/vistaInm/${reservaU.idinmueble}`} style={{ display: 'block' }}>
                          <p style={{ color: 'black' }}>{inmuebleDetalles[reservaU.idinmueble].tituloanuncio}</p>
                        </Link>
                      </td>
                      <td>
                        <Link  to={`/vistaInm/${reservaU.idinmueble}`} style={{ display: 'block' }}>
                          
                          <div style={{ width: '200px', height: '100px' }}>
                          <Slider {...carouselSettings}>
                                    <div>
                                      <img style={{ width: '210px', height: '130px' , padding: "17px"}} src={inmuebleDetalles[reservaU.idinmueble].imagen1} alt="Inmueble 1" />
                                    </div>
                                    <div>
                                    <img style={{ width: '210px', height: '130px', padding: "17px" }} src={inmuebleDetalles[reservaU.idinmueble].imagen2} alt="Inmueble 2" />
                                    </div>
                                    <div>
                                      <img style={{ width:'210px', height: '130px', padding: "17px"}} src={inmuebleDetalles[reservaU.idinmueble].imagen3} alt="Inmueble 1" />
                                    </div>
                                    <div>
                                      <img style={{ width: '210px', height: '130px', padding: "17px" }} src={inmuebleDetalles[reservaU.idinmueble].imagen4} alt="Inmueble 1" />
                                    </div>
                                    <div>
                                    <img style={{ width: '210px', height: '130px', padding: "17px" }} src={inmuebleDetalles[reservaU.idinmueble].imagen5} alt="Inmueble 1" />
                                    </div>
                                </Slider> 
                          </div>
                        
                            
                        </Link>
                      </td>
                      <td>
                        <Link style={{ display: 'block' }}>
                          <p style={{ color: 'black' }}>{inmuebleDetalles[reservaU.idinmueble].ciudad}</p>
                        </Link>
                      </td>
                      <td>
                        <p  style={{ display: 'block' }}>
                          {reservaU.estado}
                          { (reservaU.estado === "aceptado" || reservaU.estado === "Aceptado") && (
                              <Link to={`/Pago/${reservaU.idinmueble}`}>
                                <button onClick={() => this.handlePagar(reservaU.idinmueble)}>Pagar</button>
                              </Link>
                            )}
                        </p>
                      </td>
                    </>
                  )}
                </tr>
              ))}

            </tbody>
          </table>
        ) : (
          <p>No hay reservas</p>
        )}
      </div>
    );
  }
}

export default ReservasUsuario;
