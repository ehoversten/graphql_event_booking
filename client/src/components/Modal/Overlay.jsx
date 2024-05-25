import React from 'react'
import { createPortal } from 'react-dom';

function Overlay({ closeModal, children }) {
  return createPortal(
    <div className='overlay' >
        {children}
    </div>, document.getElementById('overlay')
  )
}

export default Overlay