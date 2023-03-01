import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { getArticles, getCategories } from "../services/api";
import UsePagination from "../utils/hook/usePagination";

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
                                <button key={_id} href="#">
                                    <li className="list-group-item list-group-item-action">
                                        {title}
                                    </li>
                                </button>
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
