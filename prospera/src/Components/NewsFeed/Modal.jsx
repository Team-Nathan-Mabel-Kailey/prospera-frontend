// Modal.jsx
import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, handleGoToTopics }) => {
    return (
        show ? (
            <div className="modalBackdrop">
                <div className="modalContent">
                    <h2>Complete Topic Selection</h2>
                    <p>You have not selected any topics yet. Please go to the topic selection page to choose your interests.</p>
                    <div className="modalActions">
                        <button onClick={handleClose}>Close</button>
                        <button onClick={handleGoToTopics}>Go to Topic Selection</button>
                    </div>
                </div>
            </div>
        ) : null
    );
};

export default Modal;
