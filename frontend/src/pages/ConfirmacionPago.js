import React, {Component} from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../CSS/ConfirmacionPago.css';
import iconoWhatsapp from '../iconos/iconoWhatsapp.png';


class ConfirmacionPago extends Component{


    render(){
      return(
        <>
           
                <div className='InfHostInm'>
                    <div className='InfHost'>
                    <h1 className='TituloInfHost'>Informacion del Anfitrión</h1>
                    <div className='Inf1'>
                        <label htmlFor='Telefono'>Teléfono del Anfitrión:</label>
                        <button
                        className="telefono-btn"
                        onClick={() => window.location.href = 'https://wa.me/59170348378'}
                        >
                        <img src={iconoWhatsapp} alt="Whatsapp" />
                        </button>
                    </div>
                    </div>
                    <br></br>
                    <div className='InfInm'>
                    <h1 className='TituloInfHost'>Informacion del Inmueble</h1>
                        <label htmlFor='Ubi'>Ubicación del inmueble:</label>
                    </div>
                </div>
            
         <Outlet />
         
        </>
        
      );
    }
  }
  export default ConfirmacionPago;