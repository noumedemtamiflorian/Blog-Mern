// Importation de React et des Hooks useEffect et useState
import React, { useEffect, useState } from "react";
// Importation de la fonction getArticles de l'API
import { getArticles } from "../../../services/api";
import { selectFirstFiveWords } from "../../../utils/fonctions/selectFirstFiveWords";
// Importation du hook useModalArticles
import useModalArticles from "../../../utils/hooks/useModalArticles";
import usePagination from "../../../utils/hooks/usePagination";

// Définition du composant AdminArticles
const AdminArticles = () => {
    // Déclaration de l'état des articles avec useState
    const [articles, setArticles] = useState([]);

    // Utilisation du hook useModalArticles pour gérer l'ouverture des modaux
    const { isOpen, openModal, article, Modal } = useModalArticles({
        onUpdateArticles: setArticles,
    });

    const { Pagination, currentElements } = usePagination({
        elements: articles,
        perPage: 5,
    });

    // Utilisation de useEffect pour récupérer les articles
    useEffect(() => {
        getArticles().then((res) => {
            setArticles(res.data); // Mise à jour de l'état des articles
        });
    }, []);

    return (
        // Créer une div qui contient la table et les boutons
        <div className="container flex-grow-1">
            {/* Créez une div qui s'affiche en haut de la table  */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Articles</h2>
                {/* Créez un bouton qui ouvre une modale pour créer un article */}
                <div className="form-inline">
                    <button
                        onClick={() => openModal(article, "create")}
                        className="btn btn-primary"
                    >
                        Create Article
                    </button>
                </div>
            </div>
            {/* Créez la table qui affiche les articles */}
            {currentElements.length === 0 ? (
                <p className="text-center">Aucun article pour le moment</p>
            ) : (
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {/* Parcourez les articles et affichez chaque entrée dans une ligne */}
                    <tbody>
                        {currentElements?.map((article, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{selectFirstFiveWords(article?.title)}</td>
                                <td>
                                    {selectFirstFiveWords(article?.description)}
                                </td>
                                {/*  Créez un groupe de boutons qui permettent de
                            modifier ou de supprimer un article */}
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
            )}
            {isOpen ? <Modal /> : null}
            <Pagination />
        </div>
    );
};

export default AdminArticles;
