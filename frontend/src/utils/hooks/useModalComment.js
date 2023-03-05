import React, { useState } from "react";
import FormCreateComment from "../../components/FormCreateComment";
import FormDeleteComment from "../../components/FormDeleteComment";
import FormEditComment from "../../components/FormEditComment";
import { deleteComment, editComemnt, postComment } from "../../services/api";

const useModalComment = ({ setArticle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState(null);
    const [mode, setMode] = useState("create");

    const openModal = (comment, mode) => {
        setIsOpen(true);
        setComment(comment);
        setMode(mode);
    };

    const closeModal = () => {
        setIsOpen(false);
        setComment(comment);
        setMode("create");
    };

    const handleSubmit = async (data) => {
        try {
            const newComment = { ...comment, ...data };
            const response = await postComment(newComment);
            setArticle((prevArticle) => ({
                ...prevArticle,
                comments: [...prevArticle.comments, response.data],
            }));
            setComment(null);
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };
    const handleEdit = async (data) => {
        try {
            const newComment = { ...comment, ...data };
            const response = await editComemnt(comment._id, newComment);
            const updatedComment = response.data;
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
            setComment(null);
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async () => {
        try {
            const response = await deleteComment(comment._id);
            setArticle((prevState) => {
                const updatedComments = prevState.comments.filter(
                    (comment) => comment._id !== response.data._id
                );
                return {
                    ...prevState,
                    comments: updatedComments,
                };
            });
            closeModal();
        } catch (error) {
            return error;
        }
    };
    const Modal = () => {
        if (mode === "create") {
            return (
                <FormCreateComment
                    handleOnSubmit={handleSubmit}
                    closeModal={closeModal}
                />
            );
        } else if (mode === "edit") {
            return (
                <FormEditComment
                    comment={comment}
                    handleOnSubmit={handleEdit}
                    closeModal={closeModal}
                />
            );
        } else if (mode === "delete") {
            return (
                <FormDeleteComment
                    handleDelete={handleDelete}
                    comment={comment}
                    closeModal={closeModal}
                />
            );
        } else if (mode === "error") {
            return null;
        } else {
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