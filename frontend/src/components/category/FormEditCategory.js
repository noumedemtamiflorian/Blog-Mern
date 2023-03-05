import React, { useState } from "react";

const FormEditCategory = ({ onSubmit, closeModal, category }) => {
    const [formValues, setFormValues] = useState({
        title: category.title,
    });
    const [formErrors, setFormErrors] = useState({
        title: "",
    });
    const validateField = (name, value) => {
        let errorMessage = "";

        switch (name) {
            case "title":
                if (value.length < 3) {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        validateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues);
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
                            Modification de la categorie {category.title}
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
                                    required
                                    defaultValue={category.title}
                                    type="text"
                                    name="title"
                                    id="title"
                                    className={`form-control ${
                                        formErrors.title ? "is-invalid" : ""
                                    }`}
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
                                className="btn btn-primary mt-3"
                                disabled={!isFormValid()}
                            >
                                Modifier
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

export default FormEditCategory;
