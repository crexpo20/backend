import React, { Component } from 'react';
import { BsHouse } from 'react-icons/bs';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { MdApartment } from 'react-icons/md';
import "./css/carrusel.css";

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
        cuidad: '',
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
    if (this.state.currentSlide < 14) {
      this.setState(
        (prevState) => ({
          currentSlide: prevState.currentSlide + 1,
        })
      );
    }
  };

  handleTitulo = (field, value) => {
    this.setState((prevState) => {
      const formData = { ...prevState.formData };
      formData[field] = value;
  
      if (field === "tituloanuncio") {
        // Contar los caracteres del título y actualizar el estado
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
        // Contar los caracteres del título y actualizar el estado
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
        // Contar los caracteres del título y actualizar el estado
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
      const formData = { ...prevState.formData, cuidad: city };
      return { formData };
    });
  };


  onSubmit = async () => {
      // Crear un objeto con los datos del formulario
      const lugar = {
         idanfitrion :3,
         tipopropiedad :this.state.formData.tipopropiedad,
         tituloanuncio :this.state.formData.tituloanuncio,
         descripcion :this.state.formData.descripcion,
         ubicacion :"NOHAY",
         precio :this.state.formData.precio,
         capacidad :  this.state.formData.capacidad,
         habitaciones :this.state.formData.habitaciones,
         baños :this.state.formData.banos,
         camas :this.state.formData.camas,
         niños :this.state.formData.niños,
         normas :this.state.formData.normas,
         mascotas :this.state.formData.mascotas,
         qr :"n hay",
         ciudad: this.state.formData.cuidad,
        wifi: this.state.formData.wifi,
        parqueo: this.state.formData.parqueo,
        cocina: this.state.formData.cocina,
        refrigerador: this.state.formData.refrigerador,
        lavaropa: this.state.formData.lavaropa,
        piscina: this.state.formData.piscina,
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
      
      const respuestaJson = await postProducto( "https://telossuite.amicornios.com/api/postinmuebles", lugar);

      console.log("Response:------> " + respuestaJson.status);
      // Mostrar el objeto por consola
      console.log('Datos de registro:', lugar);
    
  };
  

  render() {
    const currentSlide = this.state.currentSlide;
    const { formData, propertyTypes, options,privacy, cities} = this.state;

    return (
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
                      formData.cuidad === city ? 'selected' : ''
                    }`}
                  >
                    {city}
                    <input
                      type="radio"
                      name="city"
                      value={city}
                      checked={formData.cuidad === city}
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
                    <h3>Es momento de poner un precio a tu inmueble:</h3>
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
              <div className="property-done">
                <h3>
                  Eso es todo por ahora, tu inmueble ya es visible para los
                  posibles huéspedes!
                </h3>
              </div>
            )}
          </div>
        </div>
        <div className="button-container">
          {currentSlide > 0 && (
            <button className="prev" onClick={this.handlePrevSlide}>
              <IoIosArrowDropleftCircle/>
            </button>
          )}
          {currentSlide < 9 && (
            <button className="next" onClick={this.handleNextSlide}>
              < IoIosArrowDroprightCircle />
            </button>
          )}
           {currentSlide === 9 && (
             <button className="fin" type="submit" onClick={console.log(this.state.formData)}>
              Finalizar
            </button>
          )}
          
        </div>
      </div>
    );
  }
}

export default RegisterInmue;
