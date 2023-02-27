// Importer les modules React, useEffect et useState depuis la bibliothèque "react"
import React, { useEffect, useState } from "react";
// Importer la fonction getCategories depuis le module d'API pour
// obtenir une liste de catégories à partir de l'API
import { getCategories } from "../../services/api";

// Définir un composant de formulaire React pour créer un nouvel article
const FormCreateArticle = ({ register, errors, closeModal, onSubmit }) => {
    // Définir un état pour l'aperçu de l'image qui est initialement nul
    const [imagePreview, setImagePreview] = useState(null);
    // Définir un état pour les catégories qui est initialement
    // un tableau vide avec un objet
    const [categories, setCategories] = useState([{}]);
    // Définir une fonction pour gérer la prévisualisation de l'image
    const handleImagePreview = (e) => {
        // Si un fichier est sélectionné dans l'input file
        if (e.target.files[0]) {
            // Créer une URL temporaire pour l'aperçu de l'image à partir
            // du fichier sélectionné
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        } else {
            // Sinon, réinitialiser l'aperçu de l'image à null
            setImagePreview(null);
        }
    };
    // Utiliser le hook useEffect pour récupérer les catégories de l'API
    // au moment du montage du composant
    useEffect(() => {
        // Appeler la fonction asynchrone getCategories() qui
        // renvoie une promesse avec les données des catégories
        getCategories()
            // Si la promesse est résolue avec succès
            .then((res) => {
                // Mettre à jour l'état des catégories avec les données récupérées
                setCategories(res.data);
            })
            // Si la promesse est rejetée avec une erreur
            .then((error) => {
                // Ne rien faire pour le moment (à remplacer par une gestion
                // d'erreur appropriée)
            });
        // Passer un tableau vide comme dépendance pour que useEffect s'exécute
        // uniquement au montage du composant
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
                            onSubmit={onSubmit}
                        >
                            {/* Champ titre */}
                            <div className="form-group mb-4">
                                <label htmlFor="title">Titre</label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors?.title ? "is-invalid" : ""
                                    }`}
                                    id="title"
                                    name="title"
                                    placeholder="Titre"
                                    {...register("title", { required: true })}
                                />
                                {errors?.title && (
                                    <div className="invalid-feedback">
                                        Le titre est requis
                                    </div>
                                )}
                            </div>
                            {/* Champ description */}
                            <div className="form-group mb-4">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors?.description ? "is-invalid" : ""
                                    }`}
                                    id="description"
                                    name="description"
                                    placeholder="Description"
                                    {...register("description", {
                                        required: true,
                                    })}
                                />
                                {errors?.description && (
                                    <div className="invalid-feedback">
                                        La description est requise
                                    </div>
                                )}
                            </div>
                            {/* Champ image */}
                            <div className="form-group mb-4">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="file"
                                    className={`form-control-file ${
                                        errors?.image ? "is-invalid" : ""
                                    }`}
                                    accept="image/*"
                                    id="image"
                                    name="image"
                                    {...register("image", { required: true })}
                                    onChange={handleImagePreview}
                                />
                                {/* Affichage de l'aperçu de l'image */}
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt=" Preview"
                                        className="mt-3 img-fluid"
                                    />
                                )}
                                {errors?.image && (
                                    <div className="invalid-feedback">
                                        L'image est requise
                                    </div>
                                )}
                            </div>
                            {/* Champ catégorie */}
                            <div className="form-group mb-4">
                                <label htmlFor="category">Catégorie</label>
                                <select
                                    className={`form-control ${
                                        errors?.category ? "is-invalid" : ""
                                    }`}
                                    id="category"
                                    name="category"
                                    {...register("category", {
                                        required: true,
                                    })}
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
                                {errors?.category && (
                                    <div className="invalid-feedback">
                                        La catégorie est requise
                                    </div>
                                )}
                            </div>
                            {/* Champ de contenu */}
                            <div className="form-group mb-4">
                                <label htmlFor="content">Contenu</label>
                                <textarea
                                    className={`form-control ${
                                        errors?.content ? "is-invalid" : ""
                                    }`}
                                    id="content"
                                    name="content"
                                    rows="5"
                                    {...register("content", { required: true })}
                                ></textarea>
                                {errors?.content && (
                                    <div className="invalid-feedback">
                                        Le contenu est requis
                                    </div>
                                )}
                            </div>
                            {/* Bouton de soumission */}
                            <div className="row">
                                <div className="col text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Envoyer
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
