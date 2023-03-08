// Importation de React et des Hooks  useState
import React, { useState } from "react";
// Composant pour creer un commentaire
import FormCreateComment from "../../components/comment/FormCreateComment";
// Composant pour supprimer un commentaire
import ModalDeleteElement from "../../components/ModalDeleteElement";
// Composant pour editer un commentaire
import FormEditComment from "../../components/comment/FormEditComment";
//Modal pour afficher les erreurs
import ModalErrorMessage from "../../components/ModalErrorMessage";
//Fonction pour supprimer, editer, post un commentaite a partir de l'API
import { deleteComment, editComemnt, postComment } from "../../services/api";

// Fonction custom hook qui gère la logique de l'affichage du modal
// de création, modification ou suppression de commentaires
const useModalComment = ({ setArticle }) => {
    // isOpen stocke si la modal est ouverte ou fermée
    const [isOpen, setIsOpen] = useState(false);
    // comment stocke le commentaire actuellement en cours
    //  de modification ou de suppression
    const [comment, setComment] = useState(null);
    // mode stocke le mode de la modal: création, modification, suppression
    const [mode, setMode] = useState("create");
    // messageError représente le message d'erreur affiché dans
    // la boîte modale en cas d'erreur
    const [messageError, setMessageError] = useState(null);
    // Cette fonction est appelée pour ouvrir la modal a
    // avec les données du commentaire à modifier ou supprimer.
    const openModal = (comment, mode) => {
        setIsOpen(true); // On définit la variable d'état isOpen sur
        // true pour ouvrir la modal
        setComment(comment); // On définit la variable d'état comment
        // avec le commentaire qui
        //  va être modifié ou supprimé
        setMode(mode); // On définit la variable d'état mode avec le mode choisi
        //  (modification ou suppression)
    };

    // Cette fonction est appelée pour fermer la modal.
    const closeModal = () => {
        setIsOpen(false);
        setComment(comment);
        setMode("create");
    };

    const handleSubmit = async (data) => {
        try {
            // Combine les données des commentaires existants et des nouveaux commentaires
            const newComment = { ...comment, ...data };
            // Envoie une requête POST pour créer un nouveau commentaire
            const response = await postComment(newComment);
            // Met à jour l'article en ajoutant le nouveau commentaire créé
            setArticle((prevArticle) => ({
                ...prevArticle,
                comments: [...prevArticle.comments, response.data],
            }));
            // Réinitialise le formulaire et ferme le modal
            setComment(null);
            closeModal();
        } catch (error) {
            // Si une erreur survient lors de l'appel à la
            //  fonction postCategory, on affiche un message d'erreur générique
            setMessageError("Probleme survenue");
            setMode("error");
        }
    };

    const handleEdit = async (data) => {
        try {
            // Combine les données des commentaires existants et des nouveaux commentaires
            const newComment = { ...comment, ...data };
            // Envoie une requête PUT pour mettre à jour un commentaire existant
            const response = await editComemnt(comment._id, newComment);
            // Récupère le commentaire mis à jour
            const updatedComment = response.data;
            // Met à jour l'article en remplaçant l'ancien commentaire
            //  par le commentaire mis à jour
            setArticle((prevState) => {
                const updatedComments = prevState.comments.map((comment) => {
                    if (comment._id === updatedComment._id) {
                        return updatedComment;
                    }
                    return comment;
                });
                return {
                    ...prevState,
                    comments: updatedComments,
                };
            });
            // Réinitialise le formulaire et ferme le modal
            setComment(null);
            closeModal();
        } catch (error) {
            // Si une erreur survient lors de l'appel à la
            //  fonction postCategory, on affiche un message d'erreur générique
            setMessageError("Probleme survenue");
            setMode("error");
        }
    };
    const handleDelete = async () => {
        try {
            // Envoie une requête DELETE pour supprimer un commentaire existant
            const response = await deleteComment(comment._id);
            // Met à jour l'article en supprimant le commentaire correspondant
            setArticle((prevState) => {
                const updatedComments = prevState.comments.filter(
                    (comment) => comment._id !== response.data._id
                );
                return {
                    ...prevState,
                    comments: updatedComments,
                };
            });
            // Ferme le modal
            closeModal();
        } catch (error) {
            // Si une erreur survient lors de l'appel à la
            //  fonction postCategory, on affiche un message d'erreur générique
            setMessageError("Probleme survenue");
            setMode("error");
        }
    };
    // Ce composant Modal permet d'afficher différents types de modal
    //en fonction du mode choisi
    const Modal = () => {
        if (mode === "create") {
            // Si le mode est "create", on affiche le formulaire de création de commentaire
            return (
                <FormCreateComment
                    handleOnSubmit={handleSubmit}
                    closeModal={closeModal}
                />
            );
        } else if (mode === "edit") {
            // Si le mode est "edit", on affiche le formulaire de modification de commentaire
            return (
                <FormEditComment
                    comment={comment}
                    handleOnSubmit={handleEdit}
                    closeModal={closeModal}
                />
            );
        } else if (mode === "delete") {
            // Si le mode est "delete", on affiche la boîte modale de confirmation
            // de suppression de commentaire
            return (
                <ModalDeleteElement
                    handleDelete={handleDelete}
                    element={comment}
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
            // Si le mode n'est pas reconnu, on ne retourne rien
            return null;
        }
    };

    return {
        isOpen,
        comment,
        mode,
        openModal,
        closeModal,
        Modal,
    };
};

export default useModalComment;
