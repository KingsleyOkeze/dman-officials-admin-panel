import React from "react";
import "../styles/components-styles/ConfirmationModal.css"; // Create a separate CSS file for styling

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Confirmation</h2>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button className="modal-cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="modal-confirm-button" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;