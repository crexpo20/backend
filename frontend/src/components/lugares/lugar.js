import "./lugarestilos.css"
import { useEffect , useContext, createContext } from "react";
import {useSpring, animated, useTransition} from "@react-spring/web";
import {default as cbba } from "./imagenes/cbba.png"
import {default as sc } from "./imagenes/santacruz.png"
import {default as sucre } from "./imagenes/sucre.png"
import {default as pando } from "./imagenes/pando.png"
import {default as beni} from "./imagenes/beni.png"
import {default as potosi } from "./imagenes/potosi.png"
import {default as oruro} from "./imagenes/oruro.png"
import {default as tarija} from "./imagenes/tarija.png"
import {default as lapaz } from "./imagenes/lp.png"
import {default as RegisterPage} from '../../pages/RegisterPage.js'
const ModalLugarContext = createContext()
const cambia = (valor) => {
    // Aquí puedes hacer algo con el valor que recibes
    localStorage.setItem("destino", valor)
    
  };
const ModalLugar = ({children, isOpen, onClose}) => {
     
   
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
        <animated.div style = {styles} className="react-modal-overlay" onClick={onClose}>
            <animated.div style={springs}className="react-modal-wrapper" onClick={e => e.stopPropagation()}>
                <div className="react-modalLugar-content">
                    <ModalLugarContext.Provider value={{onClose}}>
                        {children}
                    </ModalLugarContext.Provider>
                   
                </div>
            </animated.div>
        </animated.div>
    )
    )
}

const DismissButton = ({ children, className}) => {
    
    const{onClose} = useContext(ModalLugarContext)
    return (
        <button type = "button"  className="btn-closed" onClick={onClose} >
            {children}
        </button>
      
    )
}

const ModalLugarHeader = ({ children }) => {
    return (
        <div className="react-modal-header">
            <div className="react-modalLugar-title">{children}</div>
            <DismissButton className="btn-closed">&times;</DismissButton>
        </div>
    )
}

const ModalLugarBody = ({children}) => {
    const{onClose} = useContext(ModalLugarContext)
    return(
        <div className="react-modal-body">
            {children}
            <div id="images">
            <img id="imagen"
                    src= {cbba}
                    width={150}
                    height={150}
                    onClick={() => {
                        cambia("Cochabamba");
                        onClose();
                      }}
                
            />
            <img    id="imagen"
                    src= {lapaz}
                    width={150}
                    height={150}
                    onClick={() => {
                        cambia("La Paz");
                        onClose();
                      }}
            />
            <img    id="imagen"
                    src= {sc}
                    width={150}
                    height={150}
                    onClick={() => {
                        cambia("Santa Cruz");
                        onClose();
                      }}
            />
            <img    id="imagen"
                    src= {pando}
                    width={150}
                    height={150}
                    onClick={() => {
                        cambia("Pando");
                        onClose();
                      }}
            />
            <img    id="imagen"
                    src= {beni}
                    width={150}
                    height={150}
                    onClick={() => {
                        cambia("Beni");
                        onClose();
                      }}
            />
            <img    id="imagen"
                    src= {potosi}
                    width={150}
                    height={150}
                    onClick={() => {
                        cambia("Potosi");
                        onClose();
                      }}
            />
            <img    id="imagen"
                    src= {sucre}
                    width={150}
                    height={150}
                    onClick={() => {
                        cambia("Sucre");
                        onClose();
                      }}
            />
            <img    id="imagen"
                    src= {oruro}
                    width={150}
                    height={150}
                    onClick={() => {
                        cambia("Oruro");
                        onClose();
                      }}
            />
            <img    id="imagen"
                    src= {tarija}
                    width={150}
                    height={150}
                    onClick={() => {
                        cambia("Tarija");
                        onClose();
                      }}
            />
         </div>
        </div>
    )
}

const ModalLugarFooter = ({children}) => {
    return(
        <div className="react-modal-footer">
            {children}
        </div>
    )
}

ModalLugar.Header = ModalLugarHeader
ModalLugar.Body = ModalLugarBody
ModalLugar.Footer = ModalLugarFooter
ModalLugar.DismissButton = DismissButton
export default ModalLugar;