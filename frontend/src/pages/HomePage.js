import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { sitios } from '../sitios';
import '../CSS/cards.css';
import { inmuebles } from '../components/inmuebles';
import iconocorazon1 from '../iconos/corazon1.png';
import iconocorazon2 from '../iconos/corazon2.png';

import PriceFilterService from './PriceFilterService';

import axios from "axios";
import ModalInicio from '../components/inicioSesion/inicio';
class HomePage extends Component {
  constructor(props){
    super(props);
    this.state={
      inmueble:[],
      favorites: [],
      allInmuebles: [], 
       inmueble: [], 
      showLoginModal: false,
    }
    this.getProductos = this.getProductos.bind(this);
    
}

/*añadir favoritos*/
toggleFavorite = (sitio) => {
  if(parseInt(localStorage.getItem("init")) === 1){
    const { favorites } = this.state;
    const sitioId = sitio.idinmueble;
  
    if (sitio.favorito === 0) {
      const updatedFavorites = favorites.filter((id) => id !== sitioId);
      this.setState({ favorites: updatedFavorites }, () => {
        console.log('Favoritos actualizados:', this.state.favorites);
      }
      );
      console.log("no está")
    } else {
      this.setState(
        { favorites: [...favorites, sitioId] },
        () => {
          console.log('Favoritos actualizados:', this.state.favorites);
        }
      );
      console.log("ya está")
  }
  
  }else{
    console.log(
      "immicia sesion"
    )
    this.setState({ showLoginModal: true });
  
  }
};

getFavoritos() {
  return this.state.favorites;
}



componentDidMount(){
  this.getProductos();
  window.addEventListener('priceFilterChanged', this.handlePriceFilterChange);
}

componentWillUnmount() {
  window.removeEventListener('priceFilterChanged', this.handlePriceFilterChange);
}

// En tu componente HomePage
// En tu componente HomePage

handlePriceFilterChange = (event) => {
  // Parsea los valores de los detalles del evento
  const minPrice = parseInt(event.detail.minPrice, 10) || 0;
  const maxPrice = parseInt(event.detail.maxPrice, 10) || Infinity;
  const rooms = event.detail.selectedRoom || 'Cualquiera'; // Asegúrate de que estos nombres coincidan con los nombres de las propiedades de tus detalles del evento
  const beds = event.detail.selectedBed || 'Cualquiera';
  const baths = event.detail.selectedBath || 'Cualquiera';

  // Filtra primero por precio
  let nuevosInmueblesFiltrados = PriceFilterService.filterByPrice(this.state.allInmuebles, minPrice, maxPrice);

  // Luego filtra por habitaciones, camas y baños
  nuevosInmueblesFiltrados = PriceFilterService.filterByRoomsBedsBaths(nuevosInmueblesFiltrados, rooms, beds, baths);

  // Actualiza el estado con los inmuebles filtrados
  this.setState({
    inmueble: nuevosInmueblesFiltrados,
    minPrice,
    maxPrice,
    // Aquí asumimos que tienes estado para habitaciones, camas y baños también
    selectedRoom: rooms,
    selectedBed: beds,
    selectedBath: baths
  });
}


/*getProductos=async()=>{
  await axios.get('https://telossuite.amicornios.com/api/getinmuebles')
  .then(res=>{
      this.setState({inmueble: res.data});
      console.log(this.state.inmueble)
  }).catch((error)=>{
      console.log(error);
  });
}*/
// Dentro de la clase HomePage
getProductos = async () => {
  try {
    const response = await axios.get('https://telossuite.amicornios.com/api/getinmuebles');
    this.setState({
      allInmuebles: response.data, // Guarda la lista completa de inmuebles
      inmueble: response.data,     // Inicializa la lista filtrada igual a la completa
    });
  } catch (error) {
    console.log(error);
  }
}


  render() {
    const { favorites } = this.state;
    const { showLoginModal } = this.state;

    const inmueblesFavoritos = this.state.inmueble.filter((sitio) =>
    favorites.includes(sitio.idinmueble)
    );
    return (
      <>
        <body>
          <div className="verinm">
            {this.state.inmueble.map((sitio, index) => {

            const isFavorite = favorites.includes(sitio.idinmueble);

              return (
                <div className="InmueblesHost" key={sitio.id}>
                  <img
                    className="inmueble_fot"
                    src="https://picsum.photos/280/280"
                    alt="Inmueble"
                  />
                  <h3 className="inmueble_name">{sitio.tituloanuncio}</h3>
                  <div className="inmueble_info">
                    <p className="inmDet">{sitio.ciudad}</p> 
                    <p className="inmCamas">{sitio.camas}</p>
                    <p className="inmPrecio">{sitio.precio}</p>
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
                    <favoritos favorites={this.state.inmueblesFavoritos} />

                </div>
              )
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
<div className="favorites-list">
            <h2>Favoritos:</h2>
            <ul>
              {inmueblesFavoritos.map((sitio) => (
                <li key={sitio.idinmueble}>{sitio.tituloanuncio}</li>
              ))}
            </ul>
          </div>
        </body>
        <Outlet />
      </>
    );
  }
}

export default HomePage;