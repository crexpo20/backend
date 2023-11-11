import "./registros.css"
import { useEffect , useContext, createContext } from "react";
import {useSpring, animated, useTransition} from "@react-spring/web";
import RegisterPage from "../../pages/RegisterPage";
import { AiOutlineCloseCircle } from 'react-icons/ai';
const ModalRegistroContext = createContext()
const cambia = (valor) => {
    // Aquí puedes hacer algo con el valor que recibes
    localStorage.setItem("destino", valor)
    
  };
const ModalRegistro = ({children, isOpen, onClose}) => {
     
   
    const modalTransition = useTransition(isOpen, {
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: {opacity: 1},
        config: {
            duration:400
        }
    })
    
    const springs = useSpring({
        opacity: isOpen ? 1:0,
        transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: {
            duration: 400
        }
    })
    return modalTransition( (styles,isOpen) => isOpen && (
        <animated.div style = {styles} className="react-modal-overlay" onClick={onClose}>
            <animated.div style={springs}className="react-modal-wrapper" onClick={e => e.stopPropagation()}>
                <div className="react-modalRegistro-content">
                    <ModalRegistroContext.Provider value={{onClose}}>
                        {children}
                    </ModalRegistroContext.Provider>
                   
                </div>
            </animated.div>
        </animated.div>
    )
    )
}

const DismissButtonRegistro = ({ children, className}) => {
    
    const{onClose} = useContext(ModalRegistroContext)
    return (
        <button type = "button"  className="btn-closed" onClick={onClose} >
            {children}
        </button>
      
    )
}

const ModalRegistroHeader = ({ children }) => {
    return (
        <div className="react-modal-header">
            <div className="react-modalRegistro-title">{children} Inicia sesión o regístrate</div>
            <DismissButtonRegistro className="btn-closed"><AiOutlineCloseCircle /></DismissButtonRegistro>
        </div>
    )
}

const ModalRegistroBody = ({children}) => {
    const{onClose} = useContext(ModalRegistroContext)
    return(
        <div className="react-modalResgistro-body">
            
            <RegisterPage/>
        </div>
    )
}

const ModalRegistroFooter = ({children}) => {
    return(
        <div className="react-modal-footer">
            {children}
        </div>
    )
}

ModalRegistro.Header = ModalRegistroHeader
ModalRegistro.Body = ModalRegistroBody
ModalRegistro.Footer = ModalRegistroFooter
ModalRegistro.DismissButton = DismissButtonRegistro
export default ModalRegistro;