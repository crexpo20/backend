import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/favorito.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import '../CSS/slick.css'

class Favorito extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      inmuebleDetails: {}
    };
  }

  componentDidMount() {
    const userID = localStorage.getItem('userID');

    axios.get(`https://telossuite.amicornios.com/api/getfavoritos/${userID}`)
      .then(response => {
        this.setState({ favorites: response.data });

        // Obtener detalles de cada inmueble favorito
        response.data.forEach(favorite => {
          axios.get(`https://telossuite.amicornios.com/api/getinmueble/${favorite.idinmueble}`)
            .then(res => {
              const { inmuebleDetails } = this.state;
              const updatedDetails = {
                ...inmuebleDetails,
                [favorite.idinmueble]: res.data
              };
              this.setState({ inmuebleDetails: updatedDetails });
              console.log(this.state.inmuebleDetails);
            })
            .catch(err => {
              console.error('Error al obtener detalles del inmueble:', err);
            });
        });
      })
      .catch(error => {
        console.error('Error al obtener favoritos:', error);
      });
  }

  render() {
    const { favorites, inmuebleDetails } = this.state;
    const carouselSettings = {
      
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:true
      
    };
    return (
      <div>
        <h6> Lista Favoritos</h6>
        {favorites.length > 0 ? (
          <table className="favorites-table"> 
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Ciudad</th>
              </tr>
            </thead>
            <tbody>
            {favorites.map(favorite => (
  <tr key={favorite.idinmueble}>
    {inmuebleDetails[favorite.idinmueble] && (
      <>
        <td>
          <Link to={`/cliente/${favorite.idinmueble}`} style={{ display: 'block' }}>
            {inmuebleDetails[favorite.idinmueble].tituloanuncio}
          </Link>
        </td>
        <td>
          <Link to={`/cliente/${favorite.idinmueble}`} style={{ display: 'block' }}>
            
            <div style={{ width: '200px', height: '100px' }}>
            <Slider {...carouselSettings}>
                      <div>
                        <img style={{ width: '210px', height: '130px' , padding: "17px"}} src={inmuebleDetails[favorite.idinmueble].imagen1} alt="Inmueble 1" />
                      </div>
                      <div>
                       <img style={{ width: '210px', height: '130px', padding: "17px" }} src={inmuebleDetails[favorite.idinmueble].imagen2} alt="Inmueble 2" />
                      </div>
                      <div>
                        <img style={{ width:'210px', height: '130px', padding: "17px"}} src={inmuebleDetails[favorite.idinmueble].imagen3} alt="Inmueble 1" />
                      </div>
                      <div>
                        <img style={{ width: '210px', height: '130px', padding: "17px" }} src={inmuebleDetails[favorite.idinmueble].imagen4} alt="Inmueble 1" />
                      </div>
                      <div>
                       <img style={{ width: '210px', height: '130px', padding: "17px" }} src={inmuebleDetails[favorite.idinmueble].imagen5} alt="Inmueble 1" />
                      </div>
                  </Slider> 
            </div>
           
              
          </Link>
        </td>
        <td>
          <Link to={`/cliente/${favorite.idinmueble}`} style={{ display: 'block' }}>
            {inmuebleDetails[favorite.idinmueble].ciudad}
          </Link>
        </td>
      </>
    )}
  </tr>
))}

            </tbody>
          </table>
        ) : (
          <p>No hay favoritos</p>
        )}
      </div>
    );
  }
}

export default Favorito;
