import React from "react";

const ModalErrorMessage = ({ closeModal, messageError }) => {
    return (
        <div className="modal d-block fade show">
            <div className="modal-dialog">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">Message D'erreurs</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={closeModal}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body text-danger">{messageError}</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={closeModal}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalErrorMessage;
