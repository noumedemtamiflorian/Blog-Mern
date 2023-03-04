import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { getCategories, getCategory } from "../services/api";
import usePagination from "../utils/hooks/usePagination";

const ArticlesByCategorie = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [articles, setArticles] = useState([]);

    const { Pagination, currentArticles } = usePagination({
        articles: articles,
        perPage: 1,
    });

    useEffect(() => {
        async function fetchData() {
            const [category, categories] = await Promise.all([
                getCategory("63f60a515e8984a53acf1c48"),
                getCategories(),
            ]);
            setCategory(category.data);
            setArticles(category.data.articles);
            setCategories(categories.data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <main className="row">
                <article className="col-sm-7 col-md-8 col-lg-9 col-xl-10 justify-content-center text-center row">
                    {currentArticles?.map(
                        ({ title, image, description }, index) => {
                            return (
                                <Post
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
                                <a key={_id} href={"/posts/categorie/" + _id}>
                                    <li
                                        className={`list-group-item list-group-item-action ${
                                            category._id === _id
                                                ? "active"
                                                : null
                                        }`}
                                    >
                                        {title}
                                    </li>
                                </a>
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
