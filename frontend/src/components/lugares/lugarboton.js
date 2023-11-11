import { useState } from "react";
import ModalLugar from "./lugar";
import "./lugarestilos.css"

 function LugarBoton(){
    const [openModal, setOpenModal] = useState(false)
    return(
        <>
         <button id="Lugar" onClick={() => setOpenModal(!openModal)}>
          {localStorage.getItem("destino")}
        </button>
        <ModalLugar isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalLugar.Header> Selecciona una cuidad</ModalLugar.Header>
        <ModalLugar.Body>
         
        </ModalLugar.Body>
        <ModalLugar.Footer>
        </ModalLugar.Footer>
        </ModalLugar>
        </>
    )
 }

 export default LugarBoton;