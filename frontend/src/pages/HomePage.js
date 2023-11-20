import React, { Component } from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import ModalInicio from '../components/inicioSesion/inicio';
import '../CSS/cards.css';
import iconocorazon1 from '../iconos/corazon1.png';
import iconocorazon2 from '../iconos/corazon2.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import '../CSS/slick.css'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inmueble: [],
      favorites: [],
      showLoginModal: false,
    };
  }

  componentDidMount() {
    const userID = localStorage.getItem('userID');
    
      this.getProductos();
      this.getFavorites(userID);
   
  }

  getProductos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getinmuebles');
      this.setState({ inmueble: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  getFavorites = async (userID) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/getfavoritos/${userID}`);
      this.setState({ favorites: response.data });
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
    }
  };

  toggleFavorite = async (sitio) => {
    const userID = localStorage.getItem('userID');
    const sitioId = sitio.idinmueble;

    if (parseInt(localStorage.getItem('init')) === 1) {
      try {
        let response;
        if (sitioId) {
          const isFavorite = this.state.favorites.find(fav => fav.idinmueble === sitioId);
          if (isFavorite) {
            response = await axios.delete(`http://127.0.0.1:8000/api/delfavoritos/${userID}/${sitioId}`);
            if (response.status === 200) {
              const updatedFavorites = this.state.favorites.filter(fav => fav.idinmueble !== sitioId);
              this.setState({ favorites: updatedFavorites });
            } else {
              console.error('Error al eliminar favorito en el servidor');
            }
          } else {
            response = await axios.post('http://127.0.0.1:8000/api/postfavorito', {
              idinmueble: sitioId,
              idusuario: userID,
            });
            if (response.status === 200) {
              const newFavorite = {
                idinmueble: sitioId,
                
              };
              this.setState(prevState => ({ favorites: [...prevState.favorites, newFavorite] }));
            } else {
              console.error('Error al agregar favorito en el servidor');
            }
          }
        } else {
          console.error('sitioId is missing or empty');
        }
      } catch (error) {
        console.error('Error al procesar la solicitud:', error);
      }
    } else {
      console.log('Inicia sesión');
      this.setState({ showLoginModal: true });
    }
  };

  render() {
    const { favorites, showLoginModal, inmueble } = this.state;
    const carouselSettings = {
      
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:true
      
    };
    return (
      <>
        <body>
          <div className="verinm">
            {inmueble.map((sitio) => {
              const isFavorite = favorites.some(fav => fav.idinmueble === sitio.idinmueble);
              return (
                <div className="InmueblesHost" key={sitio.idinmueble}>
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
                  <h3 className="inmueble_name">{sitio.tipopropiedad} en {sitio.ciudad}</h3>
                    <div className="inmueble_info">
                      <p className="inmDet">{sitio.titulo}</p>
                      <p className="inmCamas"> <b>Precio por noche:</b> bs. {sitio.precio}</p>
                      <p className="inmPrecio"><b>Capacidad:</b>  {sitio.capacidad} persona(s)</p>
                      <p className="inmPrecio"><b>Normas:</b> {sitio.normas}</p>
                      <div className='BotonMasDetalles'>
                      <Link to={`/vistaInm/${sitio.idinmueble}`}>Ver más</Link>
                    </div>
                    </div>
                     
                  <button
                    onClick={() => this.toggleFavorite(sitio)}
                    className={isFavorite ? 'favorite-button active' : 'favorite-button'}
                  >
                    <img
                      src={isFavorite ? iconocorazon2 : iconocorazon1}
                      alt={isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                    />
                  </button>
                 
                </div>
              );
            })}
          </div>
          {showLoginModal && (
            <ModalInicio isOpen={showLoginModal} onClose={() => this.setState({ showLoginModal: false })}>
              <ModalInicio.Header> </ModalInicio.Header>
              <ModalInicio.Body />
              <ModalInicio.Footer />
            </ModalInicio>
          )}

          
        </body>
        <Outlet />
      </>
    );
  }
}

export default HomePage;
