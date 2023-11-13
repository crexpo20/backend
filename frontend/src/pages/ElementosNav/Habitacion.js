import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../CSS/cards.css';
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import '../../CSS/slick.css'
class Habitacion extends Component {
  constructor(props){
    super(props);
    this.state={
      inmueble:[]
    }
    this.getProductos = this.getProductos.bind(this);
    
}
 
componentDidMount(){
  this.getProductos();
 
}

getProductos=async()=>{
  await axios.get('http://127.0.0.1:8000/api/getinmuebles')
  .then(res=>{
      this.setState({inmueble: res.data});
      console.log(this.state.inmueble)
  }).catch((error)=>{
      console.log(error);
  });
}

  render() {
    const carouselSettings = {
      
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:true
      
    };
    return (
      <>
        <body>
          <div className="verinm">
            {this.state.inmueble.map((sitio, index) => {
              if(sitio.tipopropiedad === "Habitacion" &&
                
                 sitio.ciudad === localStorage.getItem("destino")
              ){
                    return (
                        <div className="InmueblesHost" key={sitio.id}>
                           <Slider {...carouselSettings}>
                      <div>
                        <img className="inmueble_fot" src={sitio.imagen1} alt="Inmueble 1" />
                      </div>
                      <div>
                       <img className="inmueble_fot" src={sitio.imagen2} alt="Inmueble 2" />
                      </div>
                      <div>
                        <img className="inmueble_fot" src={sitio.imagen3} alt="Inmueble 1" />
                      </div>
                      <div>
                        <img className="inmueble_fot" src={sitio.imagen4} alt="Inmueble 1" />
                      </div>
                      <div>
                        <img className="inmueble_fot" src={sitio.imagen5} alt="Inmueble 1" />
                      </div>
                  </Slider>
                          <h3 className="inmueble_name">{sitio.tipopropiedad}</h3>
                          <div className="inmueble_info">
                            <p className="inmDet">{sitio.ciudad}</p>
                            <p className="inmCamas">{sitio.tituloanuncio}</p>
                            <p className="inmPrecio">{sitio.capacidad}</p>
                          </div>
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

export default Habitacion;