import React from "react";

const ModalDeleteElement = ({ category, closeModal, handleDelete }) => {
    return (
        <div className="modal d-block fade show">
            <div className="modal-dialog">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Suppression de la categorie {category.title}
                        </h5>
                        <button
                            type="button"
                            className="close"
                            onClick={closeModal}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div>
                            Voulez vous supprimer la categorie qui a pour titre{" "}
                            {category.title}
                        </div>
                        <button
                            onClick={handleDelete}
                            type="submit"
                            className="btn btn-danger mt-3"
                        >
                            Supprimer
                        </button>
                    </div>
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