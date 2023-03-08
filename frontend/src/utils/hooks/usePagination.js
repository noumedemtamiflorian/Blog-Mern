// Importation des modules React, useEffect et useState
import React, { useEffect, useState } from "react";
// Importation du composant Pagine pour la pagination
import Pagine from "../../components/common/Pagine";

// Définition d'un hook personnalisé usePagination, qui reçoit
// en paramètres un tableau d'éléments
// et le nombre d'éléments à afficher par page
const usePagination = ({ elements, perPage }) => {
    // Définition des états locaux pour les éléments à afficher sur
    // la page courante et le numéro de page courante
    const [currentElements, setCurrentElements] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Calcul du nombre total de pages en fonction du nombre total
    // d'éléments et du nombre d'éléments à afficher par page
    const totalPage = Math.ceil(elements.length / perPage);

    // Fonction de gestion du clic sur un bouton de pagination
    const handlePageClick = (page) => {
        setCurrentPage(page);
        setCurrentElements(
            elements.slice(perPage * (page - 1), perPage * page)
        );
    };

    // Utilisation du hook useEffect pour initialiser la page
    // courante avec les premiers éléments du tableau d'éléments
    useEffect(() => {
        setCurrentElements(elements.slice(0, perPage));
    }, [elements, perPage]);

    // Définition d'un composant Pagination qui renvoie le composant
    // Pagine avec les props nécessaires pour la pagination
    const Pagination = () => {
        return totalPage > 1 ? (
            <Pagine
                handlePageClick={handlePageClick}
                currentPage={currentPage}
                totalPage={totalPage}
            />
        ) : null;
    };

    // Retourne un objet contenant le composant Pagination et
    // les éléments à afficher sur la page courante
    return {
        Pagination,
        currentElements,
    };
};

// Exportation du hook personnalisé
// usePagination pour pouvoir l'utiliser ailleurs dans l'application
export default usePagination;
