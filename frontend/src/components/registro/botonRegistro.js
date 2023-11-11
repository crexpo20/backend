import { useState } from "react";
import ModalRegistro from "./registro";
import "./registros.css"

 function RegistroBoton({ onClose }) {
    const [openModal, setOpenModal] = useState(false)
    return(
        <>
         <button id="Registro" onClick={() => setOpenModal(!openModal)} >
          Registrarse
        </button>
        <ModalRegistro isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalRegistro.Header> </ModalRegistro.Header>
        <ModalRegistro.Body>
         
        </ModalRegistro.Body>
        <ModalRegistro.Footer>
        </ModalRegistro.Footer>
        </ModalRegistro>
        </>
    )
 }

 export default RegistroBoton;