// Importation de la bibliothèque Link de React Router DOM
// qui permet de créer des liens de navigation entre
//  différentes pages de l'application web.
import { Link } from "react-router-dom";
import { selectFirstFiveWords } from "../../utils/fonctions/selectFirstFiveWords";

// Définition du composant fonctionnel Post, qui reçoit des props sous
//  forme d'un objet destructuré { _id, title, image, description
const Post = ({ _id, title, image, description }) => {
    // Le composant retourne un élément JSX contenant
    // une carte (card) Bootstrap pour afficher le post
    return (
        <div className="row  col-lg-6 col-xl-4">
            <div className="col-sm d-flex justify-content-center">
                <div className="card my-4 post-card">
                    <div>
                        {/* Affichage de l'image du post */}
                        <img
                            className="card-img"
                            src={image}
                            style={{ width: "100%" }}
                        />
                        <h3 className="card-title my-4 ml-2">
                            {/* Affichage du titre du post, en appelant la fonction 
                        selectFirstFiveWords pour limiter le nombre de mots affichés */}
                            {selectFirstFiveWords(title)}
                        </h3>
                        <p className="card-text my-4 ml-2">
                            {/* Affichage d'un extrait du contenu du post, également en appelant
                         la fonction selectFirstFiveWords pour limiter le nombre de mots affichés */}
                            {selectFirstFiveWords(description, 50)}
                        </p>
                        <p className="text-center">
                            {/* Affichage d'un bouton "Lire l'article" qui redirige 
                            vers la page de détails du post correspondant */}
                            <Link to={`/article/${_id}`}>
                                <span className="text-white btn btn-primary">
                                    Lire l'article
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
// Exportation du composant Post pour pouvoir l'utiliser ailleurs dans l'application
export default Post;
