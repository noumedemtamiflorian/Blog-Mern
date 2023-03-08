// Importations de bibliothèques React
import React, { useState, useEffect } from "react";

const FormEditComment = ({ handleOnSubmit, closeModal, comment }) => {
    // State Hooks
    const [formValues, setFormValues] = useState({ content: "" });
    const [formErrors, setFormErrors] = useState({ content: "" });
    // Utilise useEffect pour mettre à jour les valeurs
    // de formulaire lorsque "comment" est modifié
    useEffect(() => {
        if (comment) {
            setFormValues({ ...comment });
        }
    }, [comment]);

    // Gère le changement des valeurs de formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        validateField(name, value);
    };

    // Valide les champs du formulaire
    const validateField = (name, value) => {
        let errorMessage = "";

        switch (name) {
            case "content":
                if (value.length < 5) {
                    errorMessage =
                        "Le contenu doit contenir au moins 5 caractères.";
                }
                break;
            default:
                break;
        }

        setFormErrors({
            ...formErrors,
            [name]: errorMessage,
        });
    };

    // Gère la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        handleOnSubmit(formValues);
    };

    // Vérifie si le formulaire est valide
    const isFormValid = () => {
        return Object.keys(formErrors).every((key) => formErrors[key] === "");
    };

    // Rendu de composant
    return (
        <div className="modal fade show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Ajout d'un commentaire</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={closeModal}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                {/* Champ de texte du commentaire */}
                                <textarea
                                    className={`form-control ${
                                        formErrors.content ? "is-invalid" : ""
                                    }`}
                                    rows="3"
                                    placeholder="Entrez votre commentaire"
                                    name="content"
                                    value={formValues.content}
                                    onChange={handleChange}
                                />
                                {/* Affichage des erreurs de validation */}
                                {formErrors.content && (
                                    <div className="invalid-feedback">
                                        {formErrors.content}
                                    </div>
                                )}
                            </div>
                            {/* Bouton de soumission */}
                            <button
                                type="submit"
                                className="btn mt-3 btn-primary"
                                disabled={!isFormValid()}
                            >
                                {comment ? "Modifier" : "Ajouter"}
                            </button>
                        </form>
                    </div>
                    {/* Bouton de fermeture de la modale */}
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

export default FormEditComment;
