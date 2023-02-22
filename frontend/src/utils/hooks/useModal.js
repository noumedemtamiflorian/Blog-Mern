// On importe le hook useState de React
import { useState } from "react";
// On importe le hook useForm de react-hook-form
import { useForm } from "react-hook-form";
// On importe le composant FormCategory, le formulaire de creation et d'edition de categorie
import FormCreateCategory from "../../components/category/FormCreateCategory";
import FormEditCategory from "../../components/category/FormEditCategory";
import ModalDeleteElement from "../../components/ModalDeleteElement";
import ModalErrorMessage from "../../components/ModalErrorMessage";
// On importe la fonction postCategory, la fonction asynchrone qui permet de creer une categorie via l'API
import {
    deleteApiCategory,
    postCategory,
    putApiCategory,
} from "../../services/api";

const useModal = ({ onUpdateCategories }) => {
    // isOpen représente si la boîte modale est ouverte ou fermée
    const [isOpen, setIsOpen] = useState(false);
    // category représente la catégorie actuellement sélectionnée dans la boîte modale
    const [category, setCategory] = useState(null);
    // mode représente le mode actuel de la boîte modale (création, édition, suppression, erreur)
    const [mode, setMode] = useState("create");
    // messageError représente le message d'erreur affiché dans la boîte modale en cas d'erreur
    const [messageError, setMessageError] = useState(null);
    // Initialisation du formulaire React Hook Form
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Fonction de soumission du formulaire
    const onSubmit = async (data) => {
        try {
            // Appelle la fonction postCategory du service api.js pour envoyer les données au serveur
            const response = await postCategory(data);
            if (response.status === 400) {
                // Si le serveur renvoie un code 400, cela signifie que la catégorie existe
                // déjà, donc on affiche un message d'erreur
                setMode("error");
                setMessageError("Cette categorie existe deja");
            } else if (response.status === 200) {
                // Si le serveur renvoie un code 200, cela signifie que la catégorie
                // a été créée avec succès,
                // donc on met à jour la liste des catégories et on ferme la boîte modale
                onUpdateCategories((prevCategories) => [
                    ...prevCategories,
                    response.data,
                ]);
                setCategory(response.data);
                closeModal();
            }
        } catch (error) {
            // Si une erreur survient lors de l'appel à la
            //  fonction postCategory, on affiche un message d'erreur générique
            setMessageError("Probleme survenue");
            setMode("error");
        }
    };

    const openModal = (category, mode) => {
        setIsOpen(true);
        setCategory(category);
        setMode(mode);
    };
    // Fonction pour fermer la boîte modale
    const closeModal = () => {
        setIsOpen(false);
        reset();
        setCategory(null);
        setMessageError(null);
        setMode("create");
    };
    // Fonctions pour gérer la sauvegarde
    const handleSave = async (data) => {
        try {
            const updateCategory = {
                ...category,
                title: data.title,
            };
            const response = await putApiCategory(updateCategory);
            if (response.status === 400) {
                // Si le serveur renvoie un code 400, cela signifie que la catégorie existe
                // déjà, donc on affiche un message d'erreur
                setMessageError("Cette categorie existe deja");
                setMode("error");
                setIsOpen(true);
                reset(); // Réinitialisation du formulaire
            } else if (response.status === 200) {
                onUpdateCategories((prevCategories) => {
                    const updateCategories = prevCategories.map(
                        (prevCategory) =>
                            prevCategory._id === category._id
                                ? { ...prevCategory, title: data.title }
                                : prevCategory
                    );
                    return [...updateCategories];
                });
                setCategory(data);
                closeModal();
            }
        } catch (error) {
            // Si une erreur survient lors de l'appel à la
            //  fonction postCategory, on affiche un message d'erreur générique
            setMessageError("Probleme survenue");
            setMode("error");
        }
    };
    // Fonctions pour gérer la suppression de catégories
    const handleDelete = async () => {
        try {
            const { _id } = category;
            const response = await deleteApiCategory(_id);
            if (response.status === 404) {
                setMessageError("Article non trouvé");
                setMode("error");
                setIsOpen(true);
                reset(); // Réinitialisation du formulaire
            } else if (response.status === 200) {
                onUpdateCategories((prevCategories) => [
                    ...prevCategories.filter(
                        (prevCategory) => prevCategory._id != category._id
                    ),
                ]);
                closeModal();
            }
        } catch (error) {
            setMessageError("Probleme survenue");
            setMode("error");
        }
    };
    // Fonctions pour gérer la création de catégories

    const handleCreate = (newCategory) => {
        closeModal();
    };
    // Cette fonction retourne un composant Modal en fonction du mode actuel
    const Modal = () => {
        if (mode === "create") {
            // Si le mode est "create", on retourne le composant FormCategory
            // avec les props nécessaires
            return (
                <FormCreateCategory
                    closeModal={closeModal}
                    onSubmit={handleSubmit(onSubmit)}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />
            );
        } else if (mode === "edit") {
            // Si le mode est "edit"
            return (
                <FormEditCategory
                    onSubmit={handleSubmit(handleSave)}
                    closeModal={closeModal}
                    category={category}
                    errors={errors}
                    register={register}
                />
            );
        } else if (mode === "delete") {
            // Si le mode est "delete"
            return (
                <ModalDeleteElement
                    category={category}
                    handleDelete={handleDelete}
                    closeModal={closeModal}
                />
            );
        } else if (mode === "error") {
            // Si le mode est "error", on affiche une boîte modale d'erreur
            return (
                <ModalErrorMessage
                    closeModal={closeModal}
                    messageError={messageError}
                />
            );
        } else {
            // Si le mode n'est pas défini, on ne retourne rien
            return null;
        }
    };
    // Cette fonction retourne un objet qui contient plusieurs propriétés et fonctions
    // qui permettent de gérer la boite modale pour la création, l'édition, la suppression
    // et l'affichage des messages d'erreur.
    // isOpen: une propriété booléenne qui indique si la boite modale est ouverte ou non
    // category: une propriété qui contient les données de la catégorie sélectionnée
    // mode: une propriété qui indique le mode actuel de la boite modale (création, édition, suppression, erreur)
    // openModal: une fonction qui ouvre la boite modale et met à jour les données de la catégorie et le mode
    // closeModal: une fonction qui ferme la boite modale et réinitialise les données de la catégorie et le mode
    // handleSave: une fonction qui gère l'enregistrement de la catégorie modifiée
    // handleDelete: une fonction qui gère la suppression de la catégorie sélectionnée
    // handleCreate: une fonction qui gère la création d'une nouvelle catégorie
    // Modal: une fonction qui retourne le composant de la boite modale en fonction du mode actuel
    return {
        isOpen,
        category,
        mode,
        openModal,
        closeModal,
        handleSave,
        handleDelete,
        handleCreate,
        Modal,
    };
};

export default useModal;
