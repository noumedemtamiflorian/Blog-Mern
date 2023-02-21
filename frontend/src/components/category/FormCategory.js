// Import de la librairie React
import React from "react";
// Composant FormCategory, prend en paramètres category,
// register, errors, setIsOpen et onSubmit
const FormCategory = ({ category, register, errors, setIsOpen, onSubmit }) => {
    // Condition ternaire pour déterminer le message du bouton selon le mode
    const messageButton = !category ? "Enregistrer" : "Modifie";
    // Rendu du composant
    return (
        <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Boite modal</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={() => setIsOpen(false)}
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
                                {messageButton}
                            </button>
                        </form>{" "}
                    </div>
                    {/* Bouton de fermeture de la modal */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setIsOpen(false)}
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
