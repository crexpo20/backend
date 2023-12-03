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
  constructor(props){
    super(props);
    this.state={
      inmueble:[],
      favorites: [],
      showLoginModal: false
    };
    this.getProductos = this.getProductos.bind(this);
    }
   
    

 
    componentDidMount() {
      const userID = localStorage.getItem('userID');
      
        this.getProductos();
        this.getFavorites(userID);
        
    
    }

    getProductos = async () => {
      try {
        const inmueblesResponse = await axios.get('https://telossuite.amicornios.com/api/getinmuebles');
       
    
        this.setState({ inmueble: inmueblesResponse.data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

getFavorites = async (userID) => {
  try {
    const response = await axios.get(`https://telossuite.amicornios.com/api/getfavoritos/${userID}`);
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
          response = await axios.delete(`https://telossuite.amicornios.com/api/delfavoritos/${userID}/${sitioId}`);
          if (response.status === 200) {
            const updatedFavorites = this.state.favorites.filter(fav => fav.idinmueble !== sitioId);
            this.setState({ favorites: updatedFavorites });
          } else {
            console.error('Error al eliminar favorito en el servidor');
          }
        } else {
          response = await axios.post('https://telossuite.amicornios.com/api/postfavorito', {
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
          {this.state.inmueble.map((sitio, index) => {
           {
  const isFavorite = favorites.some(fav => fav.idinmueble === sitio.idinmueble);
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
                  <h3 className="inmueble_name">{sitio.tipopropiedad} en {sitio.ciudad}</h3>
                    <div className="inmueble_info">
                    <p className="inmDet">{sitio.idinmueble}</p>
                      <p className="inmDet">{sitio.titulo}</p>
                      {
                        sitio.compartido === 1 &&
                        <p className="inmPrecio"><b>Compartido</b></p>
                   
                      }
                       {
                        sitio.privado === 1 &&
                        <p className="inmPrecio"><b>Privado</b></p>
                   
                      }
                      <p className="inmCamas"> <b>Precio por noche:</b> bs. {sitio.precio}</p>
                      <p className="inmPrecio"><b>Capacidad:</b>  {sitio.capacidad} persona(s)</p>
                      <p className="inmPrecio"><b>Normas:</b> {sitio.normas}</p>
                      {
                        sitio.niños === 1 &&
                        <p className="inmPrecio"><b>Se permiten niños</b></p>
                   
                      }
                       {
                        sitio.mascotas === 1 &&
                        <p className="inmPrecio"><b>Se permiten mascotas</b></p>
                   
                      }
                       {
                        sitio.niños === 0 &&
                        <p className="inmPrecio"><b>NO se permiten niños</b></p>
                   
                      }
                       {
                        sitio.mascotas === 0 &&
                        <p className="inmPrecio"><b>NO se permiten mascotas</b></p>
                   
                      }
                   
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
          
                  <div className='BotonMasDetalles'>
                      <Link to={`/vistaInm/${sitio.idinmueble}`}>Ver más</Link>
                    </div>
                     
                        </div>
                      );
                }
               
              
              return null;
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
