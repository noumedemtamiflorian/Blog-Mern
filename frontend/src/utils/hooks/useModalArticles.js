import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormCreateArticle from "../../components/article/FormCreateArticle";
import ModalErrorMessage from "../../components/ModalErrorMessage.js";
import { postArticle } from "../../services/api";
import { URL_CLOUDINARY_UPLOAD } from "../constants/urls";

const useModalArticles = ({ onUpdateArticles }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [article, setArticle] = useState(null);
    const [mode, setMode] = useState("create");
    const [messageError, setMessageError] = useState(null);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("file", data.image[0]);
            formData.append("upload_preset", "f9dkjbxa");
            formData.append("cloud_name", "noumedemtamiflorian");
            const response = await axios.post(URL_CLOUDINARY_UPLOAD, formData);
            const imageUrl = response.data.secure_url;
            const formDataWithImageUrl = { ...data, image: imageUrl };
            const res = await postArticle(formDataWithImageUrl);
            if (res.status === 400) {
                setMessageError("L'article existe deja");
                setMode("error");
            } else if (res.status === 200) {
                onUpdateArticles((pre) => [...pre, formDataWithImageUrl]);
                setArticle(formDataWithImageUrl);
                closeModal();
            }
        } catch (error) {
            setMessageError(error.message);
            setMode("error");
        }
    };

    const openModal = (article, mode) => {
        setIsOpen(true);
        setArticle(article);
        setMode(mode);
    };
    const closeModal = () => {
        setIsOpen(false);
        reset();
        setArticle(null);
        setMessageError(null);
        setMode("create");
    };

    const Modal = () => {
        if (mode === "create") {
            return (
                <FormCreateArticle
                    closeModal={closeModal}
                    onSubmit={handleSubmit(onSubmit)}
                    register={register}
                    errors={errors}
                />
            );
        } else if (mode === "edit") {
            return null;
        } else if (mode === "delete") {
            return null;
        } else if (mode === "error") {
            return (
                <ModalErrorMessage
                    closeModal={closeModal}
                    messageError={messageError}
                />
            );
        } else {
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
