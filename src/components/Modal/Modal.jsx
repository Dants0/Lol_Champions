import React from 'react'
import './modal.css'

const Modal = (props) => {
    if (!props.show) {
        return null
    }

    return (
        <div className='modal' onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title">
                        {props.title}
                        {console.log(props)}
                    </div>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="btnCloseModal">X</button>
                </div>
            </div>
        </div>
    )
}

export default Modal