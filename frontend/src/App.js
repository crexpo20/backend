import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { default as AppRouter } from './router/AppRouter';

function App() {
  // Estado local para almacenar los datos del localStorage
  const [localStorageData, setLocalStorageData] = useState({
    destino: "CualquierLUgar",
    huespedes: 1,
    niños: 1,
    mascotas: 1,
    tipo: "cualquiera",
    precioMinimo: 50,
    precioMaximo: 200,
    fechaInicio: "vacio",
    fechaFin: "alalal",
    camas: 1,
    servicios: "ninguno",
    calificacion: 0,
    baños:1,
    habitaciones:1,
    wifi:0,
    parqueo:0,
    cocina:0,
    refrigerador:0,
    lavaropa:0,
    piscina:0,
    privado:1,
    compartido:1,
    anfitrion:0,
    userID:0,
  });

  // Función para establecer valores iniciales en el localStorage si no existen
  const setInitialLocalStorageValues = () => {
    // Verifica si los valores ya existen en el localStorage
    const destino = localStorage.getItem('destino');
    const huespedes = localStorage.getItem('huespedes');
    const niños = localStorage.getItem('niños');
    const mascotas = localStorage.getItem('mascotas');
    const tipo = localStorage.getItem('tipo');
    const precioMinimo = localStorage.getItem('precioMinimo');
    const precioMaximo = localStorage.getItem('precioMaximo');
    const fechaInicio = localStorage.getItem('fechaInicio');
    const fechaFin = localStorage.getItem('fechaFin');
    const extra = localStorage.getItem('extra');
    const baños = localStorage.getItem('baños');
    const habitaciones = localStorage.getItem('habitaciones');
    const wifi = localStorage.getItem('wifi');
    const parqueo = localStorage.getItem('parqueo');
    const cocina = localStorage.getItem('cocina');
    const refrigerador = localStorage.getItem('refrigerador');
    const lavaropa = localStorage.getItem('lavaropa');
    const piscina= localStorage.getItem('piscina');
    const privado = localStorage.getItem('privado');
    const compartido = localStorage.getItem('compartido');
    const init = localStorage.getItem('init');
    const anfitrion = localStorage.getItem('anfitrion');
    const userID = localStorage.getItem('userID');

    // Si algún valor no existe en el localStorage, configura los valores iniciales
    if (destino === null) {
      localStorage.setItem('destino', 'CualquierLUgar');
    }
    if (huespedes === null) {
      localStorage.setItem('huespedes', 1);
    }
    if (niños === null) {
      localStorage.setItem('niños', 1);
    }
    if (mascotas === null) {
      localStorage.setItem('mascotas', 1);
    }
    if (tipo === null) {
      localStorage.setItem('tipo', 'cualquiera');
    }
    if (precioMinimo === null) {
      localStorage.setItem('precioMinimo', 50);
    }
    if (precioMaximo === null) {
      localStorage.setItem('precioMaximo', 200);
    }
    if (fechaInicio === null) {
      localStorage.setItem('fechaInicio', 'vacio');
    }
    if (fechaFin === null) {
      localStorage.setItem('fechaFin', 'alalal');
    }
    if (extra === null) {
      localStorage.setItem('extra', 'valorPorDefecto'); // Aquí puedes configurar el valor por defecto para "extra"
    }
    if (baños === null) {
      localStorage.setItem('baños', 0);
    }
    if (habitaciones === null) {
      localStorage.setItem('habitaciones', 0);
    }
    if (wifi === null) {
      localStorage.setItem('wifi', 0);
    }
    if (parqueo === null) {
      localStorage.setItem('parqueo', 0);
    }
    if (cocina === null) {
      localStorage.setItem('cocina', 0);
    }
    if (refrigerador === null) {
      localStorage.setItem('refrigerador', 0);
    }
    if (lavaropa === null) {
      localStorage.setItem('lavaropa', 0);
    }
    if (piscina === null) {
      localStorage.setItem('piscina', 0);
    }
    if (privado === null) {
      localStorage.setItem('privado', 0);
    }
    if (compartido === null) {
      localStorage.setItem('compartido', 0);
    }

    if (init === null) {
      localStorage.setItem('init', 0);
    }
    if (anfitrion === null) {
      localStorage.setItem('anfitrion', 0);
    }
    if (userID === null) {
      localStorage.setItem('userID', 0);
    }
    
  };

  // Restablecer valores del localStorage al cerrar la página
  const handleBeforeUnload = () => {
    setInitialLocalStorageValues();
  };

  // Agregar un listener de eventos beforeunload
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Copiar los datos del localStorage al estado local cuando se carga la aplicación
  useEffect(() => {
    setInitialLocalStorageValues();

    const storedData = {
      destino: localStorage.getItem('destino') || "CualquierLUgar",
      huespedes: parseInt(localStorage.getItem('huespedes')) || 1,
      niños: parseInt(localStorage.getItem('niños')) || 0,
      mascotas: parseInt(localStorage.getItem('mascotas')) || 0,
      tipo: localStorage.getItem('tipo') || "cualquiera",
      precioMinimo: parseInt(localStorage.getItem('precioMinimo')) || 50,
      precioMaximo: parseInt(localStorage.getItem('precioMaximo')) || 200,
      fechaInicio: localStorage.getItem('fechaInicio') || "vacio",
      fechaFin: localStorage.getItem('fechaFin') || "alalal",
      camas: parseInt(localStorage.getItem('camas')) || 1,
      servicios: localStorage.getItem('servicios') || "ninguno",
      calificacion: parseFloat(localStorage.getItem('calificacion')) || 0,
      baños: parseInt(localStorage.getItem('baños')) || 0,
      habitaciones: parseInt(localStorage.getItem('habitaciones')) || 0,
      wifi: parseInt(localStorage.getItem('wifi')) || 0,
      parqueo: parseInt(localStorage.getItem('parqueo')) || 0,
      cocina: parseInt(localStorage.getItem('cocina')) || 0,
      refrigerador: parseInt(localStorage.getItem('refrigerador')) || 0,
      lavaropa: parseInt(localStorage.getItem('lavaropa')) || 0,
      piscina: parseInt(localStorage.getItem('piscina')) || 0,
      privado: parseInt(localStorage.getItem('privado')) || 0,
      compartido: parseInt(localStorage.getItem('compartido')) || 0,
      init: parseInt(localStorage.getItem('init')) || 0,
      anfitrion: parseInt(localStorage.getItem('anfitrion')) || 0,
      userID: parseInt(localStorage.getItem('userID')) || 0,

    };
    console.log("Valores en el localStorage:", storedData);

    setLocalStorageData(storedData);
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
