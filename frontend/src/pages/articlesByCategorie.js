import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "../components/article/Post";
import { getCategories, getCategory } from "../services/api";
import usePagination from "../utils/hooks/usePagination";

const ArticlesByCategorie = () => {
    // Récupère l'id de la catégorie à afficher à partir des paramètres de l'URL
    const { id } = useParams();
    // Déclare des états pour stocker les catégories,
    // la catégorie courante et les articles de la catégorie
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [articles, setArticles] = useState([]);
    // Utilise le hook custom usePagination pour paginer
    // les articles de la catégorie courante
    const { Pagination, currentElements } = usePagination({
        elements: articles,
        perPage: 3,
    });

    // Utilise useEffect pour récupérer la catégorie courante,
    //  ses articles et toutes les catégories
    useEffect(() => {
        async function fetchData() {
            const [category, categories] = await Promise.all([
                getCategory(id),
                getCategories(),
            ]);
            setCategory(category.data);
            setArticles(category.data.articles);
            setCategories(categories.data);
        }
        fetchData();
    }, [id]);

    return (
        <div>
            {/* Contient le contenu principal de la page */}
            <main className="row flex-grow-1">
                {/* Affiche les articles de la catégorie courante */}
                <article className="col-sm-7 col-md-8 col-lg-9 col-xl-10 justify-content-center text-center row">
                    <h1 className="text-center">
                        Articles Pour la categorie {category.title}
                    </h1>
                    {/* Si des articles sont disponibles, les affiche avec le composant Post */}
                    {currentElements.length > 0 ? (
                        currentElements.map(
                            ({ title, image, description, _id }, index) => {
                                return (
                                    <Post
                                        _id={_id}
                                        title={title}
                                        image={image}
                                        description={description}
                                        key={index}
                                    />
                                );
                            }
                        )
                    ) : (
                        // Sinon, affiche un message d'erreur
                        <p>Pas d'articles disponibles pour le moment.</p>
                    )}
                </article>
                {/* Affiche la liste des catégories */}
                <div
                    id="categories"
                    className="col-sm-5 col-md-4  col-lg-3 col-xl-2"
                >
                    <h1 className="text-center">Categories</h1>
                    <ul className="list-group mr-4">
                        {categories.map(({ title, _id }) => {
                            return (
                                <Link
                                    key={title}
                                    to={`/articles/categorie/${_id}`}
                                >
                                    {" "}
                                    <li
                                        className={`list-group-item list-group-item-action ${
                                            category._id === _id
                                                ? "active"
                                                : null
                                        }`}
                                    >
                                        {title}
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </div>
            </main>
            {/* Affiche la pagination */}
            <Pagination />
        </div>
    );
};

export default ArticlesByCategorie;
