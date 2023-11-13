import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { sitios } from '../sitios';
import { inmuebles } from '../components/inmuebles';
import axios from "axios";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';
import wifi from '../iconos/wifi.png';
import parqueo from '../iconos/parqueo.png';
import cocina from '../iconos/cocina.png';
import refrigerador from '../iconos/refrigerador.png';
import lavadora from '../iconos/lavadora.png';
import piscina from '../iconos/piscina.png';
import '../CSS/VistaDetaInmueble.css';
import Fechas from '../components/fechas';
import CuantosBoton from '../components/cuantos/botoncuantos';
import Mapa from '../pages/Mapa.js';
import credentials from '../pages/credentials.js';

class VistaDetalladaInm extends Component {
 


  //Controlamos el carrusel de Imagenes con su descripcion
  state = {
    currentImageIndex: 0,
    imageCarouselOpen: false,
    images: [
      'https://picsum.photos/280/280',
      'https://picsum.photos/280/280',
      'https://picsum.photos/280/280',
      'https://picsum.photos/280/280',
      'https://picsum.photos/280/280',
    ],
    imageDescriptions: [
      'Descripción de la imagen 1',
      'Descripción de la imagen 2',
      'Descripción de la imagen 3',
      'Descripción de la imagen 4',
      'Descripción de la imagen 5',
    ],
  };
  openImageCarousel = () => {
    this.setState({ imageCarouselOpen: true });
  };

  closeImageCarousel = () => {
    this.setState({ imageCarouselOpen: false });
  };

  showNextImage = () => {
    this.setState((prevState) => ({
      currentImageIndex: (prevState.currentImageIndex + 1) % prevState.images.length,
    }));
  };

