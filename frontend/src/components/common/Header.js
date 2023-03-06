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
                    <li className="btn btn-link mr-4 mx-4">
                        <Link to="/admin/article">Articles</Link>
                    </li>
                    <li className="btn btn-link mr-4 mx-4">
                        <Link to="/admin/category">Categories</Link>
                    </li>
                    <li className="btn btn-link mr-4 mx-4">Login</li>
                    <li className="btn btn-link mr-4 mx-4">Register</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
