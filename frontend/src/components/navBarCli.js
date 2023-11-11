import React, {Component} from 'react';
import { Link, Outlet } from 'react-router-dom';
import {RiHomeSmileLine} from "react-icons/ri"
import HabilitarBoton from './habilitar/botonhabilitar';
class NavbarCli extends Component{
    render(){
      return(
        <>
         <header>
            <div id='head'>
               <div id='head-izq'>
                  <div id = "logoT">
                  <i id='logoP'><RiHomeSmileLine/></i>
                  </div>
                    
                  <div id = 'logoL'>
                  <a id="TelosSuite">TelosSuite</a>
                  </div>
                    
            
               </div>
               <div id='buscadorCliente'>
               </div>

               <div id='head-der'>
                  <nav>
                      
                     <HabilitarBoton></HabilitarBoton>
                      <Link to='/registro'>Agregar Espacio</Link>
                   
                  </nav>
                </div>
            </div>
              <div id='navAbajo'>
                  <div id='navDer'>
                      
                  </div>
                  <div id='opt-nav'>
                  <Link to='/'>Cerrar sesión</Link>
                  </div>
              </div>
           
        </header>
        <Outlet />
        </>
        
      );
    }
  }
  export default NavbarCli;