import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="d-flex justify-content-between align-items-end my-3 mx-4">
            <h1 className="text-warning">
                <Link to="/" className="text-warning">
                    Blog
                </Link>
            </h1>
            <nav>
                <ul className="list-unstyled d-flex">
                    <Link to="/admin/article">
                        <li className="btn btn-link mr-4 mx-4">Articles</li>
                    </Link>
                    <Link to="/admin/category">
                        <li className="btn btn-link mr-4 mx-4">Categories</li>
                    </Link>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
