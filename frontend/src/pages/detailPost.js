import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../services/api";
import useModalComment from "../utils/hooks/useModalComment";

const DetailPost = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    const { isOpen, Modal, openModal, comment } = useModalComment({
        setArticle: setArticle,
    });

    useEffect(() => {
        getArticle(id).then((res) => {
            setArticle(res.data);
        });
    }, []);

    return (
        <div className="container">
            <div className="p-5 w-100 m-auto">
                <h1 className="text-center mb-4"> {article?.title}</h1>
                <p className="text-center w-100">
                    <img
                        src={article?.image}
                        alt={`${article?.title}`}
                        className="article-detail-image"
                    />
                </p>
                <p className="mb-4">{article?.description}</p>
                <p className="mb-4">{article?.content}</p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Commentaires</h2>
                    <button
                        onClick={() =>
                            openModal(
                                { article: article._id, ...comment },
                                "create"
                            )
                        }
                        className="btn btn-sm btn-primary"
                    >
                        Ajouter un commentaire
                    </button>
                </div>
                {article?.comments?.length === 0 ? (
                    <p>Aucun commentaire pour cet article.</p>
                ) : (
                    <>
                        {article?.comments.map((comment, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-body">
                                    <p className="card-text">
                                        {comment.content}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button
                                                onClick={() =>
                                                    openModal(
                                                        {
                                                            article:
                                                                article._id,
                                                            ...comment,
                                                        },
                                                        "edit"
                                                    )
                                                }
                                                className="btn btn-sm btn-primary"
                                            >
                                                Editer
                                            </button>
                                            <button
                                                onClick={() =>
                                                    openModal(comment, "delete")
                                                }
                                                className="btn btn-sm btn-danger"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
                {isOpen ? <Modal /> : null}
            </div>
        </div>
    );
};

export default DetailPost;
