// import des bibliothèques et des fonctions nécessaires
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../services/api";
import useModalComment from "../utils/hooks/useModalComment";

// composant pour afficher le détail d'un article
const DetailPost = () => {
    // récupérer l'id de l'article à afficher depuis l'URL
    const { id } = useParams();
    // état local pour stocker l'article à afficher
    const [article, setArticle] = useState(null);
    // utiliser le hook "useModalComment" pour afficher une modale pour les commentaires
    const { isOpen, Modal, openModal, comment } = useModalComment({
        setArticle: setArticle,
    });
    // récupérer les données de l'article depuis l'API et les stocker dans l'état local
    useEffect(() => {
        getArticle(id).then((res) => {
            setArticle(res.data);
        });
    }, []);

    // rendre l'affichage de l'article et de ses commentaires
    return (
        <div className="container flex-grow-1">
            <div className="p-5 w-100 m-auto">
                {/* Afficher le titre de l'article */}
                <h1 className="text-center mb-4"> {article?.title}</h1>

                <p className="text-center w-100">
                    {/* Afficher l'image de l'article */}
                    <img
                        src={article?.image}
                        alt={`${article?.title}`}
                        className="article-detail-image"
                    />
                </p>
                {/* Afficher la description de l'article */}
                <p className="mb-4">{article?.description}</p>
                {/* Afficher le contenu de l'article */}
                <p className="mb-4">{article?.content}</p>
                {/* Afficher la section des commentaires */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    {/* Afficher le titre de la section des commentaires */}
                    <h2>Commentaires</h2>
                    {/* Afficher le bouton pour ajouter un commentaire */}
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
                {/* Si l'article n'a aucun commentaire, afficher un message */}
                {article?.comments?.length === 0 ? (
                    <p>Aucun commentaire pour cet article.</p>
                ) : (
                    <>
                        {/* Sinon, afficher chaque commentaire de l'article */}
                        {article?.comments.map((comment, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-body">
                                    {/* Afficher le contenu du commentaire */}
                                    <p className="card-text">
                                        {comment.content}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            {/* Afficher le bouton pour éditer le commentaire */}
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
                                            {/* Afficher le bouton pour supprimer le commentaire */}
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
                {/* Afficher de Modal */}

                {isOpen ? <Modal /> : null}
            </div>
        </div>
    );
};

export default DetailPost;
