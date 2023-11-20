import React, {Component} from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/ReservaInmueble.css';
import {IoIosArrowDropleftCircle } from 'react-icons/io';
import Fechas from '../components/fechas';
import CuantosBoton from '../components/cuantos/botoncuantos';

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
  }
class ReservaInm extends Component{
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
    
      openFechaModal = () => {
        this.setState({ showFechaModal: true });
      };
    
      closeFechaModal = () => {
        this.setState({ showFechaModal: false });
      };
    
      openHuespedModal = () => {
        this.setState({ showHuespedModal: true });
      };
    
      closeHuespedModal = () => {
        this.setState({ showHuespedModal: false });
      };

    render(){
      return(
        <>
            <div className='Grid1'>
                <Link to={`/vistaInm/${this.state?.inmueble?.idinmueble}`} className='BotonAnterior'>
                <IoIosArrowDropleftCircle size={30} />
                </Link>
                <h1 className='TituloReserva'>Confirma y paga</h1>
            </div>
            <div className='Grid2'>
                <div className='Colum1'>
                    <h2>Tu viaje</h2>
                    <div className='Fechas'>
                        <div>
                            <div className='fecha'>
                                <h3>Fechas</h3>
                                <button onClick={this.openFechaModal}>Edita</button>
                            </div>
                            <h4>18 - 23 de nov</h4>
                        </div>
                    </div>
                    <div className='Huespedes'>
                            <div className='huesped'>
                            <h3>Huéspedes</h3>
                            <button onClick={this.openHuespedModal}>Edita</button>
                            </div>
                        <h4>1 huésped</h4>
                    </div>
                </div>
                <div className='Colum2'>
                    <div className="InformacionPrecio">
                        <h5>{this.state?.inmueble?.tipopropiedad} en {this.state?.inmueble?.ciudad} - {this.state?.inmueble?.tituloanuncio}</h5>
                        <div className="divisor-plomo"></div>
                        <h2>Información del precio</h2>
                        <div className='total'>
                            <h4>Bs. 30 x 5 noches</h4>
                            <h4>Total a pagar Bs. 150</h4>
                        </div>
                        <div>
                        <Link to={`/Pago/${this.state?.inmueble?.idinmueble}`}>
                            <button className="reserva-button">
                            Pagar ahora
                            </button>
                        </Link>
                        </div>
                    </div>

                </div>
            </div>
            
         <Outlet />
         {this.state.showFechaModal && (
            <div className="modalReserva">
                <div className="modal-content-reserva">
                <span className="closeReserva" onClick={this.closeFechaModal}>
                    &times;
                </span>
                <li id="prim" className='FechaReserva'><Fechas /></li>
                <br></br>
                <Link to='/Reserva'>
                    <button className="guardar-button">
                    Guardar cambios
                    </button>
                </Link>
                </div>
            </div>
            )}

            {this.state.showHuespedModal && (
            <div className="modalReserva">
                <div className="modal-content-reserva">
                <span className="closeReserva" onClick={this.closeHuespedModal}>
                    &times;
                </span>
                <li><CuantosBoton /></li>
                <br></br>
                <Link to='/Reserva'>
                    <button className="guardar-button">
                    Guardar cambios
                    </button>
                </Link>
                </div>
            </div>
            )}
        </>
        
      );
    }
  }
  export default withParams(ReservaInm);
