import React, {Component} from 'react';
import { Link, Outlet ,NavLink} from 'react-router-dom';
import {RiHomeSmileLine} from "react-icons/ri";
import { TbHomePlus } from "react-icons/tb";
import { ImExit } from "react-icons/im";
import { TbHomeQuestion } from "react-icons/tb";
import { TbHomeCheck } from "react-icons/tb";
import { HiOutlineHome } from "react-icons/hi";
import { PiHouseLine } from 'react-icons/pi';
import { FaMountainCity } from 'react-icons/fa6';
import HabilitarBoton from './habilitar/botonhabilitar';
class NavbarCli extends Component{
    render(){
      return(
        <>
         <header>

         <div id='head'>
               <div id='head-izq'>

               <div id="logoT">
              <i id="logoP">
                <RiHomeSmileLine />
              </i>
            </div>

            <div id="logoL">
              <a id="TelosSuite">TelosSuite</a>
              <a id="TS">TS</a>
            </div>
                </div>
                    
          
               <div id='navReg'>
                      <div id = "logoT">
                          <a id='ModoAnf'>Modo anfitrion</a>
                        </div>
                    
                        
               </div>

               <div id='head-der'>
              
               </div>

            </div>



            <div id="navAbajo">
          <div id="navs">
            <ul id="listaCat">
                                  <li id="cat">
                                <Link to="/cliente" >
                                  <div className="icon">
                                    <i id="logo-nav">
                                    <HiOutlineHome />
                                    </i>
                                  </div>
                                  Mis Inmuebles
                                </Link>
                                    </li>
                               <li id="cat">

                              <NavLink to="/cliente/Reservas"  activeClassName="active">
                              <div class="icon">
                                    <i id="logo-nav">
                                    <TbHomeCheck />
                                    </i>
                                  </div>
                                  Reservas
                              </NavLink>
                               </li>
                <li id="cat">
                  <NavLink to="/cliente/Solicitudes"  activeClassName="active">
                    <div class="icon">
                      <i id="logo-nav">
                      <TbHomeQuestion />
                      </i>
                    </div>
                    Solicitudes(0)
                  </NavLink>
                </li>
                <li id="cat">
                  <NavLink to="/registro"  activeClassName="active">
                    <div class="icon">
                      <i id="logo-nav">
                      <TbHomePlus />

                      </i>
                    </div>
                    Agregar inmueble
                  </NavLink>
                </li>
               
              <li id="cat">
                    <NavLink to="/"  activeClassName="active">
                      <div class="icon">
                        <i id="logo-nav">
                        <ImExit />
                        </i>
                      </div>
                      Salir
                    </NavLink>
                  </li>
              </ul>
          </div>
          <div id="opciones">
            
          </div>
        </div>
            
           
        </header>
        <Outlet />
        </>
        
      );
    }
  }
  export default NavbarCli;