import { useState } from "react";
import ModalCuantos from "./cuantos";
 function CuantosBoton(){

    const [openModal, setOpenModal] = useState(false)
    let huespedes;
  
    function cambiar() {
        
        if (localStorage.getItem("huespedes") === "1") {
            
          huespedes = "¿Cuántos?"
          return huespedes
        } else {
            huespedes = "Huéspedes"
            return huespedes
          // Realizar acciones si 'huespedes' no es igual a "0"
         
        }
      }

      const handleValuesChange = (adultos, infantes, mascotas,tipo) => {
        // Aquí puedes hacer lo que necesites con los valores
        console.log("Valores cambiados: adultos:", adultos, "infantes:", infantes, "mascotas:", mascotas, "tipo", tipo);
        localStorage.setItem("huespedes",adultos)
        localStorage.setItem("niños", infantes)
        localStorage.setItem("mascotas",mascotas)
        localStorage.setItem("tipo", tipo)
      };
   
    return(
        <>
         <button  id="Lugar" onClick={() => setOpenModal(!openModal)}>
          {cambiar()}
        </button>
        <ModalCuantos isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalCuantos.Header> Elije la cantidad de huespedes </ModalCuantos.Header>
        <ModalCuantos.Body onValuesChange={handleValuesChange}>
        </ModalCuantos.Body>
        <ModalCuantos.Footer>
        </ModalCuantos.Footer>
        </ModalCuantos>
        </>
    )
 }

 export default CuantosBoton;