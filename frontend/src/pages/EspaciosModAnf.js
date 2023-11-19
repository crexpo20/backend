import React, { Component } from 'react';
import {  Link, Outlet } from 'react-router-dom';
import iconoEliminar from '../iconos/iconoEliminar.png';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import '../CSS/slick.css'

class EspaciosModAnf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inmueble: [],
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
      const response = await axios.get('http://127.0.0.1:8000/api/getinmuebles');
      this.setState({ inmueble: response.data });
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

  confirmarElimi = () => {
    this.setState({ modalAbierto: false });
  };

  eliminarSitio = (sitio) => {
    // Agrega tu lógica para eliminar el sitio, por ejemplo, una llamada a la API
    console.log(`Eliminando sitio: ${sitio.id}`);
    // Luego actualiza el estado o realiza otras acciones necesarias
    // this.setState({ inmueble: updatedData });
    // ...
  };

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
                      <p className="inmCamas"> <b>Precio por noche:</b> bs. {sitio.precio}</p>
                      <p className="inmPrecio"><b>Capacidad:</b>  {sitio.capacidad} persona(s)</p>
                      <p className="inmPrecio"><b>Normas:</b> {sitio.normas}</p>
                    </div>
                     
                    <div class='BotonesEditEli'>
                                <div class='BotonEditar'>
                                    <Link to={`/cliente/${sitio.idinmueble}`}>editar</Link>
                                    
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
