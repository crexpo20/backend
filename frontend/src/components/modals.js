import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import '../CSS/logAnf.css'
const Modal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-contenido">
       <div className="price-filter-container">
       <h1>Modal Login Form</h1>
    <button id="test" class="login">Login</button>
    <h1>Modal Login Form</h1>
    <div class="modal-cont">
        <div class="modal-box">
            <span class="close">&times;</span>
            <form action="" class="login-box">
              <h1> Login Page </h1>
                <label for="">Username</label>
                <input type="text" class="name" required/>
                <label for="">Password</label>
                <input type="password" class="password" required/>
              <button class="login-button">Login</button>
                <div class="close-forgot">
                    <button class="cancel">Cancel</button>
                </div>
            </form>
        </div>
    </div>
      </div>
    </div>
  );
};

export default Modal;