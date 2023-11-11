import React, {Component} from 'react';
import { Link, Outlet } from 'react-router-dom';
import {RiHomeSmileLine} from "react-icons/ri"
class NavbarReg extends Component{
    render(){
      return(
        <>
         <header>
            <div id='head'>
               <div id='head-izq'>
                </div>
                    
          
               <div id='navReg'>
               <div id = "logoT">
                  <i id='logoP'><RiHomeSmileLine/></i>
                  </div>
                    
                  <div id = 'logoL'>
                  <a id="TelosSuite">TelosSuite</a>
                  </div>
               </div>

               <div id='head-der'>
                </div>

            </div>
              <div id='navAbajo'>
              <div id='navRegs'>
              <div id="reg">Registro de inmueble</div>
                  </div>
                  
                  <div id='opt-nav'>
                  <Link to='/cliente'>CANCELAR</Link>
                  </div>
              </div>
           
        </header>
        <Outlet />
        </>
        
      );
    }
  }
  export default NavbarReg;