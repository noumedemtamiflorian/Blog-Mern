import React, { useEffect, useState } from "react";
import { getCategories } from "../../../services/api";
import useModalCategories from "../../../utils/hooks/useModalCategories";
import usePagination from "../../../utils/hooks/usePagination";

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);

    const { isOpen, openModal, category, Modal } = useModalCategories({
        onUpdateCategories: setCategories,
    });

    const { Pagination, currentArticles } = usePagination({
        articles: categories,
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
