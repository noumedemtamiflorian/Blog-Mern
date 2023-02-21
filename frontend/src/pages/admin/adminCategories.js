import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/api";

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);

    const [categoryTitle, setCategoryTitle] = useState("");

    useEffect(() => {
        getCategories().then((res) => {
            setCategories(res.data);
        });
    }, []);

    const handleCreateCategory = () => {
        setCategories([...categories, { title: categoryTitle }]);
        setCategoryTitle("");
    };

    const handleDeleteCategory = (index) => {
        const updatedCategories = categories.filter((c, i) => i !== index);
        setCategories(updatedCategories);
    };

    const handleEditCategory = (index, newTitle) => {
        const updatedCategories = [...categories];
        updatedCategories[index].title = newTitle;
        setCategories(updatedCategories);
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Categories</h2>
                <div className="form-inline">
                    <button
                        className="btn btn-primary"
                        onClick={handleCreateCategory}
                    >
                        Create Category
                    </button>
                </div>
            </div>

            <table className="table text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{category.title}</td>
                            <td>
                                <div className="btn-group">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            handleEditCategory(
                                                index,
                                                category.title
                                            )
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleDeleteCategory(index)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;
