import React, { useEffect, useState } from "react";
import { getArticle } from "../services/api";

const DetailPost = () => {
    const [article, setArticle] = useState({});

    useEffect(() => {
        getArticle("63f9032918cdaba810754f84").then((res) => {
            setArticle(res.data);
        });
    }, []);

    return (
        <div className="container">
            <div className="p-5 w-100 m-auto">
                <h1 className="text-center mb-4">Article {article.title}</h1>
                <p className="mb-4">{article.title}</p>
                <p className="text-center w-100">
                    <img src={article.image} className="article-detail-image" />
                </p>
                <p className="mb-4">{article.description}</p>
                <p className="mb-4">{article.content}</p>
            </div>
            <h2>Commentaires</h2>
        </div>
    );
};

export default DetailPost;
