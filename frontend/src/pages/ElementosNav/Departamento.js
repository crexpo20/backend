import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../CSS/cards.css';
import axios from "axios";
class Departamento extends Component {
  constructor(props){
    super(props);
    this.state={
      inmueble:[],
      contador:0
    }
    this.getProductos = this.getProductos.bind(this);
    
}
 
componentDidMount(){
  this.getProductos();
 
}

getProductos=async()=>{
  await axios.get('https://telossuite.amicornios.com/api/getinmuebles')
  .then(res=>{
      this.setState({inmueble: res.data});
      console.log(this.state.inmueble)
  }).catch((error)=>{
      console.log(error);
  });
}

  render() {
    return (
      <>
        <body>
          <div className="verinm">
            {this.state.inmueble.map((sitio, index) => {
              if (sitio.ciudad === "Departamento"
                ){ if(sitio.tipopropiedad === localStorage.getItem("tipo")){
                    
                    return (
                        <div className="InmueblesHost" key={sitio.id}>
                          <img
                            className="inmueble_fot"
                            src="https://picsum.photos/280/280"
                            alt="Inmueble"
                          />
                          <h3 className="inmueble_name">{sitio.tituloanuncio}</h3>
                          <div className="inmueble_info">
                            <p className="inmDet">{sitio.ciudad}</p>
                            <p className="inmCamas">{sitio.camas}</p>
                            <p className="inmPrecio">{sitio.precio}</p>
                          </div>
                        </div>
                      );
                }
               
              }
              if(this.state.contador === 0){
                return (
                  <div className="InmueblesHost" >
                    <img
                      className="inmueble_fot"
                      src="https://picsum.photos/280/280"
                      alt="Inmueble"
                    />
                    
                  </div>
                );
              }
              return null;
            })}
          </div>
        </body>
        <Outlet />
      </>
    );
  }
}

export default Departamento;