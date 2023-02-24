import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/api";

const FormCreateArticle = ({ register, errors, closeModal, onSubmit }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [categories, setCategories] = useState([{}]);
    const handleImagePreview = (e) => {
        if (e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        } else {
            setImagePreview(null);
        }
    };

    useEffect(() => {
        getCategories()
            .then((res) => {
                setCategories(res.data);
            })
            .then((error) => {});
    }, []);

    return (
        <div className="modal fade show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
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
                        <form
                            className="mx-auto my-5 bg-dark text-light p-5 col-12 rounded-lg"
                            onSubmit={onSubmit}
                        >
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

// Export du composant FormCategory
export default FormCreateArticle;
