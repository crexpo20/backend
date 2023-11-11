import "./busqueda.css"
import { useEffect , useContext, createContext } from "react";
import {useSpring, animated, useTransition} from "@react-spring/web";
import React, { useState } from "react";
const ModalBusquedaContext = createContext()

const ModalBusqueda = ({children, isOpen, onClose}) => {
     
   
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
            <animated.div style={springs}className="react-modal-wrapperH" onClick={e => e.stopPropagation()}>
                <div className="react-modal-content">
                    <ModalBusquedaContext.Provider value={{onClose}}>
                        {children}
                    </ModalBusquedaContext.Provider>
                   
                </div>
            </animated.div>
        </animated.div>
    )
    )
}

const DismissButton = ({ children, className}) => {
    
    const{onClose} = useContext(ModalBusquedaContext)
    return (
        <button type = "button"  className="btn-closed" onClick={onClose} >
            {children}
        </button>
      
    )
}

const ModalBusquedaHeader = ({ children }) => {
    
    return (
        <div className="react-modal-header">
            <div className="react-modal-title">{children}</div>
            <DismissButton className="btn-closed">&times;</DismissButton>
        </div>
    )
}


const ModalBusquedaBody = ({ onValuesChange }) => {
    const{onClose} = useContext(ModalBusquedaContext)
    const [adultos, setAdultos] = useState(localStorage.getItem("huespedes") || "");
    const [infantes, setInfantes] = useState(localStorage.getItem("niños") || "");
    const [mascotas, setMascotas] = useState(localStorage.getItem("mascotas") || "");
  
    const handleAdultosChange = (event) => {
      const newValue = event.target.value;
      setAdultos(newValue);
      console.log("Nuevo valor de adultos:", newValue);
    };
  
    const handleInfantesChange = (event) => {
      const newValue = event.target.value;
      setInfantes(newValue);
      console.log("Nuevo valor de infantes:", newValue);
    };
  
    const handleMascotasChange = (event) => {
      const newValue = event.target.value;
      setMascotas(newValue);
      console.log("Nuevo valor de mascotas:", newValue);
    };
  
    const handleButtonClick = () => {
      // Llamar a la función onValuesChange y pasar los valores
      onValuesChange(adultos, infantes, mascotas);
    };
  
    return (
      <div className="react-modal-body">
        <div id="body-huespedes">
          <div id="huesped-lista">
            <a id="huesped-a"> Adultos: </a>
            <input
              type="number"
              placeholder={localStorage.getItem("huespedes")}
              id="tentacles"
              name="tentacles"
              min="1"
              max="100"
              value={adultos}
              onChange={handleAdultosChange}
            />
          </div>
          <div id="huesped-lista">
            <a id="huesped-a"> Infantes: </a>
            <input
              type="number"
              placeholder={localStorage.getItem("niños")}
              id="tentacles"
              name="tentacles"
              min="0"
              max="100"
              value={infantes}
              onChange={handleInfantesChange}
            />
          </div>
          <div id="huesped-lista">
            <a id="huesped-a"> Mascotas: </a>
            <input
              type="number"
              placeholder={localStorage.getItem("mascotas")}
              id="tentacles"
              name="tentacles"
              min="0"
              max="100"
              value={mascotas}
              onChange={handleMascotasChange}
            />
          </div>
        </div>
        <button type = "button" onClick={()=>{handleButtonClick();onClose()}}>Aceptar</button>
      </div>
    );
  };

const ModalBusquedaFooter = ({children}) => {
    return(
        <div className="react-modal-footer">
            {children}
           
        </div>
    )
}

ModalBusqueda.Header = ModalBusquedaHeader
ModalBusqueda.Body = ModalBusquedaBody
ModalBusqueda.Footer = ModalBusquedaFooter
ModalBusqueda.DismissButton = DismissButton
export default ModalBusqueda;