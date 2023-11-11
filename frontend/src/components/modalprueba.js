import Modal from "./modals";
import { useState } from "react";

function ModalPrueba() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </div>
  );
}

export default ModalPrueba;