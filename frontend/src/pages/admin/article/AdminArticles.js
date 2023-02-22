import React, { useEffect, useState } from "react";
import { getCategories } from "../../../services/api";

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getCategories().then((res) => {
            console.log(res);
            setArticles(res.data);
        });
    }, []);

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Articles</h2>
                <div className="form-inline">
                    <button className="btn btn-primary">Create Article</button>
                </div>
            </div>

            <table className="table text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{article.title}</td>
                            <td>{article.description}</td>
                            <td>
                                <div className="btn-group">
                                    <button className="btn btn-primary">
                                        Edit
                                    </button>
                                    <button className="btn btn-danger">
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

export default AdminArticles;
