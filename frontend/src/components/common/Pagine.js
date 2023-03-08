import React from "react";

const Pagine = ({ handlePageClick, currentPage, totalPage }) => {
    return (
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
    );
};

export default Pagine;
