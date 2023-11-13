import React, { Component } from 'react';
import '../CSS/PagoB.css';
import { Link, Outlet } from 'react-router-dom';

class PagoBanco extends Component {
  render() {
    return (
        <div className='container'>
          <div className="pagoGrid">
              <h1>CONFIRMACION DEL PAGO</h1>
              <p>El monto a cancelar es de Bs. 150</p>
              <div>
                <Link to='/Confirmar'>
                  <button>Confirmar</button>
                </Link>
                <Link to='/Reserva'>
                  <button>Cancelar</button>
                </Link>
              </div>
            </div>
        </div>
    );
  }
}

export default PagoBanco;
