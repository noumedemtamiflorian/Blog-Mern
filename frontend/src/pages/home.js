import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/article/Post";
import { getArticles, getCategories } from "../services/api";
import UsePagination from "../utils/hooks/usePagination";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);

    const { Pagination, currentArticles } = UsePagination({
        articles: articles,
        perPage: 3,
    });

    useEffect(() => {
        async function fetchData() {
            const [articlesData, categoriesData] = await Promise.all([
                getArticles(),
                getCategories(),
            ]);
            setArticles(articlesData.data);
            setCategories(categoriesData.data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <main className="row">
                <article className="col-sm-7 col-md-8 col-lg-9 col-xl-10 justify-content-center text-center row">
                    <h1 className="text-center">Nos Articles</h1>
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
                                    <li className="list-group-item list-group-item-action">
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

export default Home;
