import { useState } from "react";
import ModalBusqueda from "./busqueda.js";
 function BusquedaBoton(){

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

      const handleValuesChange = (adultos, infantes, mascotas) => {
        // Aquí puedes hacer lo que necesites con los valores
        console.log("Valores cambiados: adultos:", adultos, "infantes:", infantes, "mascotas:", mascotas);
        localStorage.setItem("huespedes",adultos)
        localStorage.setItem("niños", infantes)
        localStorage.setItem("mascotas",mascotas)
      };
   
    return(
        <>
         <button  id="Lugar" onClick={() => setOpenModal(!openModal)}>
          {cambiar()}
        </button>
        <ModalBusqueda isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalBusqueda.Header> Elije la cantidad de huespedes </ModalBusqueda.Header>
        <ModalBusqueda.Body onValuesChange={handleValuesChange}>
        </ModalBusqueda.Body>
        <ModalBusqueda.Footer>
        </ModalBusqueda.Footer>
        </ModalBusqueda>
        </>
    )
 }

 export default BusquedaBoton;