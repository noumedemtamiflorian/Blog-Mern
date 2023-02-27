// Importer les modules React
import React from "react";

// Ce code définit un composant fonctionnel React ModalDeleteElement
// qui prend en paramètres les propriétés suivantes :
// - article : un objet qui représente l'article à supprimer
// - closeModal : une fonction pour fermer la modal
// - handleDelete : une fonction pour gérer la suppression de l'article
const ModalDeleteElement = ({ article, closeModal, handleDelete }) => {
    return (
        // Le composant retourne une modal Bootstrap avec une fenêtre modale,
        //  une boîte de dialogue et un contenu modal
        <div className="modal d-block fade show">
            <div className="modal-dialog">
                <div className="modal-content ">
                    {/* En-tête de la modal contenant le titre de la modal et un
                  bouton pour fermer la modal */}
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Suppression de l'article {article.title}
                        </h5>
                        <button
                            type="button"
                            className="close"
                            onClick={closeModal}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    {/* Corps de la modal contenant une demande de confirmation de suppression et un  */}
                    <div className="modal-body">
                        <div>
                            Voulez vous supprimer l'article qui a pour titre{" "}
                            {article.title}
                        </div>
                        <button
                            onClick={handleDelete}
                            type="submit"
                            className="btn btn-danger mt-3"
                        >
                            Supprimer
                        </button>
                    </div>
                    {/* Pied de la modal contenant un bouton pour fermer la modal */}
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

export default ModalDeleteElement;
