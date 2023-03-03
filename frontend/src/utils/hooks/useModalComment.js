import React, { useState } from "react";
import FormCreateComment from "../../components/FormCreateComment";
import { postComment } from "../../services/api";

const useModalComment = ({ setArticle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState(null);
    const [mode, setMode] = useState("create");

    const openModal = (comment, mode) => {
        console.log(comment);
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
            closeModal();
        } catch (error) {
            console.log(error);
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
            return <div>Edit</div>;
        } else if (mode === "delete") {
            return <div>Delete</div>;
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
