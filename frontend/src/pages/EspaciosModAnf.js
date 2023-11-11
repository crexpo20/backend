import React, {Component} from 'react';
import {Link, Outlet } from 'react-router-dom';
import { sitios } from '../sitios';
import iconoEliminar from '../iconos/iconoEliminar.png';
class EspaciosModAnf extends Component{
  state = {
    sitios: [], 
    modalAbierto: false,
    sitioSeleccionado: null,
  };
  eliminarSitio = (sitio) => {
    // Filtra la lista de sitios para excluir el sitio que se va a eliminar
    const nuevosSitios = this.state.sitios.filter((s) => s.id !== sitio.id);
    // Actualiza el estado para reflejar la lista sin el sitio eliminado
    this.setState({
      sitios: nuevosSitios,
      modalAbierto: false, // Cierra el modal después de eliminar
      sitioSeleccionado: null, // Limpia el sitio seleccionado
    });
  };

  handleEliminarClick = (sitio) => {
    this.setState({ sitioSeleccionado: sitio, modalAbierto: true });
  };

  confirmarEliminacion = () => {
    const sitioSeleccionado = this.state.sitioSeleccionado;
    if (sitioSeleccionado) {
      this.eliminarSitio(sitioSeleccionado);
    }
  };

  confirmarElimi = () => {
    this.setState({ modalAbierto: false });
  };

  //RUTAS

         /*const onSubmit = async (e)=>{
          e.preventDefault();
          const newInmueble={
            idinmueble: this.state.idinmueble,
            tipopropiedad: this.state.tipopropiedad,
            tituloanuncio: this.state.tituloanuncio,
            descripcion: this.state.descripcion,
            ubicacion: this.state.ubicacion,
            precio: this.state.precio,
            capacidad: this.state.capacidad,
            habitaciones: this.state.habitaciones,
            baños: this.state.baños,
            camas: this.state.camas,
            niños: this.state.niños,
            normas: this.state.normas,
            mascotas: this.state.mascotas,
            qr: this.state.qr,
          }
          
          try {
            await Axios.post('/postinmuebles', newInmueble);
            // Cualquier código que deba ejecutarse después de que la solicitud POST sea exitosa puede ir aquí.
          } catch (error) {
            // Maneja los errores aquí
            console.error(error);
          }
        } */
  
    render(){
        
        return(
          <>
          
          <body>
          <h4>Tus espacios</h4>
                
                <div>
                    { sitios.map (sitio =>(
                        <div class='verinm' key = {sitio.id}>
                            <div class='InmueblesHost'>
                            <img class='inmueble_fot' src="https://picsum.photos/280/280"></img>
                            
                            <h3 class='inmueble_name'>{sitio.nombre}</h3>
                            <div class='inmueble_info'>
                                <p class='inmDet'>{sitio.desc}</p>
                                <p class='inmCamas'>{sitio.camas}</p>
                                <p class='inmPrecio'>{sitio.precio}</p>
                            </div>
                            <div class='BotonesEditEli'>
                                <div class='BotonEditar'>
                                    <Link to={`/cliente/${sitio.id}`}>editar</Link>
                                </div>
                                <button className="eliminar-btn" onClick={() => this.handleEliminarClick(sitio)}>
                                  <img src={iconoEliminar} alt="Eliminar" />
                                </button>
                            </div>
                        </div>
                        </div>
                    )
                    )

                    }
                        {/* Modal de confirmación para el BOTON ELIMINAR */}
                            {this.state.modalAbierto && (
                            <div className="modalEliminar">
                                <div className="modal-contenido">
                                <p>¿Estás seguro que deseas eliminar {this.state.sitioSeleccionado ? this.state.sitioSeleccionado.nombre : ''}?</p>
                                <br></br>
                                <button onClick={this.confirmarEliminacion}>Eliminar</button>
                                <button onClick={this.confirmarElimi}>Cancelar</button>
                                </div>
                            </div>
                        )}
                </div>
                    
          </body>
          
          <Outlet />
          </>
          
        );
      }
      
  }
  export default EspaciosModAnf;
