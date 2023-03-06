import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "../components/article/Post";
import { getCategories, getCategory } from "../services/api";
import usePagination from "../utils/hooks/usePagination";

const ArticlesByCategorie = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [articles, setArticles] = useState([]);

    const { Pagination, currentArticles } = usePagination({
        articles: articles,
        perPage: 3,
    });

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
            <main className="row">
                <article className="col-sm-7 col-md-8 col-lg-9 col-xl-10 justify-content-center text-center row">
                    <h1 className="text-center">
                        Articles Pour la categorie {category.title}
                    </h1>
                    {currentArticles?.map(
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
                    )}
                </article>
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
            <Pagination />
        </div>
    );
};

export default ArticlesByCategorie;
