import React, {Component} from 'react';
import {Route, Routes,Navigate} from "react-router-dom";
import '../App.css';
import Navbar from '../components/NavBar';
import { default as HomePage } from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import Tarija from '../pages/departamentos/Tarija'
import { default as ActualizarInm } from '../pages/ActualizarInm';
import { default as RegisterInmue } from '../pages/RegisterInmue';
import { default as EspaciosModAnf } from '../pages/EspaciosModAnf';
import NavbarCli from '../components/navBarCli';
import Donde from '../pages/modalWhere';
import { Switch } from 'antd';
import Pando from '../pages/departamentos/Pando';
import Beni from '../pages/departamentos/Beni';
import SantaCruz from '../pages/departamentos/SantaCruz';
import Cochabamba from '../pages/departamentos/Cochabamba';
import Sucre from '../pages/departamentos/Sucre';
import Oruro from '../pages/departamentos/Oruro';
import Potosi from '../pages/departamentos/Potosi';
import LaPaz from '../pages/departamentos/LaPaz';
import Busqueda from '../pages/ElementosNav/Busqueda';
import VistaDetalladaInm from '../pages/VistaDetalladaInm';
import NavbarReg from '../components/navReg';
import Habilitar from '../pages/Habilitar';
import Casa from '../pages/ElementosNav/Casa';
import Habitacion from '../pages/ElementosNav/Habitacion';
import Cabaña from '../pages/ElementosNav/Cabaña';
import Departamento from '../pages/ElementosNav/Departamento';
import ReservaInm from '../pages/ReservaInm';
import PagoBanco from '../pages/PagoBanco';
import ConfirmacionPago from '../pages/ConfirmacionPago';
import Favorito from '../pages/Favorito';
import Reservas from '../pages/ModoAnf/reservas';
import Solicitudes from '../pages/ModoAnf/solicitudes';
import ListaReserva from '../pages/ModoHuesped/ListaReserva';


class AppRouter extends Component{
  render(){
   
    
    return(
      <>
      <Routes>
    
      <Route path= "/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='dashboard' element={<DashboardPage />} />
          <Route path='home' element={<HomePage />} />
          <Route path='Tarija' element={<Tarija />} />
          <Route path='Pando' element={<Pando />} />
          <Route path='Beni' element={<Beni />} />
          <Route path='Santa Cruz' element={<SantaCruz />} />
          <Route path='Cochabamba' element={<Cochabamba />} />
          <Route path='Sucre' element={<Sucre />} />
          <Route path='Oruro' element={<Oruro/>} />
          <Route path='Potosi' element={<Potosi />} />
          <Route path='La Paz' element={<LaPaz />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='busqueda' element={<Busqueda />} />
          <Route path='Casa' element={<Casa />} />
          <Route path='Departamento' element={<Departamento />} />
          <Route path='Cabaña' element={<Cabaña />} />
          <Route path='Habitacion' element={<Habitacion />} />
          <Route path='*' element={<Navigate TO ="/"/>}/> 
          <Route path='favorito' element={<Favorito />} />
          <Route path='/mis-reservas' element={<ListaReserva />} />
          <Route path='Reserva' element={<ReservaInm />} />
          <Route path='Pago' element={<PagoBanco />} />
          <Route path='Confirmar' element={<ConfirmacionPago />} />
          

      </Route>

      <Route path= "/vistaInm" element={<NavbarReg/>}>
      <Route index element={<VistaDetalladaInm />} />
      </Route>
      <Route path= "/cliente" element={<NavbarCli />}>
            <Route index element={<EspaciosModAnf />} />
            <Route path='/cliente/Reservas' element={<Reservas/>} />
            <Route path='/cliente/Solicitudes' element={<Solicitudes/>} />
            
            <Route path='*' element={<Navigate TO ="/"/>}/> 
      </Route>

      <Route path= "/user" element={<Navbar />}>
            <Route index element={<EspaciosModAnf />} />
            <Route path= "/user/:espaciosID" element ={<VistaDetalladaInm  />}/>
            
            <Route path='inm' element={<ActualizarInm />} />
            <Route path="/user/registerinmue" element={<RegisterInmue />} />
            <Route path='dashboard' element={<DashboardPage />} />
            <Route path='hh' element={<Habilitar />} />
            
            <Route path='*' element={<Navigate TO ="/"/>}/> 
      </Route>

      <Route path= "/vistaInm" element={<Navbar />}>
            <Route index element={<EspaciosModAnf />} />
            <Route path= "/vistaInm/:espaciosID" element ={<VistaDetalladaInm  />}/>
      </Route>

      <Route path= "/Reserva" element={<Navbar />}>
            <Route index element={<EspaciosModAnf />} />
            <Route path= "/Reserva/:espaciosID" element ={<ReservaInm  />}/>
      </Route>
      <Route path= "/Pago" element={<Navbar />}>
            <Route index element={<EspaciosModAnf />} />
            <Route path= "/Pago/:espaciosID" element ={<PagoBanco  />}/>
      </Route>
      <Route path= "/Confirmar" element={<Navbar />}>
            <Route index element={<EspaciosModAnf />} />
            <Route path= "/Confirmar/:espaciosID" element ={<ConfirmacionPago  />}/>
      </Route>
      
      <Route path= "/registro" element={<RegisterInmue/>}>
           

            
             
            <Route path='*' element={<Navigate TO ="/"/>}/> 
      </Route>


      <Route>
      <Route path='register' element={<RegisterPage />} />
      </Route>
        

      
      </Routes>
      </>
    );
  }
}
export default AppRouter;