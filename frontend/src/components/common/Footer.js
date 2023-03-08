import React from "react";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5>À propos</h5>
                        <p>
                            Notre entreprise est une société innovante
                            spécialisée dans la conception et la fabrication de
                            produits technologiques de pointe. Sur notre blog,
                            nous partageons notre vision, notre expertise et nos
                            réflexions sur les dernières tendances
                            technologiques, ainsi que des astuces et des
                            conseils pour tirer le meilleur parti de nos
                            produits.
                        </p>
                    </div>
                    <div className="col-md-3">
                        <h5>Liens utiles</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#">Accueil</a>
                            </li>
                            <li>
                                <a href="#">À propos</a>
                            </li>
                            <li>
                                <a href="#">Contactez-nous</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Abonnez-vous</h5>
                        <form>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Entrez votre adresse e-mail"
                                />
                            </div>
                            <button type="button" className="btn btn-primary">
                                S'abonner
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 text-center">
                        <p>Tous droits réservés © 2023 Mon entreprise</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
