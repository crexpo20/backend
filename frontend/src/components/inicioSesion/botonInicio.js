import { useState } from "react";
import ModalInicio from "./inicio";
 function InicioBoton(){

    const [openModal, setOpenModal] = useState(false)
   
    

     
   
    return(
        <>
         <button  id="Lugar" onClick={() => setOpenModal(!openModal)}>
          inicio
        </button>
        <ModalInicio isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalInicio.Header> Iniciar Sesion </ModalInicio.Header>
        <ModalInicio.Body >
        </ModalInicio.Body>
        <ModalInicio.Footer>
            
        </ModalInicio.Footer>
        </ModalInicio>
        </>
    )
 }

 export default InicioBoton;
