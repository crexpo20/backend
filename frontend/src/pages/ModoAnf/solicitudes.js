import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../CSS/cards.css';
import axios from "axios";
class Solicitudes extends Component {
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
          SOLI
        </body>
      </>
    );
  }
}

export default Solicitudes;