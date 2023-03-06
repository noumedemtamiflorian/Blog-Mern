// importation des modules React et useEffect, useState pour l'utilisation de hooks
import React, { useEffect, useState } from "react";
// importation de la fonction getCategories pour afficher tout les categories
import { getCategories } from "../../../services/api";
// importation de la fonction useModal pour gerer les modals d'edition,
// creation et suppression
import useModalCategories from "../../../utils/hooks/useModalCategories";
import usePagination from "../../../utils/hooks/usePagination";

// Composant Pour Gerer le CRUD sur les categories
const AdminCategories = () => {
    const [categories, setCategories] = useState([]);

    const { isOpen, openModal, category, Modal } = useModalCategories({
        onUpdateCategories: setCategories,
    });

    const { Pagination, currentArticles } = usePagination({
        articles: categories,
        perPage: 5,
    });

    // Utilisation d'un effet qui se déclenche lors du montage du composant et permet
    // de récupérer les catégories depuis l'API
    useEffect(() => {
        // Appel de la fonction getCategories de l'API
        getCategories().then((res) => {
            // Mise à jour du state categories avec les données récupérées depuis l'API
            setCategories(res.data);
        });
    }, []);

    return (
        <div className="container">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Categories</h2>
                <div className="form-inline">
                    {/* Create button */}
                    <button
                        className="btn btn-primary"
                        onClick={() => openModal(category, "create")}
                    >
                        Create Category
                    </button>
                </div>
            </div>
            {/* Table */}
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Loop through categories array */}
                    {currentArticles?.map((category, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{category.title}</td>
                            <td>
                                {/* Edit and delete buttons */}
                                <div className="btn-group">
                                    <button
                                        onClick={() =>
                                            openModal(category, "edit")
                                        }
                                        className="btn btn-primary"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            openModal(category, "delete")
                                        }
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal */}
            {isOpen ? <Modal /> : null}
            <Pagination />
        </div>
    );
};

export default AdminCategories;
