import React, { useEffect, useState } from "react";
import { getArticles } from "../../../services/api";
import useModalArticles from "../../../utils/hooks/useModalArticles";

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);

    const { isOpen, openModal, article, Modal } = useModalArticles({
        onUpdateArticles: setArticles,
    });

    useEffect(() => {
        getArticles().then((res) => {
            setArticles(res.data);
        });
    }, []);

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Articles</h2>
                <div className="form-inline">
                    <button
                        onClick={() => openModal(article, "create")}
                        className="btn btn-primary"
                    >
                        Create Article
                    </button>
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
                                    <button
                                        onClick={() =>
                                            openModal(article, "edit")
                                        }
                                        className="btn btn-primary"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            openModal(article, "delete")
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
            {isOpen ? <Modal /> : null}
        </div>
    );
};

export default AdminArticles;
