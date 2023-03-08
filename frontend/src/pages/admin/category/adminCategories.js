// import des bibliothèques et des fonctions nécessaires
import React, { useEffect, useState } from "react";
// import de getCategories pour recuperer toutes les categories
import { getCategories } from "../../../services/api";
// import de useModalCategories pour gerer l'ajout, la suppression et l'edition des categories
import useModalCategories from "../../../utils/hooks/useModalCategories";
// import de usePagination pour gerer la pagination
import usePagination from "../../../utils/hooks/usePagination";

// composant pour adminisrer les categories
const AdminCategories = () => {
    //
    const [categories, setCategories] = useState([]);

    const { isOpen, openModal, category, Modal } = useModalCategories({
        onUpdateCategories: setCategories,
    });
    // Get the functions and variables needed from the custom hook
    const { Pagination, currentElements } = usePagination({
        elements: categories,
        perPage: 5,
    });

    useEffect(() => {
        getCategories().then((res) => {
            setCategories(res.data);
        });
    }, []);

    return (
        <div className="container my-4 flex-grow-1">
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
            {currentElements.length === 0 ? (
                <p className="text-center">Aucune categorie pour le moment</p>
            ) : (
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
                        {currentElements?.map((category, index) => (
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
            )}
            {/* Modal */}
            {isOpen ? <Modal /> : null}
            <Pagination />
        </div>
    );
};

export default AdminCategories;
