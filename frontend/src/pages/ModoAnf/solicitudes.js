import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/cards.css';
import axios from "axios";

class Solicitudes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservados: [],
      inmuebleDetalles: {},
    };
  }

  handleAceptarRechazar = (idreserva,idinmueble,idusuario,id,idanfitrion,fechaini,fechafin,huespedes,politicacancelacion,montototal, estado) => {
    const url = `https://telossuite.amicornios.com/api/putreserva/${idreserva}`;

    // Datos que se enviarán en la solicitud
    const datosReserva = {
      idreserva: idreserva,
      idinmueble : idinmueble,
      idusuario : idusuario,
      id : id,
      idanfitrion : idanfitrion,
      fechaini :  fechaini ,
      fechafin :  fechafin,
      huespedes : huespedes,
      politicacancelacion :  politicacancelacion,
      montototal : montototal,
      estado :  estado ,
      comentado:0,
      created_at: null,
      updated_at: null,
     

      // Puedes agregar más propiedades según tu necesidad
    };

    
    const postNegocio = async (url, newNego) => {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(newNego),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
    
      // Agregar un retraso de 1 segundo entre las solicitudes
      await new Promise(resolve => setTimeout(resolve, 2000));
    
      return response;
    };
    
    const respuestaJson = postNegocio(url, datosReserva);

    console.log("Response:------> " + respuestaJson);
    console.log(datosReserva)

    



  };

  

  componentDidMount() {
    const idusuario = localStorage.getItem('idusuario');
    console.log('IDUsuario:', idusuario);

    axios.get(`https://telossuite.amicornios.com/api/getusuario/${idusuario}`)
      .then(response => {
        console.log('Respuesta de getusuario:', response.data);
        const { nombre, apellido } = response.data;
        this.setState({ nombreUsuario: nombre, apellidoUsuario: apellido });
      })
      .catch(error => {
        console.error('Error al obtener datos del usuario:', error);
      });

      axios.get(`https://telossuite.amicornios.com/api/getreanfitrion/${idusuario}`)
      .then(reservasResponse => {
        console.log('Respuesta de getreservas:', reservasResponse.data);
        const reservasAnfitrion = reservasResponse.data;
    
        
        const promises = reservasAnfitrion.map(reservaU =>
          axios.get(`https://telossuite.amicornios.com/api/getinmueble/${reservaU.idinmueble}`)
        );
    
       
        const nombrePromises = reservasAnfitrion.map(reservaU =>
          axios.get(`https://telossuite.amicornios.com/api/getusuario/${reservaU.idusuario}`)
        );
    
        
        Promise.all(promises)
          .then(responses => {
            const inmuebleDetalles = {};
            responses.forEach((res, index) => {
              const reservaU = reservasAnfitrion[index];
              inmuebleDetalles[reservaU.idinmueble] = res.data;
            });
            this.setState({ inmuebleDetalles });
          })
          .catch(error => {
            console.error('Error al obtener detalles del inmueble:', error);
          });
    
        
        Promise.all(nombrePromises)
          .then(nombreResponses => {
            const nuevosReservados = reservasAnfitrion.map((reserva, index) => {
              const datosUsuario = nombreResponses[index].data;
              const nombreHuesped = datosUsuario ? `${datosUsuario.nombre} ${datosUsuario.apellido}` : "Nombre no disponible";
              return { ...reserva, nombreHuesped };
            });
            this.setState({ reservados: nuevosReservados });
          })
          .catch(error => {
            console.error('Error al obtener nombres de huéspedes:', error);
          });
      })
      .catch(error => {
        console.error('Error al obtener reservas:', error);
      });
  }
  

  render() {
    const { reservados, inmuebleDetalles } = this.state;
    return (
      <div>
        <h6>Lista de solicitudes</h6>
        {reservados.length > 0 ? (
          <table className="reservados-table">
            <thead>
              <tr>
                <th>Título del inmueble</th>
                <th>Nombre del huésped</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {reservados.map(reservaU => (
                <tr key={reservaU.idinmueble}>
                  {inmuebleDetalles[reservaU.idinmueble] && (
                    <>
                      <td>
                        <Link to={`/vistaInm/${reservaU.idinmueble}`} style={{ display: 'block', width: '200px'  }}>
                          <p style={{ color: 'black' }}>{inmuebleDetalles[reservaU.idinmueble].tituloanuncio}</p>
                        </Link>
                      </td>
                      <td>
                          <p style={{ color: 'black' , width: '200px' }}>{reservaU.nombreHuesped}</p>
                          <Link to={`/perfilUA/${reservaU.idusuario}`} style={{ display: 'block' }}>
                            <button>Ver Perfil</button>
                          </Link>
                      </td>
                      <td>
                        <p style={{ color: 'black', width: '140px' }}>
                          {reservaU.fechaini}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: 'black', width: '140px' }}>
                          {reservaU.fechafin}
                        </p>
                      </td>
                      
                            {
                              reservaU.estado === "pendiente" &&
                             <td>
                              <button onClick={() => this.handleAceptarRechazar(reservaU.idreserva, reservaU.idinmueble, reservaU.idusuario,reservaU.id,reservaU.idanfitrion,reservaU.fechaini,reservaU.fechafin,reservaU.huespedes,reservaU.politicacancelacion,reservaU.montototal, "aceptado")}>Aceptar</button>
                              <button onClick={() => this.handleAceptarRechazar(reservaU.idreserva, reservaU.idinmueble, reservaU.idusuario,reservaU.id,reservaU.idanfitrion,reservaU.fechaini,reservaU.fechafin,reservaU.huespedes,reservaU.politicacancelacion,reservaU.montototal, "rechazado")}>Rechazar</button>
                            
                      </td>
                            }
                             {
                              reservaU.estado === "aceptado" &&
                             <td>
                              <p>Aceptado</p>      
                      </td>
                            }
                            {
                              reservaU.estado === "rechazado" &&
                             <td>
                              <p>Rechazado</p>      
                      </td>
                            }
                            
                            
                          
                      
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>CARGANDO SOLICITUDES...</p>
        )}
      </div>
    );
  }
}

export default Solicitudes;