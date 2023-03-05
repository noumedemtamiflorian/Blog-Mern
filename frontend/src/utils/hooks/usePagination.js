import React, { useEffect, useState } from "react";

const UsePagination = ({ articles, perPage }) => {
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
            <div className="d-flex my-3 justify-content-center">
                <nav>
                    <ul className="pagination">
                        <li
                            onClick={
                                currentPage === 1
                                    ? null
                                    : () => handlePageClick(currentPage - 1)
                            }
                            className={`page-item ${
                                currentPage === 1 ? "disabled" : ""
                            }`}
                        >
                            <button
                                className="page-link"
                                href="#"
                                tabIndex="-1"
                                aria-disabled="true"
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from(
                            { length: totalPage },
                            (_, index) => index + 1
                        ).map((x) => {
                            return (
                                <li
                                    key={x}
                                    onClick={() => handlePageClick(x)}
                                    className={`page-item ${
                                        x === currentPage ? "active" : ""
                                    }`}
                                >
                                    <button className="page-link">{x}</button>
                                </li>
                            );
                        })}

                        <li
                            onClick={
                                currentPage === totalPage
                                    ? null
                                    : () => handlePageClick(currentPage + 1)
                            }
                            className={`page-item ${
                                currentPage === totalPage ? "disabled" : ""
                            }`}
                        >
                            <button className="page-link" href="#">
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        ) : null;
    };
    return {
        Pagination,
        currentArticles,
    };
};

export default UsePagination;
