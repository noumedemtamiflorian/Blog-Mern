// Importation de la bibliothèque React
import React from "react";

// Définition d'un composant ModalErrorMessage avec 2 propriétés
//  : closeModal et messageError
const ModalErrorMessage = ({ closeModal, messageError }) => {
    return (
        <div className="modal d-block fade show">
            <div className="modal-dialog">
                <div className="modal-content ">
                    <div className="modal-header">
                        {/* Titre de la fenêtre modale */}
                        <h5 className="modal-title">Message D'erreurs</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={closeModal}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    {/* Corps de la fenêtre modale avec le message d'erreur passé en paramètre */}
                    <div className="modal-body text-danger">{messageError}</div>
                    <div className="modal-footer">
                        {/* Bouton pour fermer la fenêtre modale */}
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