  showPreviousImage = () => {
    this.setState((prevState) => ({
      currentImageIndex:
        (prevState.currentImageIndex - 1 + prevState.images.length) % prevState.images.length,
    }));
  };

 
  render() {
    const { currentImageIndex, images } = this.state;
    const isAtFirstImage = currentImageIndex === 0;
    const isAtLastImage = currentImageIndex === images.length - 1;

    //Const de los comentarios
    const comentariosColum1 = [
      {
        fotoUsuario1: 'https://picsum.photos/280/280',
        nombreUsuario1: 'Usuario 1',
        comentario1: 'El lugar es hermoso, pero tuvimos algunos problemas con la calefacción. El anfitrión fue receptivo y lo solucionó rápidamente. Aún así, disfrutamos de nuestra estancia.',
      },
      {
        fotoUsuario1: 'https://picsum.photos/280/280',
        nombreUsuario1: 'Usuario 2',
        comentario1: 'Excelente lugar para relajarse. Las vistas son espectaculares y la atención es inigualable. ¡Volvería sin dudarlo!',
      },
      {
        fotoUsuario1: 'https://picsum.photos/280/280',
        nombreUsuario1: 'Usuario 3',
        comentario1: 'La ubicación es perfecta, pero el mobiliario es un poco anticuado. En general, tuvimos una estancia agradable.',
      },
    ];

    const comentariosColum2 = [
      {
        fotoUsuario2: 'https://picsum.photos/280/280',
        nombreUsuario2: 'Usuario 4',
        comentario2: 'Estuvimos encantados con la hospitalidad del anfitrión. El alojamiento es acogedor y bien mantenido. ¡Muy recomendado!',
      },
      {
        fotoUsuario2: 'https://picsum.photos/280/280',
        nombreUsuario2: 'Usuario 5',
        comentario2: 'La piscina y el jardín eran perfectos. Pasamos días maravillosos aquí. ¡Muy recomendado!',
      },
      {
        fotoUsuario2: 'https://picsum.photos/280/280',
        nombreUsuario2: 'Usuario 6',
        comentario2: 'Pasamos un tiempo maravilloso aquí. El anfitrión fue amable y servicial. Definitivamente volveremos.',
      },
    ];

    //url de la API para mostrar la ubicacion que registro el host
    const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`;

    return (
      <>
        <body id='vista'>
          <h1 className='tituloVista'>INKA PACHA Cabaña con dos camas y baño privado</h1>
          {/* GRID de las imagenes */}
          <div className='GridImagenes'>
            <div className='Columna1'>
                <img src="https://picsum.photos/280/280" alt='Imagen 1' />
            </div>
            <div className='Columna2'>
                <img src="https://picsum.photos/280/280" alt='Imagen 2-1' />
                <img src="https://picsum.photos/280/280" alt='Imagen 2-2' />
            </div>
            <div className='Columna3'>
                <img src="https://picsum.photos/280/280" alt='Imagen 3-1' />
                <div style={{ position: 'relative' }}>
                <img src="https://picsum.photos/280/280" alt='Imagen 3-2' />
                <button onClick={this.openImageCarousel} className="overlay-button">Mostrar detalles</button>
              </div>
            </div>
        </div>
        {/* GRID de la informacion, se divide en dos columnas, En la COLUMNA1 se encuentra la informacion y los servicios.
        En la COLUMNA2 se encuentra la informacion del precio y el boton de la reserva*/}
        <div className='GridInformacion'>
            <div className='Colum1'>
                <h2 className='title1'>Casa de huéspedes - Anfitrión: Martin</h2>
                <p className='title2'>3 huéspedes - 1 habitación - 2 camas - 1 baño privado</p>
                <br></br>
                <div className="divisor-plomo"></div>
                <br></br>
                <div className='informacionAdicional'>
                <p className='title3'>Relájate en esta escapada única y tranquila. Somos una casa de Campo de la comunidad Yumani. Esta habitacion viene con baño privado y una vista increible al lago. Nuestro estilo es de origen Aymara, con objetos y pinturas de inspiración indígena ancestral. Disponemos de Servicio de Restaurante. Atendido por Martín y Justina, quienes te darán las mejores indicaciones para explorar la Isla sagrada.</p>
                </div>
                <br></br>
                <div className="divisor-plomo"></div>
                <br></br>
                <h2 className='title1'>Lo que este lugar ofrece</h2>
                <br></br>
                <div className='gridVistaServicios'>
                  <div className='columServ1'>
                   <div className="servicio">
                      <img src={wifi}/>
                      <p>Wifi</p>
                    </div>
                    <div className="servicio">
                      <img src={parqueo}/>
                      <p>Parqueo</p>
                    </div>
                    <div className="servicio">
                      <img src={cocina}/>
                      <p>Cocina</p>
                    </div>
                  </div>
                  <div className='columServ2'>
                    <div className="servicio">
                        <img src={refrigerador}/>
                        <p>Refrigerador</p>
                      </div>
                      <div className="servicio">
                        <img src={lavadora}/>
                        <p>Lavaropa</p>
                      </div>
                      <div className="servicio">
                        <img src={piscina}/>
                        <p>Piscina</p>
                      </div>
                  </div>
                </div>
                <br></br>
            </div>
            <div className='Colum2'>
              <div className="InformacionReserva">
                <h2 className='title1'>90 Bs. noche </h2>
                <br></br>
                <li id="prim" className='FechaReserva'><Fechas /></li>
                <br></br>
                <li><CuantosBoton /></li>
                <br></br>
                <div>
                  <Link to='/Reserva'>
                      <button className="reserva-button">
                      Reserva
                      </button>
                  </Link>
                </div>
              </div>

            </div>
        </div>
        {/* GRID de los comentarios */}
        <div className='GridComentarios'>
            <div className="divisor-plomo"></div>
            <br></br>
            <h2 className='title1'>Reseñas </h2>
        </div>
        <div className='GridReseñas'>
            <div className='ColumCom1'>
                {comentariosColum1.map((comentario1, index) => (
                  <div key={index} className='comentario1'>
                    <div className="usuario-info1">
                      <img src={comentario1.fotoUsuario1} alt='Usuario1' className='foto-usuario1' />
                      <h3>{comentario1.nombreUsuario1}</h3>
                    </div>
                    <p>{comentario1.comentario1}</p>
                  </div>
                ))}
            </div>
            <div className='ColumCom2'>
                {comentariosColum2.map((comentario2, index) => (
                      <div key={index} className='comentario2'>
                        <div className="usuario-info2">
                          <img src={comentario2.fotoUsuario2} alt='Usuario2' className='foto-usuario2' />
                          <h3>{comentario2.nombreUsuario2}</h3>
                        </div>
                        <p>{comentario2.comentario2}</p>
                      </div>
                    ))}
            </div>
        </div>
        {/* GRID del mapa */}
        <div className='GridMapa'>
              <div className="divisor-plomo"></div>
              <br></br>
              <h2 className='title1'>A dónde irás </h2>
              <h2 className='title2'>Cochabamba, Departamento de Cochabamba, Bolivia</h2>
              <div className='MapaGoogle'>
                <Mapa 
                  googleMapURL={mapURL}
                  containerElement={<div style={{ height: '150%' }}></div>}
                  mapElement={<div style={{ height: '100%' }}></div>}
                  loadingElement={<p>Cargando..</p>}
                  lat="-17.3852993"
                  lng="-66.2010302"
                  radio={0}
                />

              </div>
            </div>
        <Outlet />
        {this.state.imageCarouselOpen && (
          <div className="modalImagenes">
            <div className="modal-content-imagenes">
             <button className="close-button-imagenes" onClick={this.closeImageCarousel}>
                X
              </button>
              <img src={images[currentImageIndex]} alt='Imagen Carrusel' />
              <p className="image-description">
                {this.state.imageDescriptions[currentImageIndex]}
              </p>
              {!isAtFirstImage && (
                <button className="botonAnterior" onClick={this.showPreviousImage}>
                  <IoIosArrowDropleftCircle />
                </button>
              )}
              {!isAtLastImage && (
                <button className="botonSiguiente" onClick={this.showNextImage}>
                  <IoIosArrowDroprightCircle />
                </button>
              )}
            </div>
          </div>
          
        )}
        </body>
      </>
    );
  }
}

export default VistaDetalladaInm;