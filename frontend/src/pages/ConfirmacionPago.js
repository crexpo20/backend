import React, {Component} from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/ConfirmacionPago.css';
import iconoWhatsapp from '../iconos/iconoWhatsapp.png';
import MapaConfirmar from '../pages/MapaConfirmar.js';
import credentials from '../pages/credentials.js';
function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ConfirmacionPago extends Component{
  constructor(props) {
    super(props);
    this.state = {
      inmueble: {},
      anfitrion: {},
      showFechaModal: false,
      showHuespedModal: false,
    };

    this.getInmuebles = this.getInmuebles.bind(this);
  }

  componentDidMount() {
    const id = this.props.params.espaciosID;
    this.getInmuebles();
  }

  getInmuebles = async () => {
    try {
      const response = await axios.get(`https://telossuite.amicornios.com/api/getinmuebles/${this.props.params.espaciosID}`);
      const anfitriondata = await axios.get(`https://telossuite.amicornios.com/api/getusuario/${response.data.idusuario}`);
      this.setState({ inmueble: response.data, anfitrion: anfitriondata.data });
    } catch (error) {
      console.log(error);
    }
  };

    render(){

      const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`;
      const whatsappLink = `https://wa.me/${this.state?.anfitrion?.telefono}`;
      return(
        <>
           
                <div className='InfHostInm'>
                    <div className='InfHost'>
                    <h1 className='TituloInfHost'>Informacion del Anfitrión</h1>
                    <div className='Inf1'>
                        <label htmlFor='Telefono'>Teléfono del Anfitrión:</label>
                        <button
                          className="telefono-btn"
                          onClick={() => window.location.href = whatsappLink}
                        >
                          <img src={iconoWhatsapp} alt="Whatsapp" />
                        </button>
                    </div>
                    </div>
                    <br></br>
                    <div className='InfInm'>
                    <h1 className='TituloInfHost'>Informacion del Inmueble</h1>
                        <label htmlFor='Ubi'>Ubicación del inmueble:</label>
                        <div className='GridMapa'>
                          <div className='MapaGoogle'>
                            <MapaConfirmar 
                              googleMapURL={mapURL}
                              containerElement={<div style={{ height: '150%' }}></div>}
                              mapElement={<div style={{ height: '100%' }}></div>}
                              loadingElement={<p>Cargando..</p>}
                              lat={this.state?.inmueble?.latitud}
                              lng={this.state?.inmueble?.longitud}
                            />

                          </div>
                        </div>
                    </div>
                </div>
            
         <Outlet />
         
        </>
        
      );
    }
  }
  export default withParams(ConfirmacionPago);