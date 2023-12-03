import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Modal from 'react-modal';
import { DatePicker, Space } from 'antd';
import '../CSS/estado.css'
import moment from 'moment';
import 'moment/locale/es'; 

const Estados = () => {
  const { inmuebleID } = useParams();
  const { RangePicker } = DatePicker;

  const [detallesInmueble, setDetallesInmueble] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fechas, setFechas] = useState([localStorage.getItem("fechaini"), localStorage.getItem("fechafin")]);

  const getDetallesInmueble = async () => {
    try {
      const response = await axios.get(`https://telossuite.amicornios.com/api/getinmueble/${inmuebleID}`);
      setDetallesInmueble(response.data);
    } catch (error) {
      console.error('Error al obtener detalles del inmueble:', error);
    }
  };

  useEffect(() => {
    getDetallesInmueble();
  }, [inmuebleID]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDateChange = (dates, dateStrings) => {
    // dates es un array con las fechas seleccionadas
    // dateStrings es un array con las fechas en formato de cadena
    setFechas(dateStrings);
  };
  const cambiarEstado = async () => {
    // Imprimir las fechas seleccionadas en la consola
    const reservasResponse = await axios.get(`https://telossuite.amicornios.com/api/getreinmueble/${inmuebleID}`);
    const reservas = reservasResponse.data;
    const fechaInicioSeleccionada = new Date(fechas[0]);
    const fechaFinSeleccionada = new Date(fechas[1]);
    console.log('Fecha ini:', fechas[0]);
    console.log('Fecha fin:', fechas[1]);

    const inmuebleResponse = await axios.get(`https://telossuite.amicornios.com/api/getinmueble/${inmuebleID}`);
    const detallesInmueble = inmuebleResponse.data;

    const url = `https://telossuite.amicornios.com/api/putinmuebles/${inmuebleID}`;

    // Datos que se enviarán en la solicitud
    const datosReserva = {
        idinmueble: parseInt(inmuebleID),
      idusuario: detallesInmueble.idusuario,
      tipopropiedad: detallesInmueble.tipopropiedad,
      tituloanuncio: detallesInmueble.tituloanuncio,
      descripcion: detallesInmueble.descripcion,
      ubicacion: detallesInmueble.ubicacion,
      precio: detallesInmueble.precio,
      capacidad: detallesInmueble.capacidad,
      habitaciones: detallesInmueble.habitaciones,
      baños: detallesInmueble.baños,
      camas: detallesInmueble.camas,
      niños: detallesInmueble.niños,
      normas: detallesInmueble.normas,
      mascotas: detallesInmueble.mascotas,
      qr: detallesInmueble.qr,
      ciudad: detallesInmueble.ciudad,
      wifi: detallesInmueble.wifi,
      parqueo: detallesInmueble.parqueo,
      cocina: detallesInmueble.cocina,
      refrigerador: detallesInmueble.refrigerador,
      lavaropa: detallesInmueble.lavaropa,
      piscina: detallesInmueble.piscina,
      privado: detallesInmueble.privado,
      compartido: detallesInmueble.compartido,
      estado: detallesInmueble.estado,
      contacto: detallesInmueble.contacto,
      favorito: detallesInmueble.favorito,
      imagen1: detallesInmueble.imagen1,
      descripcion1: detallesInmueble.descripcion1,
      imagen2: detallesInmueble.imagen2,
      descripcion2: detallesInmueble.descripcion2,
      imagen3: detallesInmueble.imagen3,
      descripcion3: detallesInmueble.descripcion3,
      imagen4: detallesInmueble.imagen4,
      descripcion4: detallesInmueble.descripcion4,
      imagen5: detallesInmueble.imagen5,
      descripcion5: detallesInmueble.descripcion5,
      latitud: detallesInmueble.latitud,
      longitud: detallesInmueble.longitud,
      pausado: 1,
      fechainicio: fechas[0], // Utilizar la fecha de inicio seleccionada
      fechafin: fechas[1], // Utilizar la fecha de fin seleccionada
      created_at: detallesInmueble.created_at,
      updated_at: detallesInmueble.updated_at,

      // Puedes agregar más propiedades según tu necesidad
    };

    
    const reservaCoincidente = reservas.find((reserva) => {
      const fechaInicioReserva = new Date(reserva.fechaini);
      const fechaFinReserva = new Date(reserva.fechafin);
  
      return (
       ( (fechaInicioSeleccionada >= fechaInicioReserva && fechaInicioSeleccionada <= fechaFinReserva) ||
        (fechaFinSeleccionada >= fechaInicioReserva && fechaFinSeleccionada <= fechaFinReserva) ||
        (fechaInicioReserva >= fechaInicioSeleccionada && fechaInicioReserva <= fechaFinSeleccionada) ||
        (fechaFinReserva >= fechaInicioSeleccionada && fechaFinReserva <= fechaFinSeleccionada) ) 
        && reserva.estado === "aceptado"
      );
    });

  if (reservaCoincidente) {
    // Mostrar un modal que indique que las fechas coinciden con una reserva
    console.log(reservaCoincidente);
    console.log('Las fechas coinciden con una reserva. Mostrar modal.');
    await Swal.fire({
      icon: 'warning',
      title: '¡Atención!',
      text: 'Este inmueble tiene una reserva entre las fechas que seleccionaste, porfavor elige otro rango de fechas.',
    });
    return;
  }else{
    console.log(reservaCoincidente);
    const postNegocio = async (url, newNego) => {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(newNego),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
    
      // Agregar un retraso de 1 segundo entre las solicitudes
      await new Promise(resolve => setTimeout(resolve, 1000));
    
      return response;
    };
    
    const respuestaJson = postNegocio(url, datosReserva);

    console.log("Response:------> " + (await respuestaJson).status);
    console.log(datosReserva)



    

    // Aquí puedes enviar una solicitud para cambiar el estado
    // Puedes usar detallesInmueble.id para obtener el ID del inmueble
    // y fechas para obtener las fechas seleccionadas
    console.log('Estado cambiado');
    closeModal();
    await Swal.fire({
      icon: 'success',
      title: '¡Hecho!',
      text: 'Este inmueble no se podrá reservar del ' + fechas[0] + ' al ' + fechas[1]+ '.',
    });
  };
  }
  const disabledDate = current => {
 
    const fechaActual = moment().startOf('day');
  
    return current && current < fechaActual;
  };

  const esFechaEnRango = () => {
    const fechaInicio = new Date(detallesInmueble.fechainicio);
    const fechaFin = new Date(detallesInmueble.fechafin);
    const fechaHoy = new Date();

    return fechaHoy >= fechaInicio && fechaHoy <= fechaFin;
  };

  return (
    <div className="detailsContainer">
    <h4>ID del inmueble: {inmuebleID}</h4>
    {detallesInmueble && (
      <h4>Nombre del Inmueble: {detallesInmueble.tituloanuncio}</h4>
    )}
    {detallesInmueble && (
      <>
        {esFechaEnRango() ? (
          <p>Estado del inmueble: <b>PAUSADO</b></p>
        ) : (
          <p>Estado del inmueble: <b>ACTIVO</b></p>
        )}
        <button onClick={openModal}>Cambiar Estado</button>
      </>
    )}


      <Modal
      className="ModalContent"
      overlayClassName="ModalOverlay"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Cambiar Estado Modal"
      > 
   
  <div className="ModalTitle">
    <h2>Elije un rango de fechas</h2>
    <h2>para pausar el inmueble</h2>
  </div>
  <div className="DatePickerContainer">
    <Space direction="vertical" size={12}>
    <RangePicker
      placeholder={fechas}
      style={{ border: 'none', color: 'black' }}
      onChange={handleDateChange}
      disabledDate={disabledDate}
      />
      <div className="ButtonContainer">
        <button className="SaveButton" onClick={cambiarEstado}>Guardar pausa</button>
        <button className="CancelButton" onClick={closeModal}>Cerrar</button>
      </div>
    </Space>
  </div>
</Modal>

    </div>
  );
};

export default Estados;