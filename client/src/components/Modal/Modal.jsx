import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import './Modal.css';

export const Modal = ({ open, close, children }) => {

  if(!open) return null;

  return createPortal(
    <>
        <div className='modal'>
            <div className="modal-content">{children}</div>
            <button onClick={ () => close(false) }>Close</button>
        </div>
    </>, document.getElementById('overlay')
  )
}

export default Modal