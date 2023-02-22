// Import de la librairie React
import React from "react";
// Composant FormCategory, prend en paramètres category,
// register, errors, setIsOpen et onSubmit
const FormCategory = ({ register, errors, closeModal, onSubmit }) => {
    // Rendu du composant
    return (
        <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Creation d'une categorie
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
                        {/* Formulaire */}
                        <form onSubmit={onSubmit}>
                            {/* Champ titre */}
                            <div className="form-group">
                                <label htmlFor="title">
                                    Titre de la catégorie
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className={`form-control ${
                                        errors?.title ? "is-invalid" : ""
                                    }`}
                                    {...register("title", {
                                        required: true,
                                    })}
                                />
                                {/* Affichage de l'erreur si le titre est manquant */}
                                {errors?.title && (
                                    <div className="invalid-feedback">
                                        Le titre est obligatoire
                                    </div>
                                )}
                            </div>
                            {/* Bouton d'envoi du formulaire */}
                            <button
                                type="submit"
                                className="btn btn-primary mt-3"
                            >
                                Enregistrer
                            </button>
                        </form>{" "}
                    </div>
                    {/* Bouton de fermeture de la modal */}
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

// Export du composant FormCategory
export default FormCategory;
