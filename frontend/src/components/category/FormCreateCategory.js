import React, { useState } from "react";
const FormCategory = ({ closeModal, onSubmit }) => {
    const [formValues, setFormValues] = useState({ title: "" });
    const [formErrors, setFormErrors] = useState({ title: "" });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        validateField(name, value);
    };
    const validateField = (name, value) => {
        let errorMessage = "";

        switch (name) {
            case "title":
                if (value.trim().length < 3) {
                    errorMessage =
                        "Le titre doit contenir au moins 3 caractères.";
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            onSubmit(formValues);
        }
    };

    const isFormValid = () => {
        return Object.keys(formErrors).every((key) => formErrors[key] === "");
    };

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
                        <form onSubmit={handleSubmit}>
                            {/* Champ titre */}
                            <div className="form-group">
                                <label htmlFor="title">
                                    Titre de la catégorie
                                </label>
                                <input
                                    required={true}
                                    type="text"
                                    name="title"
                                    id="title"
                                    className={`form-control ${
                                        formErrors.title ? "is-invalid" : ""
                                    }`}
                                    value={formValues.title}
                                    onChange={handleChange}
                                />
                                {formErrors.title && (
                                    <div className="invalid-feedback">
                                        {formErrors.title}
                                    </div>
                                )}
                            </div>

                            {/* Bouton d'envoi du formulaire */}
                            <button
                                type="submit"
                                disabled={!isFormValid()}
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
