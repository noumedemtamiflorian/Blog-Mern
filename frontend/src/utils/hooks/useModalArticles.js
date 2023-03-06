// axios : un package qui permet d'effectuer des requêtes HTTP
import axios from "axios";
// un hook de React qui permet d'ajouter des états locaux à un composant fonctionnel
import { useState } from "react";
//composant pour creer un article
import FormCreateArticle from "../../components/article/FormCreateArticle";
//composant pour editer un article
import FormEditArticle from "../../components/article/FormEditArticle";
//composant pour supprimer un article
import ModalDeleteElement from "../../components/ModalDeleteElement";
//composant pour gerer les erreurs
import ModalErrorMessage from "../../components/ModalErrorMessage.js";
// Les fonctions deleteArticle, postArticle et putArticle sont importées à partir
// d'un fichier api.js qui contient des fonctions pour effectuer des appels API
// liés aux articles.
import { deleteArticle, postArticle, putArticle } from "../../services/api";
// URL_CLOUDINARY_UPLOAD est importé à partir du fichier
// constant/urls.js qui contient l'URL de l'API Cloudinary pour l'upload des images.
import { URL_CLOUDINARY_UPLOAD } from "../constants/urls";

// Ce Hook permet de créer, éditer et supprimer
// des articles en utilisant des modals
const useModalArticles = ({ onUpdateArticles }) => {
    // state pour gerer l'ouverture et la fermeture d'un modal
    const [isOpen, setIsOpen] = useState(false);
    // state pour stocker un article
    const [article, setArticle] = useState(null);
    // state pour connaitre le mode
    const [mode, setMode] = useState("create");
    // state pour gerer les messages d'erreurs
    const [messageError, setMessageError] = useState(null);

    const openModal = (article, mode) => {
        setIsOpen(true);
        setArticle(article);
        setMode(mode);
    };

    const closeModal = () => {
        setIsOpen(false);
        setArticle(null);
        setMessageError(null);
        setMode("create"); // définir le mode de la modal à "création"
    };

    const handleCloudinaryUpload = async (data) => {
        const formData = new FormData();
        formData.append("file", data.image); // Ajoute le fichier image sélectionné à formData
        formData.append("upload_preset", "f9dkjbxa"); // Ajoute le upload_preset de cloudinary à formData
        formData.append("cloud_name", "noumedemtamiflorian"); // Ajoute le cloud_name de cloudinary à formData
        const response = await axios.post(URL_CLOUDINARY_UPLOAD, formData); // Envoie la requête POST pour uploader l'image sur cloudinary
        return response.data.secure_url; // Retourne l'URL sécurisée de l'image uploadée
    };

    // Cette fonction asynchrone est appelée lors de la soumission du formulaire pour créer un nouvel article.
    const onSubmit = async (data) => {
        try {
            // On commence par envoyer l'image à Cloudinary pour la stocker et récupérer l'URL.
            const imageUrl = await handleCloudinaryUpload(data);
            // On crée une copie du formulaire et on y ajoute l'URL de l'image.
            const formDataWithImageUrl = { ...data, image: imageUrl };
            // On envoie le formulaire complet, y compris l'URL de l'image, au serveur.
            const res = await postArticle(formDataWithImageUrl);
            // Si le serveur renvoie un code 400, cela signifie que l'article existe déjà.
            if (res.status === 400) {
                // On affiche un message d'erreur et on change le mode de la modale en "error".
                setMessageError("L'article existe deja");
                setMode("error");
                // Si le serveur renvoie un code 200, cela signifie que l'article a été créé avec succès.
            } else if (res.status === 200) {
                // On ajoute le nouvel article à la liste des articles, on enregistre l'article créé et on ferme la modale.
                onUpdateArticles((pre) => [...pre, res.data]);
                setArticle(res.data);
                closeModal();
            }
            // Si une erreur survient pendant le processus, on affiche le message d'erreur et on change le mode de la modale en "error".
        } catch (error) {
            setMessageError(error.message);
            setMode("error");
        }
    };

    // Gérer l'édition d'un article
    const handleEdit = async (data) => {
        try {
            // Récupérer l'URL de l'image, soit via Cloudinary,
            //  soit en utilisant l'URL de l'image existante
            const imageUrl =
                typeof data.image !== String
                    ? await handleCloudinaryUpload(data)
                    : article.image;
            // Créer un objet avec les données reçues et l'URL de l'image
            const formDataWithImageUrl = {
                ...data,
                image: imageUrl,
                _id: article._id,
            };
            // Faire la requête à l'API
            const res = await putArticle(formDataWithImageUrl);
            // S'il y a une erreur de validation
            if (res.status === 400) {
                // Lancer une exception
                throw new Error("L'article existe deja");
                // S'il y a réussite
            } else if (res.status === 200) {
                onUpdateArticles((pre) => {
                    const updateArticles = pre.map((preA) =>
                        preA._id === article._id ? { ...res.data } : preA
                    );
                    return [...updateArticles];
                });
                // Mettre à jour l'article couran
                setArticle(res.data);
                // Fermer la modale
                closeModal();
            }
            // S'il y a une erreur
        } catch (error) {
            // Définir le message d'erreur
            setMessageError(error.message);
            // Changer le mode en erreur
            setMode("error");
        }
    };

    // Supprimer un article en fonction de son ID
    const handleDelete = async () => {
        // Essayer de supprimer l'article
        try {
            const { _id } = article;
            const response = await deleteArticle(_id);
            // Si l'article n'est pas trouvé
            if (response.status === 404) {
                setMessageError("Article non trouvé");
                setMode("error");
                setIsOpen(true);
                // Si l'article est trouvé et supprimé
            } else if (response.status === 200) {
                onUpdateArticles((prevArticle) => [
                    ...prevArticle.filter(
                        (prevArticle) => prevArticle._id !== article._id
                    ),
                ]);
                closeModal();
            }
        } catch (error) {
            setMessageError("Probleme survenue");
            setMode("error");
        }
    };

    const Modal = () => {
        if (mode === "create") {
            // Si le mode est "create", afficher le formulaire de création
            return (
                <FormCreateArticle
                    closeModal={closeModal}
                    onSubmit={onSubmit}
                />
            );
        } else if (mode === "edit") {
            // Si le mode est "edit", afficher le formulaire d'édition
            return (
                <FormEditArticle
                    closeModal={closeModal}
                    onSubmit={handleEdit}
                    article={article}
                />
            );
        } else if (mode === "delete") {
            // Si le mode est "delete", afficher le formulaire de suppression
            return (
                <ModalDeleteElement
                    element={article}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                />
            );
        } else if (mode === "error") {
            // Si le mode est "error", afficher le message d'erreur
            return (
                <ModalErrorMessage
                    closeModal={closeModal}
                    messageError={messageError}
                />
            );
        } else {
            // Sinon, ne rien afficher
            return null;
        }
    };

    return {
        isOpen,
        article,
        mode,
        openModal,
        closeModal,
        Modal,
    };
};

export default useModalArticles;
