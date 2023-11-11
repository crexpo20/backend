import React, { useState } from "react";
import ModalMenu from "./menu";
import ModalInicio from "../inicioSesion/inicio";
import ModalRegistro from "../registro/registro";
import { AiOutlineMenu } from "react-icons/ai";

function MenuBoton() {
    const [openModal, setOpenModal] = useState(false); // Controla el modal de menú
    const [openRegistroModal, setOpenRegistroModal] = useState(false); // Controla el modal de registro
    const [openInicioModal, setOpenInicioModal] = useState(false);


   
    // Función para abrir el modal de registro y cerrar el modal de menú
    const openRegistroAndCloseMenu = () => {
        setOpenRegistroModal(true);
        setOpenModal(false);
    };
    

    const openInicioAndCloseMenu = () => {
      setOpenInicioModal(true);
      setOpenModal(false);
  };
    return (
        <>
            <button id="btn-menu" onClick={() => setOpenModal(!openModal)}>
                <div id="elementosmenu">
                    <div id="elemento">Menú</div>
                    <div id="elemento">
                        <AiOutlineMenu />
                    </div>
                </div>
            </button>

            <ModalMenu isOpen={openModal} onClose={() => setOpenModal(false)}>
                <ModalMenu.Header onClose={() => setOpenModal(false)}>
                {parseInt(localStorage.getItem("init") )=== 0 &&(
                       <ul id="lista-menu">
                             <li id="menu-item" >
                             <button  id='ini-button' onClick={openInicioAndCloseMenu}>Iniciar Sesión</button>
        
                            </li>
                        
                        </ul>
                    ) 
                    }
                  {parseInt(localStorage.getItem("init") )=== 0 &&(
                       <ul id="lista-menu">
                        
                            <li id="menu-item" >
                                <button id="reg-button" onClick={openRegistroAndCloseMenu}>Registro</button>
           
                            </li>
                        </ul>
                    ) 
                    }
                 </ModalMenu.Header>
                <ModalMenu.Body onClose={() => setOpenModal(false)}>
                
                </ModalMenu.Body>
                <ModalMenu.Footer>
                </ModalMenu.Footer>
            </ModalMenu>

            {/* Renderiza el modal de registro con su estado correspondiente */}
            <ModalRegistro isOpen={openRegistroModal} onClose={() => setOpenRegistroModal(false)}>
                <ModalRegistro.Header> </ModalRegistro.Header>
                <ModalRegistro.Body>
                    {/* Contenido del modal de registro */}
                </ModalRegistro.Body>
                <ModalRegistro.Footer>
                    {/* Contenido del pie del modal de registro */}
                </ModalRegistro.Footer>
            </ModalRegistro>
            {openInicioModal && (
    <ModalInicio isOpen={openInicioModal} onClose={() => setOpenInicioModal(false)}>
        <ModalInicio.Header> </ModalInicio.Header>
        <ModalInicio.Body  />
        <ModalInicio.Footer />
    </ModalInicio>
)}

        </>
    );
}

export default MenuBoton;


