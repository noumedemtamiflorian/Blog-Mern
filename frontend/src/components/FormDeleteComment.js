import React from "react";

const FormDeleteComment = ({ handleDelete, closeModal, comment }) => {
    return (
        <div className="modal fade show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Édition d'un commentaire
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
                        <p>Voulez-vous supprimer ce commentaire ?</p>
                        <p>{comment.content}</p>
                        <button
                            onClick={handleDelete}
                            className="btn btn-danger"
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

export default FormDeleteComment;
