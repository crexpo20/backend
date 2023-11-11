import "./habilitar.css"
import { useEffect , useContext, createContext } from "react";
import {useSpring, animated, useTransition} from "@react-spring/web";
import React, { useState } from "react";
import Habilitar from "../../pages/Habilitar";
const ModalHabilitarContext = createContext()

const ModalHabilitar = ({children, isOpen, onClose}) => {
     
   
    const modalTransition = useTransition(isOpen, {
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: {opacity: 1},
        config: {
            duration:100
        }
    })
    
    const springs = useSpring({
        opacity: isOpen ? 1:0,
        transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: {
            duration :100
        }
    })
    return modalTransition( (styles,isOpen) => isOpen && (
        <animated.div style = {styles} className="react-modalHabilitar-overlay" onClick={onClose}>
            <animated.div style={springs}className="react-modalHabilitar-wrapper" onClick={e => e.stopPropagation()}>
                <div className="react-modal-content">
                    <ModalHabilitarContext.Provider value={{onClose}}>
                        {children}
                    </ModalHabilitarContext.Provider>
                   
                </div>
            </animated.div>
        </animated.div>
    )
    )
}

const DismissButton = ({ children, className}) => {
    
    const{onClose} = useContext(ModalHabilitarContext)
    return (
        <button type = "button"  className="btn-closed" onClick={onClose} >
            {children}
        </button>
      
    )
}

const ModalHabilitarBody = ({ onValuesChange }) => {
    const { onClose } = useContext(ModalHabilitarContext);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
  
    function cerrarSesion() {
        // Establecer la variable localStorage
        localStorage.setItem("init", "1");
    
        // Recargar la página
        window.location.reload();
    }

    const handleLogin = (e) => {
      e.preventDefault();
      // Aquí puedes realizar la lógica de habilitar de sesión
      // Puedes acceder a los valores del formulario y llamar a onValuesChange si es necesario
      // También puedes cerrar el modal después de un habilitar de sesión exitoso llamando a onClose
      onClose(); // Cierra el modal
    };
   
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      return (
        <Habilitar></Habilitar>
      );
    };
    
    
    
    

const ModalHabilitarHeader = ({ children }) => {
    
    return (
        <div className="react-modalHabilitar-header">
            <div className="react-modalHabilitar-title">Activar MODO ANFITRION</div>
            <DismissButton className="btn-closed">&times;</DismissButton>
        </div>
    )
}




const ModalHabilitarFooter = ({children}) => {
    return(
        <div className="react-modal-footer">
            {children}
           
        </div>
    )
}

ModalHabilitar.Header = ModalHabilitarHeader
ModalHabilitar.Body = ModalHabilitarBody
ModalHabilitar.Footer = ModalHabilitarFooter
ModalHabilitar.DismissButton = DismissButton
export default ModalHabilitar;