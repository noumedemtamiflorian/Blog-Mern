import React from "react";

const Header = () => {
    return (
        <header className="d-flex justify-content-between align-items-end my-3 mx-4">
            <h1 className="text-warning">Blog</h1>
            <nav>
                <ul className="list-unstyled d-flex">
                    <li className="btn btn-link mr-4 mx-4">Articles</li>
                    <li className="btn btn-link mr-4 mx-4">Categories</li>
                    <li className="btn btn-link mr-4 mx-4">Login</li>
                    <li className="btn btn-link mr-4 mx-4">Register</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
