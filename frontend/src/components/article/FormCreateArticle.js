// Importation de React et des Hooks useEffect et useState
import React, { useEffect, useState } from "react";
// Importation de la fonction getCategories de l'API pour récupérer toutes les catégories
import { getCategories } from "../../services/api";

//Formulaire pour creer un article
const FormCreateArticle = ({ closeModal, onSubmit }) => {
    // Déclaration de l'état des catégories avec useState
    const [categories, setCategories] = useState([]);
    // Déclaration de l'état des valeurs du formulaire avec useState
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        image: null,
        category: "",
        content: "",
    });
    // Déclaration de l'état des erreurs de formulaire avec useState
    const [formErrors, setFormErrors] = useState({
        title: "",
        description: "",
        image: "",
        category: "",
        content: "",
    });
    // Fonction qui gère le changement des champs de formulaire
    const handleInputChange = (e) => {
        // Destructurer les propriétés de l'événement cible : nom, valeur et fichiers
        const { name, value, files } = e.target;

        // Mettre à jour les valeurs du formulaire en étendant l'objet existant avec
        //  la nouvelle valeur

        setFormValues({
            ...formValues,
            [name]: files ? files[0] : value,
            // Si un fichier est inclus, sélectionner le premier fichier,
            //  sinon utiliser la valeur du champ
        });
        // Validation du champ
        validateField(name, files ? files[0] : value);
    };
    // Fonction qui valide un champ de formulaire
    const validateField = (name, value) => {
        let errorMessage = "";

        // Vérifier la valeur du champ en fonction de son nom
        switch (name) {
            case "title":
                if (value.trim().length < 5) {
                    errorMessage =
                        "Le titre doit contenir au moins 5 caractères.";
                }
                break;
            case "description":
                if (value.trim().length < 15) {
                    errorMessage =
                        "Le titre doit contenir au moins 15 caractères.";
                }
                break;
            case "image":
                if (!value) {
                    errorMessage = "Une image est requise.";
                }
                break;
            case "category":
                if (!value) {
                    errorMessage = "Veuillez sélectionner une catégorie.";
                }
                break;
            case "content":
                if (value.length < 50) {
                    errorMessage =
                        "Le contenu doit contenir au moins 50 caractères.";
                }
                break;
            default:
                break;
        }
        // Mise à jour des erreurs de formulaire
        setFormErrors({
            ...formErrors,
            [name]: errorMessage,
        });
    };
    // Fonction qui gère la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        // Soumission du formulaire si les champs sont valides
        if (isFormValid()) {
            onSubmit(formValues);
        }
    };
    // Fonction qui gère permet de savoir si un formulaire est valide
    const isFormValid = () => {
        return Object.keys(formErrors).every((key) => formErrors[key] === "");
    };
    // Effet secondaire pour récupérer les catégories
    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res.data))
            .catch((er) => er);
    }, []);

    return (
        <div className="modal fade show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* Header de la modal */}
                    <div className="modal-header">
                        <h5 className="modal-title">Creation d'un Article</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={closeModal}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {/* Formulaire de création d'article */}
                        <form
                            className="mx-auto my-5 bg-dark text-light p-5 col-12 rounded-lg"
                            onSubmit={handleSubmit}
                        >
                            {/* Champ titre */}
                            <div className="form-group mb-4">
                                <label htmlFor="title">Titre</label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        formErrors.title ? "is-invalid" : ""
                                    }`}
                                    id="title"
                                    name="title"
                                    placeholder="Titre"
                                    required
                                    value={formValues.title}
                                    onChange={handleInputChange}
                                />
                                {formErrors.title && (
                                    <div className="invalid-feedback">
                                        {formErrors.title}
                                    </div>
                                )}
                            </div>
                            {/* Champ description */}
                            <div className="form-group mb-4">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        formErrors.description
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    id="description"
                                    name="description"
                                    placeholder="Description"
                                    required
                                    value={formValues.description}
                                    onChange={handleInputChange}
                                />
                                {formErrors.description && (
                                    <div className="invalid-feedback">
                                        {formErrors.description}
                                    </div>
                                )}
                            </div>
                            {/* Champ image */}
                            <div className="form-group mb-4">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="file"
                                    className={`form-control-file ${
                                        formErrors.image ? "is-invalid" : ""
                                    }`}
                                    accept="image/*"
                                    id="image"
                                    name="image"
                                    required
                                    onChange={handleInputChange}
                                />
                                {/* Affichage de l'aperçu de l'image */}
                                {formValues.image && (
                                    <img
                                        src={URL.createObjectURL(
                                            formValues.image
                                        )}
                                        alt=" Preview"
                                        className="mt-3 img-fluid"
                                    />
                                )}
                                {formErrors.image && (
                                    <div className="invalid-feedback">
                                        {formErrors.image}
                                    </div>
                                )}
                            </div>
                            {/* Champ catégorie */}
                            <div className="form-group mb-4">
                                <label htmlFor="category">Catégorie</label>
                                <select
                                    className={`form-control ${
                                        formErrors.category ? "is-invalid" : ""
                                    }`}
                                    id="category"
                                    name="category"
                                    value={formValues.category}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {/* Option pour sélectionner une catégorie */}
                                    <option value="">
                                        Sélectionnez une catégorie
                                    </option>
                                    {categories.map((category, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={category._id}
                                            >
                                                {category.title}
                                            </option>
                                        );
                                    })}
                                </select>
                                {formErrors.category && (
                                    <div className="invalid-feedback">
                                        {formErrors.category}
                                    </div>
                                )}
                            </div>
                            {/* Champ de contenu */}
                            <div className="form-group mb-4">
                                <label htmlFor="content">Contenu</label>
                                <textarea
                                    className={`form-control ${
                                        formErrors.content ? "is-invalid" : ""
                                    }`}
                                    id="content"
                                    name="content"
                                    rows="5"
                                    required
                                    value={formValues.content}
                                    onChange={handleInputChange}
                                ></textarea>{" "}
                                {formErrors.content && (
                                    <div className="invalid-feedback">
                                        {formErrors.content}
                                    </div>
                                )}
                            </div>
                            {/* Bouton de soumission */}
                            <div className="row">
                                <div className="col text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={!isFormValid()}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        </form>
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

// Export du composant FormCreateArticle
export default FormCreateArticle;
