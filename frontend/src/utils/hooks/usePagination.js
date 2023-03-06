import React, { useEffect, useState } from "react";
import Pagine from "../../components/common/Pagine";

const usePagination = ({ articles, perPage }) => {
    const [currentArticles, setCurrentArticles] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPage = Math.ceil(articles.length / perPage);

    const handlePageClick = (page) => {
        setCurrentPage(page);
        setCurrentArticles(
            articles.slice(perPage * (page - 1), perPage * page)
        );
    };

    useEffect(() => {
        setCurrentArticles(articles.slice(0, perPage));
    }, [articles, perPage]);
    const Pagination = () => {
        return totalPage !== 1 ? (
            <Pagine
                handlePageClick={handlePageClick}
                currentPage={currentPage}
                totalPage={totalPage}
            />
        ) : null;
    };
    return {
        Pagination,
        currentArticles,
    };
};

export default usePagination;
