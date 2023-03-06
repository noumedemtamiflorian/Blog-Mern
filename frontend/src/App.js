import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/pages/home";
import DetailPost from "../src/pages/detailPost";
import ArticlesByCategorie from "../src/pages/articlesByCategorie";
import AdminCategories from "../src/pages/admin/category/adminCategories";
import AdminArticles from "../src/pages/admin/article/adminArticles";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/article/:id" element={<DetailPost />} />
                <Route
                    path="/articles/categorie/:id"
                    element={<ArticlesByCategorie />}
                />
                <Route path="/admin/category" element={<AdminCategories />} />
                <Route path="/admin/article" element={<AdminArticles />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
