import "./menuestilos.css"
import { useEffect , useContext, createContext } from "react";
import {useSpring, animated, useTransition} from "@react-spring/web";
import React, { useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import RegistroBoton from "../registro/botonRegistro";
import HabilitarBoton from "../habilitar/botonhabilitar";
import axios from "axios";
const ModalMenuContext = createContext()

const ModalMenu = ({children, isOpen, onClose}) => {
     
   
    const modalTransition = useTransition(isOpen, {
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: {opacity: 1},
        config: {
            duration:100
        }
    })
    
    
    return modalTransition( (styles,isOpen) => isOpen && (
        <animated.div style = {styles} className="react-modalMenu-overlay" onClick={onClose}>
            <animated.div className="react-modalMenu-wrapper" onClick={e => e.stopPropagation()}>
                <div className="react-modalMenu-content">
                    <ModalMenuContext.Provider value={{onClose}}>
                        {children}
                    </ModalMenuContext.Provider>
                   
                </div>
            </animated.div>
        </animated.div>
    )
    )
}

const DismissButton = ({ children, className}) => {
    
    const{onClose} = useContext(ModalMenuContext)
    return (
        <button type = "button"  className="btn-closed" onClick={onClose} >
            {children}
            
       
        </button>
      
    )
}

const ModalMenuHeader = ({ children }) => {
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
      const idusuario = localStorage.getItem('userID');
  
      axios.get(`http://127.0.0.1:8000/api/getusuario/${idusuario}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener datos de usuario:', error);
        });
    }, []); // El segundo argumento [] asegura que esto se ejecute solo una vez
  
    const { onClose } = useContext(ModalMenuContext);
  
    return (
      <div className="react-modalMenu-header">
        <div className="react-modalMenu-title" style={{ display: "" }}>
          {children}
        </div>
  
        {parseInt(localStorage.getItem("init")) === 1 && (
         
            <button  id='nombreuser' >
              Usuario: {userData.nombre}
            </button>
           
        )}
      </div>
    );
  };
const ModalMenuBody = ({props}) => {
   function redirige(){
    <Link to="/cliente"></Link>
   }
    function cerrarSesion() {
        // Establecer la variable localStorage
        localStorage.setItem("init", "0");
        localStorage.setItem("anfitrion",0)
        // Recargar la página
        window.location.reload();
    }
    return (
      <div className="react-modalMenu-body">
        <div id="body-huespedes">
       
        {parseInt(localStorage.getItem("init") )=== 1 &&
         parseInt(localStorage.getItem("anfitrion") )=== 1  &&
        (
                       <ul id="lista-menu">

                            
                            
                            <li id="menu-item" >
                            <Link to='/cliente'>
                            <button  onClick={redirige}id='close-button' >
                            Modo Anfitrion </button>
                            </Link>
                            
                           </li>


                            
                            <li id="menu-item">
                            <button id='close-button' onClick={cerrarSesion}>Cerrar sesion</button>
                           
                             </li>
                        </ul>
                    ) 
         }
         {parseInt(localStorage.getItem("init") )=== 1 &&
         parseInt(localStorage.getItem("anfitrion") )=== 0 &&
        (
                       <ul id="lista-menu">
                            <li id="menu-item" >
                                 Lista de Favoritos
                            </li>
                            <br></br>
                            <li id="menu-item" >
                                 Mis reservas
                            </li>
                            <li id="menu-item">
                            <HabilitarBoton></HabilitarBoton>
                             </li>
                             <li id="menu-item">
                            <button id='close-button' onClick={cerrarSesion}>Cerrar sesion</button>
                           
                             </li>
                        </ul>
                    ) 
         }
         
        
        </div>
          </div>
    );
  };

const ModalMenuFooter = ({children}) => {
    return(
        <div className="react-modalMenu-footer">
            {children}
           
        </div>
    )
}

ModalMenu.Header = ModalMenuHeader
ModalMenu.Body = ModalMenuBody
ModalMenu.Footer = ModalMenuFooter
ModalMenu.DismissButton = DismissButton
export default ModalMenu;