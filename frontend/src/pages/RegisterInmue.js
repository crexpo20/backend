import React, { Component, useState } from 'react';
import { BsHouse } from 'react-icons/bs';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { MdApartment } from 'react-icons/md';
import "./css/carrusel.css";
import {RiHomeSmileLine} from "react-icons/ri";
import { Link, Outlet,useNavigate  } from 'react-router-dom';
import {default as Subir} from './servicio-img';
import Swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import MapaRegistro from '../pages/MapaRegistro.js';
import credentials from '../pages/credentials.js';

const coordenadasDepartamentos = {
  'Santa Cruz': { lat: '-17.7892', lng: '-63.1807' },
  'La Paz': { lat: '-16.5000', lng: '-68.1500' },
  Cochabamba: { lat: '-17.3841', lng: '-66.1667' },
  Oruro: { lat: '-17.9833', lng: '-67.1500' },
  Potosí: { lat: '-19.5833', lng: '-65.7500' },
  Tarija: { lat: '-21.5355', lng: '-64.7296' },
  Sucre: { lat: '-19.0333', lng: '-65.2627' },
  Beni: { lat: '-14.8347', lng: '-64.9043' },
  Pando: { lat: '-11.0196', lng: '-68.7778' },
};


//let marker = {};

class RegisterInmue extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      currentSlide: 0,
      formData: {
        idanfitrion: 0,
        tipopropiedad: '',
        tituloanuncio: '',
        descripcion: '',
        ubicacion: '',
        precio: 0,
        capacidad: 0,
        habitaciones: 0,
        banos: 0,
        camas: 0,
        niños: 0,
        normas: '',
        mascotas: 0,
        qr: '',
        ciudad: '',
        wifi: 0,
        parqueo: 0,
        cocina: 0,
        refrigerador: 0,
        lavaropa: 0,
        piscina: 0,
        compartido: 0,
        privado: 0,
        titleCharacterCount: 0,
        descriptionCharacterCount: 0,
        normasCharacterCount: 0,
        imagen1:"",
        descripcion1:"",
        imagen2:"",
        descripcion2:"",
        imagen3:"",
        descripcion3:"",
        imagen4:"",
        descripcion4:"",
        imagen5:"",
        descripcion5:"",
        latitud:"",
        longitud:"",
        pausado:0
      },
      markerLocation: {
        latitud: "",
        longitud: ""
      },
      
      propertyTypes: [
        { type: 'Casa', icon: <BsHouse /> },
        { type: 'Habitación', icon: <MdApartment /> },
        { type: 'Departamento', icon: <MdApartment /> },
        { type: 'Cabaña', icon: <MdApartment /> },
      ],
      options: [
        { key: 'niños', label: 'Niños', icon: <BsHouse />, value: 0 },
        { key: 'mascotas', label: 'Mascotas', icon: <MdApartment />, value: 0 },
      ],
      privacy: [
        { key: 'privado', label: 'Privado', icon: <BsHouse />, value: 0 },
        { key: 'compartido', label: 'Compartido', icon: <MdApartment />, value: 0 },
      ],
      cities: [
        'Cochabamba',
        'Santa Cruz',
        'La Paz',
        'Oruro',
        'Potosí',
        'Sucre',
        'Tarija',
        'Beni',
        'Pando',
      ],
      
    };
  }

  handleNextSlide = () => {
    if (this.state.currentSlide < 20) {
      this.setState(
        (prevState) => ({
          currentSlide: prevState.currentSlide + 1,
        })
      );
    }
  };

  //updateMarker = (newMarker) => this.marker = newMarker
  updateMarker = (newMarker) => {
    console.log("Nuevo Marcador:", newMarker);
    const { formData, markerLocation } = this.state;

    // Si no hay latitud y longitud asociadas con el departamento, usa la ubicación del marcador
    if (formData.latitud === "" && formData.longitud === "") {
      this.setState({
        formData: {
          ...formData,
          latitud: newMarker.lat.toString(),
          longitud: newMarker.lng.toString(),
        },
        markerLocation: {
          latitud: newMarker.lat.toString(),
          longitud: newMarker.lng.toString(),
        },
      });
    } else {
      // Latitud y longitud ya establecidas, no actualizamos con la ubicación del marcador
      this.setState({
        markerLocation: {
          latitud: newMarker.lat.toString(),
          longitud: newMarker.lng.toString(),
        },
      });
    }
  };
  


  handleTitulo = (field, value) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData };
      formData[field] = value;
  
      if (field === "tituloanuncio") {
        this.setState({ titleCharacterCount: value.length });
      }
  
      return { formData };
    });
  };

  
  handleNormas = (field, value) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData };
      formData[field] = value;
  
      if (field === "normas") {
       this.setState({ titleCharacterCount: value.length });
      }
  
      return { formData };
    });
  };
  handleDesc = (field, value) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData };
      formData[field] = value;
  
      if (field === "tituloanuncio") {
      
        this.setState({ descriptionCharacterCount: value.length });
      }
  
      return { formData };
    });
  };

  handlePrevSlide = () => {
    if (this.state.currentSlide > 0) {
      this.setState((prevState) => ({
        currentSlide: prevState.currentSlide - 1,
      }));
    }
  };

  handleOptionPChange = (key) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData };
      if (key === "compartido") {
        formData.compartido = 1;
        formData.privado = 0;
      } else if (key === "privado") {
        formData.compartido = 0;
        formData.privado = 1;
      }
      return { formData };
    });
  };
  handlePropertyTypeChange = (type) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData, tipopropiedad: type };
      return { formData };
    });
  };

  handleInputChange = (field, value) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData };
      formData[field] = value;
      return { formData };
    });
  };

  handleOptionChange = (key) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData };
      formData[key] = formData[key] === 0 ? 1 : 0;
      return { formData };
    });
  };

  handleCityChange = (city) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData, ciudad: city };
      return { formData };
    });
  };

  handleImage1Change = (image) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData, imagen1: image };
      return { formData };
    });
    console.log("Imagen cambiada:", image);
  };
  handleImage2Change = (image) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData, imagen2: image };
      return { formData };
    });
    console.log("Imagen cambiada:", image);
  };
  handleImage3Change = (image) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData, imagen3: image };
      return { formData };
    });
    console.log("Imagen cambiada:", image);
  };

  eliminarEstado = (nombreEstado) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData, [nombreEstado]: "" };
      return { formData };
      
    });
    console.log("iimage:")
    console.log("imagen: " + this.state.formData.imagen1)
  };


  handleImage4Change = (image) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData, imagen4: image };
      return { formData };
    });
    console.log("Imagen cambiada:", image);
  };
  handleImage5Change = (image) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData, imagen5: image };
      return { formData };
    });
    console.log("Imagen cambiada:", image);
  };

  onSubmit = async (e) => {
    e.preventDefault();
      // Crear un objeto con los datos del formulario
      const lugar = {
        idusuario : parseInt(localStorage.getItem("userID")),
        tipopropiedad :this.state.formData.tipopropiedad,
        tituloanuncio :this.state.formData.tituloanuncio,
        descripcion :this.state.formData.descripcion,
        ubicacion :"NOHAY",
        precio :parseInt(this.state.formData.precio),
        capacidad :  parseInt(this.state.formData.capacidad),
        habitaciones :parseInt(this.state.formData.habitaciones),
        baños :parseInt(this.state.formData.banos),
        camas :parseInt(this.state.formData.camas),
        niños :this.state.formData.niños,
        normas :this.state.formData.normas,
        mascotas :1,
        qr :"n hay",
        ciudad: this.state.formData.ciudad,
       wifi: this.state.formData.wifi,
       parqueo: this.state.formData.parqueo,
       cocina: this.state.formData.cocina,
       refrigerador: this.state.formData.refrigerador,
       lavaropa: this.state.formData.lavaropa,
       piscina: this.state.formData.piscina,
       privado: this.state.formData.privado,
       compartido: this.state.formData.compartido,
       estado:0,
       contacto:65307821,
       favorito:0,
       imagen1:this.state.formData.imagen1,
       descripcion1:this.state.formData.descripcion1,
       imagen2:this.state.formData.imagen2,
       descripcion2:this.state.formData.descripcion2,
       imagen3:this.state.formData.imagen3,
       descripcion3:this.state.formData.descripcion3,
       imagen4:this.state.formData.imagen4,
       descripcion4:this.state.formData.descripcion4,
       imagen5:this.state.formData.imagen5,
       descripcion5:this.state.formData.descripcion5,
       latitud: this.state.formData.latitud.toString(), 
       longitud: this.state.formData.longitud.toString(), 
       pausado:0,
     };
      const postProducto = async (url, lugar) => {
        const response = await fetch(url, {
                      
          method: 'POST',
          body: JSON.stringify(lugar),
          headers: {
                'Content-Type': 'application/json',
          }
          
          
        });
        return response;
      }
      
      const respuestaJson = await postProducto( "http://127.0.0.1:8000/api/postinmuebles", lugar);

      console.log("Response:------> " + respuestaJson.status);
      console.log('Datos de registro:', lugar);
      if (this.state.currentSlide < 20) {
        this.setState(
          (prevState) => ({
            currentSlide: prevState.currentSlide + 1,
          })
        );
      }
    
  };
  terminar = () =>{
    console.log('context:: ', this.marker);
    window.location.href = '/cliente';
  }

  abrirModalSweetAlert = () => {
    const { history } = this.props;
    Swal({
      title: 'Cancelar registro',
      text: '¿Estás seguro de que deseas cancelar el registro?',
      icon: 'warning',
      buttons: {
        cancel: 'Cancelar',
        confirm: {
          text: 'Confirmar',
          className: 'btn-confirmar-reg', },
      },
      dangerMode: true,
      customClass: {
        content: 'custom-swal-content',
      },
    }).then((confirmacion) => {
      if (confirmacion) {
        window.location.href = '/cliente';
   
                 
      } else {
         console.log('Acción cancelada');
      }
    });
  };
  
  getInitialLatForCity = (city) => {
    console.log("Ciudad seleccionada (Lat):", city);
    return coordenadasDepartamentos[city] ? coordenadasDepartamentos[city].lat : 0;
  };
  
  getInitialLngForCity = (city) => {
    console.log("Ciudad seleccionada (Lng):", city);
    return coordenadasDepartamentos[city] ? coordenadasDepartamentos[city].lng : 0;
  };

  render() {
    const currentSlide = this.state.currentSlide;
    const { formData, propertyTypes, options,privacy, cities} = this.state;

    const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`;

    return (
     <>
      <header>
            <div id='head'>
               <div id='head-izq'>
                </div>
                    
          
               <div id='navReg'>
               <div id = "logoT">
                  <i id='logoP'><RiHomeSmileLine/></i>
                  </div>
                    
                  <div id = 'logoL'>
                  <a id="TelosSuite">TelosSuite</a>
                  </div>
               </div>

               <div id='head-der'>
                </div>

            </div>
              <div id='navAbajo'>
              <div id='navRegs'>
              <div id="reg">Registro de inmueble</div>
                  </div>
                  {currentSlide < 17 && 
                   (
                      <div  id='opt-nav'>
                        <button id="btn-volver" onClick={this.abrirModalSweetAlert}>Volver</button>
                      </div>
                  )}
             </div>
           
        </header>

      <div className="carousel-container">
        <div className="carousel-slide">
          <div className="slide">
            
            {currentSlide === 0 && (
              <div className="property-type-selection">
                <div id='titulo'>
                <h3>Elige el tipo de inmueble que deseas ofertar:</h3>
               
                </div>
                 {propertyTypes.map((property, index) => (
                  <label
                    key={index}
                    className={`property-type-label ${
                      formData.tipopropiedad === property.type ? 'selected' : ''
                    }`}
                  >
                    {property.icon} {property.type}
                    <input
                      type="radio"
                      name="propertyType"
                      value={property.type}
                      checked={formData.tipopropiedad === property.type}
                      onChange={() => this.handlePropertyTypeChange(property.type)}
                       style={{ display: 'none' }}
                    />
                  </label>
                ))}
              </div>
            )}
            {currentSlide === 1 && (
              <div className="property-options">
                <div id='titulo'>
                       <h3>Tu inmueble permite:</h3>
                </div>
                <div id='cuerpo'>
                {options.map((option, index) => (
                  <label
                    key={index}
                    className={`property-options-label ${
                      formData[option.key] === 1 ? 'selected' : ''
                    }`}
                  >
                    {option.icon} {option.label}
                    <input
                      type="checkbox"
                      name={option.key}
                      id='borde'
                      checked={formData[option.key] === 1}
                      onChange={() => this.handleOptionChange(option.key)}
                      style={{ display: 'none' }}
                    />
                  </label>
                ))}
                </div>
               
              </div>
            )}
            {currentSlide === 2 && (
              
            <div>
                 <div id='titulo'>
                       <h3>Informacion basica sobre tu inmueble</h3>
                </div>
           <div className="property-info">
        
           <div className="left">
           <label id="indotext">
               Baños:
               <input
                 id="info2"
                 type="number"
                 name="banos"
                 value={formData.banos}
                 onChange={(e) =>
                   this.handleInputChange("banos", e.target.value)
                 }
               />
             </label>
             <label id="indotext">
               Camas:
               <input
                 id="info2"
                 type="number"
                 name="camas"
                 value={formData.camas}
                 onChange={(e) =>
                   this.handleInputChange("camas", e.target.value)
                 }
               />
             </label>
           </div>
           <div className="right">
           <label id="indotext1">
               Habitaciones:
               <input
                 id="info"
                 type="number"
                 name="habitaciones"
                 value={formData.habitaciones}
                 onChange={(e) =>
                   this.handleInputChange("habitaciones", e.target.value)
                 }
               />
             </label>
             <label id="indotext1">
               Capacidad:
               <input
                 id="info"
                 type="number"
                 name="capacidad"
                 value={formData.capacidad}
                 onChange={(e) =>
                   this.handleInputChange("capacidad", e.target.value)
                 }
               />
             </label>
           </div>
         </div>
         </div>
            )}
            {currentSlide === 3 && (
  <div className="property-title-description">
    <h2>Ingresa un título para tu anuncio
      <br></br>
    <span className="character-count">
        {formData.tituloanuncio.length} / 50
      </span>
    </h2>
    <div className="title-counter">
      <input
        id='titulo'
        type="text"
        name="tituloanuncio"
        value={formData.tituloanuncio}
        onChange={(e) => {
          const newValue = e.target.value;
          if (newValue.length <= 50) {
            this.handleTitulo("tituloanuncio", newValue);
          }
        }}
      />
      <br></br>
      
    </div>
    <br></br>
    <h2>Ingresa una breve descripción sobre tu inmueble
      <br></br>
    <span className="character-count">
        {formData.descripcion.length} / 200
      </span>
    </h2>
   
                <textarea
                 id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.length <= 200) {
                      this.handleDesc("descripcion", newValue);
                    }
                  }}
                />
              
  </div>
)}

            {currentSlide === 4 && (
              <div className="property-rules">
                <div id='titulo'> 
                <h3>Por favor, ingresa las normas para tu inmueble:</h3>
                
                </div>

                <br></br>
    <h2 className="character-count">
        {formData.normas.length} / 250
      </h2>
                <br></br>
                 <textarea
                  id='normas'
                  name="normas"
                  value={formData.normas}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.length <= 250) {
                      this.handleNormas("normas", newValue);
                    }
                  }}
                />
              </div>
            )}
             {currentSlide === 5 && (
              <div className="property-options">
              <div id='titulo'>
                     <h3>Tu inmueble es:</h3>
              </div>
              <div id='cuerpo'>
              {privacy.map((option, index) => (
  <label
    key={index}
    className={`property-options-label ${
      formData[option.key] === 1 ? 'selected' : ''
    }`}
  >
    {option.icon} {option.label}
    <input
      type="radio"
      name="privacy"
      value={option.key}
      checked={formData[option.key] === 1}
      onChange={() => this.handleOptionPChange(option.key)}
      style={{ display: 'none' }}
    />
  </label>
))}

              </div>
             
            </div>
          )}
            {currentSlide === 6 && (
              <div className="property-locations">
                <div id='titulo'>
                <h3>En qué ciudad se encuentra tu inmueble:</h3>
               
                </div>
              {cities.map((city, index) => (
                  <label
                    key={index}
                    className={`property-type-labels ${
                      formData.ciudad === city ? 'selected' : ''
                    }`}
                  >
                    {city}
                    <input
                      type="radio"
                      name="city"
                      value={city}
                      checked={formData.ciudad === city}
                      onChange={() => this.handleCityChange(city)}
                      style={{ display: 'none' }}
                    />
                  </label>
                ))}
              </div>
            )}
            {currentSlide === 7 && (
              <div className="property-services">
                <div id='titulo'>
                     <h3>Servicios adicionales:</h3>
                </div>
                <div id='cuerpo'>
                  <div id='cuerpo-izq'>
                  <label
                  className={`property-options-label ${
                    formData.wifi === 1 ? 'selected' : ''
                  }`}
                >
                  <MdApartment /> Wifi
                  <input
                    type="checkbox"
                    name="wifi"
                    checked={formData.wifi === 1}
                    onChange={() => this.handleOptionChange('wifi')}
                    style={{ display: 'none' }}
                  />
                </label>
                <label
                  className={`property-options-label ${
                    formData.parqueo === 1 ? 'selected' : ''
                  }`}
                >
                  <MdApartment /> Parqueo
                  <input
                    type="checkbox"
                    name="parqueo"
                    checked={formData.parqueo === 1}
                    onChange={() => this.handleOptionChange('parqueo')}
                    style={{ display: 'none' }}
                  />
                </label>
                <label
                  className={`property-options-label ${
                    formData.cocina === 1 ? 'selected' : ''
                  }`}
                >
                  <MdApartment /> Cocina
                  <input
                    type="checkbox"
                    name="cocina"
                    checked={formData.cocina === 1}
                    onChange={() => this.handleOptionChange('cocina')}
                    style={{ display: 'none' }}
                  />
                </label>
                  </div>
                  <div id='cuerpo-der'>
                  <label
                  className={`property-options-label ${
                    formData.refrigerador === 1 ? 'selected' : ''
                  }`}
                >
                  <MdApartment /> Refrigerador
                  <input
                    type="checkbox"
                    name="refrigerador"
                    checked={formData.refrigerador === 1}
                    onChange={() => this.handleOptionChange('refrigerador')}
                    style={{ display: 'none' }}
                  />
                </label>
                <label
                  className={`property-options-label ${
                    formData.lavaropa === 1 ? 'selected' : ''
                  }`}
                >
                  <MdApartment /> Lavaropa
                  <input
                    type="checkbox"
                    name="lavaropa"
                    checked={formData.lavaropa === 1}
                    onChange={() => this.handleOptionChange('lavaropa')}
                    style={{ display: 'none' }}
                  />
                </label>
                <label
                  className={`property-options-label ${
                    formData.piscina === 1 ? 'selected' : ''
                  }`}
                >
                  <MdApartment /> Piscina
                  <input
                    type="checkbox"
                    name="piscina"
                    checked={formData.piscina === 1}
                    onChange={() => this.handleOptionChange('piscina')}
                    style={{ display: 'none' }}
                  />
                </label>
                  </div>
               
               
                </div>
               
              </div>
            )}
            {currentSlide === 8 && (
              <div className="property-price">
                <div id='titulo'>
                    <h3>Ingresa el precio por noche:</h3>
                </div>
               <div id='cuerpo'>
                <div id='cuerpo-der'>
                  Bs.
                </div>
                <div>
                <label id='label-precio'>
                  
                  <input
                   id='precioA'
                    type="number"
                    name="precio"
                    placeholder='0'
                    value={formData.precio}
                    onChange={(e) =>
                      this.handleInputChange("precio", e.target.value)
                    }
                  />
                </label>
                </div>
               
               </div>
              </div>
            )}

{currentSlide === 9 && (
  <div className="property-images">
      <br>
      </br>
      <br></br>
      <br>
      </br>
      <br></br>
      <h3>A continuación, ingresa 5 imágenes con una breve descripción.</h3>
      <h3>Se paciente! es para atraer posibles huespedes!</h3>
 
  </div>
)}
{currentSlide === 10 && (
<div>
  <div className="property-images">
      <div id='titulo'>
          <h3>Ingresa la imagen 1 más su descripción</h3>
      </div>
  </div>
  <div className='imagenes'>
 
  <div className='div-izquierdo'> 
        <div id='img'>
             <img src={this.state.formData.imagen1}/>
        </div>
        
        <div id='footerimg'>
        {this.state.formData.imagen1  === "" &&
           <Subir onImageChange={this.handleImage1Change} />
        }
        
        {this.state.formData.imagen1  !== "" &&
           <button  onClick={() => this.eliminarEstado('imagen1')}> eliminar </button>
        }
        </div>
        
  </div>

  <div className='div-derecho'>
     <br></br>
     <br></br>
    <span className="character-count">
        {formData.descripcion1.length} / 50
      </span>
    
      <textarea
                 id="descripcion"
                  name="descripcion"
                  value={formData.descripcion1}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.length <= 50) {
                      this.handleDesc("descripcion1", newValue);
                    }
                  }}
                />
    
  </div>
 </div>
  
</div>
 
)}
{currentSlide === 11 && (
 <div>
  <div className="property-images">
      <div id='titulo'>
          <h3>Ingresa la imagen 2 más su descripción</h3>
      </div>
  </div>
  <div className='imagenes'>
 
  <div className='div-izquierdo'> 
        <div id='img'>
             <img src={this.state.formData.imagen2}/>
        </div>
        
        <div id='footerimg'>
        {this.state.formData.imagen2  === "" &&
           <Subir onImageChange={this.handleImage2Change} />
        }
        
        {this.state.formData.imagen2 !== "" &&
           <button  onClick={() => this.eliminarEstado('imagen2')}> eliminar </button>
        }
        </div>
        
  </div>

  <div className='div-derecho'>
     <br></br>
     <br></br>
    <span className="character-count">
        {formData.descripcion2.length} / 50
      </span>
    
      <textarea
                 id="descripcion"
                  name="descripcion"
                  value={formData.descripcion2}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.length <= 50) {
                      this.handleDesc("descripcion2", newValue);
                    }
                  }}
                />
    
  </div>
 </div>
  
</div>
 
)}
{currentSlide === 12 && (
 <div>
  <div className="property-images">
      <div id='titulo'>
          <h3>Ingresa la imagen 3 más su descripción</h3>
      </div>
  </div>
  <div className='imagenes'>
 
  <div className='div-izquierdo'> 
        <div id='img'>
             <img src={this.state.formData.imagen3}/>
        </div>
        
        <div id='footerimg'>
        {this.state.formData.imagen3  === "" &&
           <Subir onImageChange={this.handleImage3Change} />
        }
        
        {this.state.formData.imagen3  !== "" &&
           <button  onClick={() => this.eliminarEstado('imagen3')}> eliminar </button>
        }
        </div>
        
  </div>

  <div className='div-derecho'>
     <br></br>
     <br></br>
    <span className="character-count">
        {formData.descripcion3.length} / 50
      </span>
    
      <textarea
                 id="descripcion"
                  name="descripcion"
                  value={formData.descripcion3}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.length <= 50) {
                      this.handleDesc("descripcion3", newValue);
                    }
                  }}
                />
    
  </div>
 </div>
  
</div>
 
)}
{currentSlide === 13 && (
 <div>
  <div className="property-images">
      <div id='titulo'>
          <h3>Ingresa la imagen 4 más su descripción</h3>
      </div>
  </div>
  <div className='imagenes'>
 
  <div className='div-izquierdo'> 
        <div id='img'>
             <img src={this.state.formData.imagen4}/>
        </div>
        
        <div id='footerimg'>
        {this.state.formData.imagen4  === "" &&
           <Subir onImageChange={this.handleImage4Change} />
        }
        
        {this.state.formData.imagen4  !== "" &&
           <button  onClick={() => this.eliminarEstado('imagen4')}> eliminar </button>
        }
        </div>
        
  </div>

  <div className='div-derecho'>
     <br></br>
     <br></br>
    <span className="character-count">
        {formData.descripcion4.length} / 50
      </span>
    
      <textarea
                 id="descripcion"
                  name="descripcion"
                  value={formData.descripcion4}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.length <= 50) {
                      this.handleDesc("descripcion4", newValue);
                    }
                  }}
                />
    
  </div>
 </div>
  
</div>
 
)}
{currentSlide === 14 && (
  <div>
  <div className="property-images">
      <div id='titulo'>
          <h3>Ingresa la imagen 5 más su descripción</h3>
      </div>
  </div>
  <div className='imagenes'>
 
  <div className='div-izquierdo'> 
        <div id='img'>
             <img src={this.state.formData.imagen5}/>
        </div>
        
        <div id='footerimg'>
        {this.state.formData.imagen5  === "" &&
           <Subir onImageChange={this.handleImage5Change} />
        }
        
        {this.state.formData.imagen5  !== "" &&
           <button  onClick={() => this.eliminarEstado('imagen5')}> eliminar </button>
        }
        </div>
        
  </div>

  <div className='div-derecho'>
     <br></br>
     <br></br>
    <span className="character-count">
        {formData.descripcion5.length} / 50
      </span>
    
      <textarea
                 id="descripcion"
                  name="descripcion"
                  value={formData.descripcion5}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.length <= 50) {
                      this.handleDesc("descripcion5", newValue);
                    }
                  }}
                />
    
  </div>
 </div>
  
</div>
 
)}



{currentSlide === 15 && (
  <div className="property-ubi">
    <div id='titulo'>
      <h3>Ingresa la ubicación en {this.state.formData.ciudad}</h3>
      <div className='MapaRegisInm'>
        <MapaRegistro 
          googleMapURL={mapURL}
          containerElement={<div style={{ height: '150%' }}></div>}
          mapElement={<div style={{ height: '100%' }}></div>}
          loadingElement={<p>Cargando..</p>}
          lat={this.state.formData.latitud ? this.state.formData.latitud :this.getInitialLatForCity(this.state.formData.ciudad)}
          lng={this.state.formData.longitud ? this.state.formData.longitud :this.getInitialLngForCity(this.state.formData.ciudad)}
          radio={0}
          updateMarker={this.updateMarker}
        />
      </div>
      
    </div>
  </div>
)}

{currentSlide ===  16 && 
         
         (
          <div className="property-done">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h3>
                  Eso es todo, asegurate de que la informacion ingresada es correcta, si lo es, presiona en
                  registrar.
                </h3>
              </div>
          
          )}
            {currentSlide === 17 && (
              <div className="property-done">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h3>
                  Eso es todo por ahora, tu inmueble ya es visible para los
                  posibles huéspedes!
                </h3>
              </div>
            )}
          </div>
        </div>
        <div className="button-container">
          {currentSlide > 0 && currentSlide < 16 &&(
            <button className="prev" onClick={this.handlePrevSlide}>
              <IoIosArrowDropleftCircle/>
            </button>
          )}
          {currentSlide === 0 && this.state.formData.tipopropiedad !== "" && (
            <button className="next" onClick={this.handleNextSlide}>
              < IoIosArrowDroprightCircle />
            </button>
          )}
          {currentSlide === 1
           && (
            <button className="next" onClick={this.handleNextSlide}>
              < IoIosArrowDroprightCircle />
            </button>
          )}
          {currentSlide === 2 &&
          (this.state.formData.banos >0) &&
          (this.state.formData.habitaciones >0) &&
          (this.state.formData.camas >0) &&
          (this.state.formData.capacidad  >0)&&
            (
            <button className="next" onClick={this.handleNextSlide}>
              < IoIosArrowDroprightCircle />
            </button>
          )}

{currentSlide === 3 &&
this.state.formData.tituloanuncio !== "" &&
this.state.formData.descripcion !== "" &&
(
            <button className="next" onClick={this.handleNextSlide}>
              < IoIosArrowDroprightCircle />
            </button>
          )} 
          {currentSlide === 4 && 
          this.state.formData.normas !== "" &&
          (
            <button className="next" onClick={this.handleNextSlide}>
              < IoIosArrowDroprightCircle />
            </button>
          )}
          {currentSlide === 5 &&
          (this.state.formData.privado !== 0 || this.state.formData.compartido !== 0) &&
          (
            <button className="next" onClick={this.handleNextSlide}>
              < IoIosArrowDroprightCircle />
            </button>
          )}
          {currentSlide === 6 &&
          this.state.formData.ciudad !== "" &&
          (
            <button className="next" onClick={this.handleNextSlide}>
              < IoIosArrowDroprightCircle />
            </button>
          )}
          {currentSlide ===  7 &&
         
          (
            <button className="next" onClick={this.handleNextSlide}>
              < IoIosArrowDroprightCircle />
            </button>
          )}
          {currentSlide ===  8 &&
          this.state.formData.precio > 0 && 
         
         (
           <button className="next" onClick={this.handleNextSlide}>
             < IoIosArrowDroprightCircle />
           </button>
         )}
         {currentSlide ===  9 &&
         
         (
           <button className="next" onClick={this.handleNextSlide}>
             < IoIosArrowDroprightCircle />
           </button>
         )}
         {currentSlide ===  10 &&
         this.state.formData.imagen1 !== "" &&
         this.state.formData.descripcion1 !== "" &&
         (
           <button className="next" onClick={this.handleNextSlide}>
             < IoIosArrowDroprightCircle />
           </button>
         )}
         {currentSlide ===  11 &&
         this.state.formData.imagen2 !== "" &&
         this.state.formData.descripcion2 !== "" &&
         (
           <button className="next" onClick={this.handleNextSlide}>
             < IoIosArrowDroprightCircle />
           </button>
         )}
         
         {currentSlide ===  12 &&
         this.state.formData.imagen3 !== "" &&
         this.state.formData.descripcion3 !== "" &&
         (
           <button className="next" onClick={this.handleNextSlide}>
             < IoIosArrowDroprightCircle />
           </button>
         )}
         {currentSlide ===  13 &&
         this.state.formData.imagen4 !== "" &&
         this.state.formData.descripcion4 !== "" &&
         (
           <button className="next" onClick={this.handleNextSlide}>
             < IoIosArrowDroprightCircle />
           </button>
         )}
         {currentSlide ===  14 &&
         this.state.formData.imagen5 !== "" &&
         this.state.formData.descripcion5 !== "" &&
         (
           <button className="next" onClick={this.handleNextSlide}>
             < IoIosArrowDroprightCircle />
           </button>
         )}
         {currentSlide === 15 && 
         this.state.formData.latitud !== "" && this.state.formData.longitud !== "" && 
         (
          <button className="next" onClick={this.handleNextSlide}>
            <IoIosArrowDroprightCircle />
          </button>
          
          )}
         
         
         {currentSlide ===  16 &&
         this.state.formData.imagen1 !== "" &&
         this.state.formData.descripcion1 !== "" &&
         (
          <button className="fin" type="submit" onClick={this.onSubmit}>
          Registrar
        </button>
         )}
         
          
           {currentSlide === 17 && (
             <button className="fin" type="submit" onClick={this.terminar}>
              Finalizar
            </button>
          )}
          
        </div>
      </div>
      </>
    );
  }
}

export default RegisterInmue;

