import { useState } from "react";
import ModalHabilitar from "./habilitar";
 function HabilitarBoton(){

    const [openModal, setOpenModal] = useState(false)
   
    

      const handleValuesChange = (adultos, infantes, mascotas,tipo) => {
        // Aquí puedes hacer lo que necesites con los valores
       
      };
   
    return(
        <>
         <button  id="activar-button" onClick={() => setOpenModal(!openModal)}>
          Activar modo anfitrion
        </button>
        <ModalHabilitar isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalHabilitar.Header> Activar MODO ANFITRION</ModalHabilitar.Header>
        <ModalHabilitar.Body onValuesChange={handleValuesChange}>
        </ModalHabilitar.Body>
        <ModalHabilitar.Footer>
        </ModalHabilitar.Footer>
        </ModalHabilitar>
        </>
    )
 }

 export default HabilitarBoton;
