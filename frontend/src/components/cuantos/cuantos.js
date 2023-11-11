import React, { useContext, useState, createContext } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";

const ModalCuantosContext = createContext();

const ModalCuantos = ({ children, isOpen, onClose }) => {
  const modalTransition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
    config: {
      duration: 100,
    },
  });

  const springs = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
    config: {
      duration: 100,
    },
  });

  return modalTransition((styles, isOpen) =>
    isOpen && (
      <animated.div style={styles} className="react-modal-overlay" onClick={onClose}>
        <animated.div style={springs} className="react-modal-wrapperH" onClick={(e) => e.stopPropagation()}>
          <div className="react-modal-content">
            <ModalCuantosContext.Provider value={{ onClose }}>{children}</ModalCuantosContext.Provider>
          </div>
        </animated.div>
      </animated.div>
    )
  );
};

const DismissButton = ({ children, className }) => {
  const { onClose } = useContext(ModalCuantosContext);

  return (
    <button type="button" className="btn-closed" onClick={onClose}>
      {children}
    </button>
  );
};

const ModalCuantosHeader = ({ children }) => {
  return (
    <div className="react-modal-header">
      <div className="react-modal-title">{children}</div>
      <DismissButton className="btn-closed">&times;</DismissButton>
    </div>
  );
};

const ModalCuantosBody = ({ onValuesChange }) => {
  const { onClose } = useContext(ModalCuantosContext);
  const [adultos, setAdultos] = useState(localStorage.getItem("huespedes") || "");
  const [infantes, setInfantes] = useState(localStorage.getItem("niños") || "");
  const [mascotas, setMascotas] = useState(localStorage.getItem("mascotas") || "");
  const [tipo, setTipo] = useState(localStorage.getItem("tipo") || "");

  const handleAdultosChange = (event) => {
    const newValue = event.target.value;
    setAdultos(newValue);
    localStorage.setItem("huespedes", newValue); // Actualiza el valor en localStorage
  };

  const handleInfantesChange = (event) => {
    const newValue = event.target.value;
    setInfantes(newValue);
    localStorage.setItem("niños", newValue); // Actualiza el valor en localStorage
  };

  const handleMascotasChange = (event) => {
    const newValue = event.target.value;
    setMascotas(newValue);
    localStorage.setItem("mascotas", newValue); // Actualiza el valor en localStorage
  };

  const handleTipoChange = (event) => {
    const newValue = event.target.value;
    setTipo(newValue);
    localStorage.setItem("tipo", newValue); // Actualiza el valor en localStorage
  };

  const handleButtonClick = () => {
    // Llamar a la función onValuesChange y pasar los valores
    onValuesChange(adultos, infantes, mascotas, tipo);
    onClose();
  };

  return (
    <div className="react-modal-body">
      <div id="body-huespedes">
        <div id="huesped-lista">
          <a id="huesped-a"> Adultos: </a>
          <input
            type="number"
            placeholder={localStorage.getItem("huespedes")}
            id="tentacles"
            name="tentacles"
            min="1"
            max="100"
            value={adultos}
            onChange={handleAdultosChange}
          />
        </div>
        <div id="huesped-lista">
          <a id="huesped-a"> Infantes: </a>
          <input
            type="number"
            placeholder={localStorage.getItem("niños")}
            id="tentacles"
            name="tentacles"
            min="0"
            max="100"
            value={infantes}
            onChange={handleInfantesChange}
          />
        </div>
        <div id="huesped-lista">
          <a id="huesped-a"> Mascotas: </a>
          <input
            type="number"
            placeholder={localStorage.getItem("mascotas")}
            id="tentacles"
            name="tentacles"
            min="0"
            max="100"
            value={mascotas}
            onChange={handleMascotasChange}
          />
        </div>
        <div id="huesped-lista">
          <a id="huesped-a"> tipo: </a>
          <input
            type="text"
            placeholder={localStorage.getItem("tipo")}
            id="tentacles"
            name="tentacles"
            value={tipo}
            onChange={handleTipoChange}
          />
        </div>
      </div>
      <button type="button" onClick={handleButtonClick}>Aceptar</button>
    </div>
  );
};


const ModalCuantosFooter = ({ children }) => {
  return (
    <div className="react-modal-footer">
      {children}
    </div>
  );
};

ModalCuantos.Header = ModalCuantosHeader;
ModalCuantos.Body = ModalCuantosBody;
ModalCuantos.Footer = ModalCuantosFooter;
ModalCuantos.DismissButton = DismissButton;

export default ModalCuantos;