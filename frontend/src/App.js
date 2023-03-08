// Import des fichiers CSS et JS de Bootstrap ainsi que du fichier CSS personnalisé
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
            {/* Le composant du header est inclus dans la page */}
            <Routes>
                {/* Le système de routage de React Router est utilisé pour gérer
                les routes de l'application */}
                <Route path="/" element={<Home />} />
                {/* La route pour la page d'accueil */}
                <Route path="/article/:id" element={<DetailPost />} />
                {/* La route pour la page de détail d'un article */}
                <Route
                    path="/articles/categorie/:id"
                    element={<ArticlesByCategorie />}
                />
                {/* La route pour la page des articles d'une catégorie */}
                <Route path="/admin/category" element={<AdminCategories />} />
                {/* La route pour la page d'administration des catégories */}
                <Route path="/admin/article" element={<AdminArticles />} />
                {/* La route pour la page d'administration des articles */}
            </Routes>
            <Footer />
            {/* Le composant du footer est inclus dans la page */}
        </BrowserRouter>
    );
}

export default App;
