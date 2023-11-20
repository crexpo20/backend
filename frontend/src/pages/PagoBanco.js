import React, { Component } from 'react';
import '../CSS/PagoB.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
class PagoBanco extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inmueble: {},
      anfitrion: {},
      showFechaModal: false,
      showHuespedModal: false,
    };

    this.getInmuebles = this.getInmuebles.bind(this);
  }

  componentDidMount() {
    const id = this.props.params.espaciosID;
    this.getInmuebles();
  }

  getInmuebles = async () => {
    try {
      const response = await axios.get(`https://telossuite.amicornios.com/api/getinmuebles/${this.props.params.espaciosID}`);
      const anfitriondata = await axios.get(`https://telossuite.amicornios.com/api/getusuario/${response.data.idusuario}`);
      this.setState({ inmueble: response.data, anfitrion: anfitriondata.data });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
        <div className='container'>
          <div className="pagoGrid">
              <h1>CONFIRMACION DEL PAGO</h1>
              <p>El monto a cancelar es de Bs. 150</p>
              <div>
                <Link to={`/Confirmar/${this.state?.inmueble?.idinmueble}`}>
                  <button>Confirmar</button>
                </Link>
                <Link to={`/Reserva/${this.state?.inmueble?.idinmueble}`}>
                  <button>Cancelar</button>
                </Link>
              </div>
            </div>
        </div>
    );
  }
}

export default withParams(PagoBanco);
