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
class VistaDetalladaInm extends Component {

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
    return (
      <>
        <body>
          <h1 className='tituloVista'>INKA PACHA Cabaña con dos camas y baño privado</h1>
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
        <div className='GridInformacion'>
            <div className='Colum1'>
                <h className='title1'>Casa de huéspedes - Anfitrión: Martin</h>
                <h className='title2'>3 huéspedes - 1 habitación - 2 camas - 1 baño privado</h>
                <br></br>
                <div className="divisor-plomo"></div>
                <br></br>
                <div className='informacionAdicional'>
                <h className='title3'>Relájate en esta escapada única y tranquila. Somos una casa de Campo de la comunidad Yumani. Esta habitacion viene con baño privado y una vista increible al lago. Nuestro estilo es de origen Aymara, con objetos y pinturas de inspiración indígena ancestral. Disponemos de Servicio de Restaurante. Atendido por Martín y Justina, quienes te darán las mejores indicaciones para explorar la Isla sagrada.</h>
                </div>
                <br></br>
                <div className="divisor-plomo"></div>
                <br></br>
                <h className='title1'>Lo que este lugar ofrece</h>
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
                <div className="divisor-plomo"></div>
                <br></br>
            </div>
            <div className='Colum2'>
              <div className="InformacionReserva">
                <h className='title1'>90 Bs. noche </h>
                <br></br>
                <li id="prim" className='FechaReserva'><Fechas /></li>
                <br></br>
                <li><CuantosBoton /></li>
                <br></br>
                <button className="reserva-button">
                  Reserva
                </button>
              </div>

            </div>
        </div>
        <div className='GridComentarios'>
            <div className="divisor-plomo"></div>
            <br></br>
        </div>
        </body>
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
      </>
    );
  }
}

export default VistaDetalladaInm;