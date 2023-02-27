// Import de React, useEffect et useState depuis la bibliothèque React
import React, { useEffect, useState } from "react";
// Import de la fonction getCategories qui permet de récupérer toutes les catégories
import { getCategories } from "../../services/api";
// composant pour editer un article
const FormEditArticle = ({
    register, // fonction register de react-hook-form
    errors, // objet contenant les erreurs de validation
    closeModal, // fonction pour fermer la modal
    onSubmit, // fonction pour soumettre le formulaire
    article, // article à éditer
}) => {
    // State pour l'aperçu de l'image et la gestion de la modification de l'image
    const [imagePreview, setImagePreview] = useState(article.image);
    // State pour stocker les catégories récupérées depuis l'API
    const [categories, setCategories] = useState([]);
    // Fonction pour gérer l'aperçu de l'image avant l'envoi du formulaire
    const handleImagePreview = (e) => {
        if (e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        } else {
            setImagePreview(null);
        }
    };
    // Utilisation du hook useEffect pour récupérer les catégories depuis
    // l'API lors du chargement du composant
    useEffect(() => {
        // Appel de la fonction getCategories depuis le service api pour
        // récupérer les catégories
        getCategories()
            .then((res) => {
                // Stockage des catégories dans le state categories
                setCategories(res.data);
            })
            .then((error) => {
                // Gestion des erreurs éventuelles
            });
    }, []);

    return (
        <div className="modal fade show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* Header de la modal */}
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Edition de l'article {article.title}
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
                        {/* Formulaire de création d'article */}
                        <form
                            className="mx-auto my-5 bg-dark text-light p-5 col-12 rounded-lg"
                            onSubmit={onSubmit}
                        >
                            {/* Champ titre */}
                            <div className="form-group mb-4">
                                <label htmlFor="title">Titre</label>
                                <input
                                    defaultValue={article.title}
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
                                    defaultValue={article.description}
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
                                    {...register("image")}
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
                                    defaultValue={article.category._id}
                                >
                                    {/* Option pour sélectionner une catégorie */}
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
                                    defaultValue={article.content}
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
                            <div className="row">
                                <div className="col text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Modifier
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

// Export du composant FormEditArticle
export default FormEditArticle;
