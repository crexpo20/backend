import React, {Component} from 'react';
import {RiHomeSmileLine} from "react-icons/ri"
import { Link, Outlet } from 'react-router-dom';
import FacebookLogin from '@greatsumini/react-facebook-login';
import GoogleLogin from '@leecheuk/react-google-login';
import ModalInicio from '../components/inicioSesion/inicio';
import ModalRegistro from '../components/registro/registro';
import InicioBoton from '../components/inicioSesion/botonInicio';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Modal } from 'antd';


class RegisterPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      pass: '',
      showPassword: false,
      errors: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        pass: ''
      },
      autoLoad: false,
      fields: 'name,email,picture',
      showModal: false,
      redirectToHome: false,
       showModalInicio: false, 
    };
  }
  toggleModal = () => {
    this.setState((prevState) => ({
      showModalInicio: !prevState.showModalInicio,
    }));
  };
  
  
  togglePasswordVisibility = (e) => {
    e.preventDefault(); // Prevenir el envío del formulario
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };
  handleInputChangePass = (e) => {
    this.setState({ pass: e.target.value });
  };

  openModalInicio = () => {
    this.setState((prevState) => ({
      showModalInicio: !prevState.showModalInicio,
    }));
    console.log(this.state.showModalInicio)
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  validateForm = () => {
    const { username, firstName, lastName, email, phone , pass} = this.state;
    const errors = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      pass:'',
    };

    let valid = true;
    
    // Validación para el NOMBRE
    const specialCharactersRegex = /[!@#$%^&*()_+{}\[\]:-;<>,.?~\\|/]/;
    if (specialCharactersRegex.test(firstName)) {
      errors.firstName = 'No se admiten caracteres especiales en el nombre.';
      valid = false;
    }

    // Validación para el APELLIDO
    if (specialCharactersRegex.test(lastName)) {
      errors.lastName = 'No se admiten caracteres especiales en el apellido.';
      valid = false;
    }

    // Validación para el TELEFONO
    const phoneRegex = /^[67]\d{7}$/;
    if (!phoneRegex.test(phone)) {
      errors.phone = 'Teléfono no válido. Debe tener 8 dígitos y comenzar con 6 o 7.';
      valid = false;
    }

    if (username.trim() === '') {
      errors.username = 'El campo username es obligatorio.';
      valid = false;
    }

    if (firstName.trim() === '') {
      errors.firstName = 'El campo nombre es obligatorio.';
      valid = false;
    }

    if (lastName.trim() === '') {
      errors.lastName = 'El campo apellido es obligatorio.';
      valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Correo electrónico no válido.';
      valid = false;
    }

    if (email.trim() === '') {
      errors.email = 'El campo correo electrónico es obligatorio.';
      valid = false;
    }

    if (phone.trim() === '') {
      errors.phone = 'El campo teléfono es obligatorio.';
      valid = false;
    }
    
    if (pass.trim() === '') {
      errors.pass = 'El campo contraseña es obligatorio.';
      valid = false;
    }
    this.setState({ errors });

    return valid;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      console.log('Datos de registro:', this.state);
    }
  };
  onSubmit = async () => {
    if (this.validateForm()) {
      const usuario = {
        username: this.state.username,
        nombre: this.state.firstName,
        apellido: this.state.lastName,
        correo: this.state.email,
        telefono: this.state.phone,
        contraseña: this.state.pass,
        anfitrion:0
      };
      const postProducto = async (url, usuario) => {
        const response = await fetch(url, {
                      
          method: 'POST',
          body: JSON.stringify(usuario),
          headers: {
                'Content-Type': 'application/json',
          }
          
          
        });
        return response;
      }
      
      const respuestaJson = await postProducto( "http://127.0.0.1:8000/api/postusuario", usuario);

      console.log("Response:------> " + respuestaJson.status);
      // Mostrar el objeto por consola
      console.log('Datos de registro:', usuario);
    }
  };

   //MODAL DESPUES DE ACEPTAR EL REGISTRO
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      // Mostrar el modal de confirmación
      this.setState({ showModal: true });
    }
  };

  closeModal = () => {
    // Cerrar el modal de confirmación
    this.setState({ showModal: false });
  
    // Redirigir a la página principal
    this.setState({ redirectToHome: true });
  };

  close = () => {
    // Cerrar el modal de confirmación
    this.setState({ showModal: false });

  };
  closeModalRegistro = () => {
    this.setState({ showModal: false });
  };

      // MÉTODOS PARA LOS BOTONES DE INICIO DE SESION CON FACEBOOK Y GOOGLE
      //FACEBOOK
      handleFacebookResponse = (response) => {
        if (response.status === 'connected') {
          console.log('Usuario de Facebook:', response);
        } else {
          console.log('Inicio de sesión de Facebook cancelado o error.');
        }
      };

      handleFacebookLogin = () => {
        this.setState({
          autoLoad: true,
        });
      };

      //GOOGLE
      handleGoogleResponse = (response) => {
        if (response.profileObj) {
          console.log('Usuario de Google:', response.profileObj);
        } else {
          console.log('Inicio de sesión de Google cancelado o error.');
        }
      };

  render(){
    const { pass, showPassword } = this.state;
    if (this.state.redirectToHome) {
      return <link to="/" />;
    }
      
      return(
        
       <>
        <div class='RegistroUsuario' style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '600px', backgroundColor: '#E8DAE1'}}>
        
        <form  class="RegistroUsuario" onSubmit={this.handleSubmit} style={{backgroundColor: '#E8DAE1'}}>
          <div id='elemento-registro' className='registrocss' style={{backgroundColor: '#E8DAE1'}}>
            <label id='label-registro'>Username:</label>
            <input id='input-registro' 
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <div className="error-message">{this.state.errors.username}</div>
          </div>
          <div className='registrocss'>
            <label id='label-registro'>Nombre:</label>
            <input id='input-registro' className='inputR'
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
             <div className="error-message">{this.state.errors.firstName}</div>
          </div>
          <div className='registrocss'>
            <label id='label-registro'>Apellido:</label>
            <input id='input-registro' className='inputR'
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
             <div className="error-message">{this.state.errors.lastName}</div>
          </div>
          <div className='registrocss'>
            <label id='label-registro'>Correo electrónico:</label>
            <input id='input-registro' className='inputR'
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <div className="error-message">{this.state.errors.email}</div>
          </div>
          <div className='registrocss'>
            <label id='label-registro'>Teléfono:</label>
            <input id='input-registro' className='inputR'
              type="number"
              name="phone"
              value={this.state.phone}
              onChange={this.handleInputChange}
            />
            <div className="error-message">{this.state.errors.phone}</div>
          </div>
          

          <div className="registrocss">
        <label id="label-registro">Contraseña:</label>
        <div className="password-input-container">
          <input
            id="input-registro"
            className="inputR"
            type={showPassword ? 'text' : 'password'}
            name="pass"
            value={pass}
            onChange={this.handleInputChangePass}
          />
          <button
            className="show-password-button"
            onClick={this.togglePasswordVisibility}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        <div className="error-message">{this.state.errors.pass}</div>
      </div>



          <br></br>
          <div id='texto'>
            Al seleccionar Aceptar y continuar, acepto los Términos de servicio, los Términos de pago del servicio
              y la Política contra la discriminación de TelosSuite. También reconozco la Política de privacidad.
          </div>
          <br></br>
          <div className='botonRegistro'>
          <button type="submit" 
          onClick={this.onSubmit}
           className='aceptar-button' 
           style={{ width: '410px' }}>
            Aceptar y Continuar
            </button>
          <p>-----------------------------------  o  -----------------------------------</p>
          <a>Ya tienes una cuenta?</a>
          <button
              type="button"
              onClick={this.openModalInicio}
              className="abrir-inicio-button"
            >
          </button>
         {
          this.state.showModalInicio === true && (
            <ModalInicio></ModalInicio>
          )
         }

      
          <br></br>
          <FacebookLogin
            appId='716745760340158'
            autoLoad={this.state.autoLoad}
            fields={this.state.fields}
            callback={this.handleFacebookResponse}
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className="facebook-button" style={{ width: '410px' }}>
                Continúa con Facebook
              </button>
            )}
          />
          <br></br>
            <GoogleLogin
            clientId='1014685536289-ltpgstsq77mpl96r2be6jeu5bqj79gml.apps.googleusercontent.com'
            onSuccess={this.handleGoogleResponse}
            onFailure={this.handleGoogleResponse}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className="google-button" style={{ width: '410px' }}>
                Continúa con Google
              </button>
            )}
            />
          </div>
        </form>
        {/* Modal de verificación despues de presionar el boton ACEPTAR Y CONTINUAR*/}
        {this.state.showModal && (
          <div className="modalAceptarRegistro">
            <div className="modal-content-aceptar-registro">
              <span className="close" onClick={this.closeModal}>&times;</span>
              <p style={{ fontSize: '43px' }}>¡Registro exitoso!</p>
              <br></br>
              <br></br>
                <div class="BotonAcept" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <Link to="/home" class='BotonAceptarR'  style={{ backgroundColor: '#e80980', fontSize: '18px' , border: 'black',color: 'white', borderRadius: '10px', width: '200px' }}>Aceptar</Link>
                  </div>
            </div>
          </div>
        )}
      </div>
       </>
        
      );
    }
  }
  export default RegisterPage