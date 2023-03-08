// Importation des modules nécessaires pour React
import React, { useState } from "react";
// Définition du composant FormCreateComment
const FormCreateComment = ({ handleOnSubmit, closeModal }) => {
    // Définition des états du formulaire
    const [formValues, setFormValues] = useState({ content: "" });
    const [formErrors, setFormErrors] = useState({ content: "" });

    // Gestion du changement de valeurs des champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        validateField(name, value);
    };

    // Validation du champ en fonction de sa valeur
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

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        handleOnSubmit(formValues);
    };

    // Vérification si le formulaire est valide
    const isFormValid = () => {
        return Object.keys(formErrors).every((key) => formErrors[key] === "");
    };

    // Rendu du composant FormCreateComment
    return (
        <div className="modal fade show d-block">
            {" "}
            {/* Bloc conteneur du formulaire */}
            <div className="modal-dialog">
                {/* Conteneur principal de la modale */}
                <div className="modal-content">
                    {" "}
                    {/* Conteneur du contenu de la modale */}
                    <div className="modal-header">
                        {/* Entête de la modale */}
                        <h5 className="modal-title">Ajout d'un commentaire</h5>
                        {/* Titre de la modale */}
                        <button
                            type="button"
                            className="close"
                            onClick={closeModal}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {/* Contenu principal de la modale */}
                        <form onSubmit={handleSubmit}>
                            {" "}
                            {/* Formulaire de création de commentaire */}
                            <div className="form-group">
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
                                {/* Affichage du message d'erreur si le champ de contenu
                                 du commentaire est invalide */}
                                {formErrors.content && (
                                    <div className="invalid-feedback">
                                        {formErrors.content}
                                    </div>
                                )}
                            </div>
                            {/* Bouton de soumission du formulaire */}
                            <button
                                type="submit"
                                className="btn mt-3 btn-primary"
                                disabled={!isFormValid()}
                            >
                                Ajouter
                            </button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        {/* Pied de la modale */}
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

// Exportation du composant FormCreateComment
export default FormCreateComment;
