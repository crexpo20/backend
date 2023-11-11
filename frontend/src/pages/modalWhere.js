import React, {Component} from 'react';
class Donde extends Component{
  constructor(props) {
    super(props);
    this.state = {
      };
    
  }
 
  cambiar = (dpto) =>{
    localStorage.setItem("destino", dpto);
  }
 
    render(){
     
      
      return(
        <>
        <button onClick={() => this.cambiar("La Paz")}>
          {localStorage.getItem("destino")}
        </button>
 </>  );
    }
  }
  export default Donde;
