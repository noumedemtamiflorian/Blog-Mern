import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormCreateArticle from "../../components/article/FormCreateArticle";
import FormEditArticle from "../../components/article/FormEditArticle";
import ModalErrorMessage from "../../components/ModalErrorMessage.js";
import { postArticle, putArticle } from "../../services/api";
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

    const handleCloudinaryUpload = async (data) => {
        const formData = new FormData();
        formData.append("file", data.image[0]);
        formData.append("upload_preset", "f9dkjbxa");
        formData.append("cloud_name", "noumedemtamiflorian");
        const response = await axios.post(URL_CLOUDINARY_UPLOAD, formData);
        return response.data.secure_url;
    };

    const onSubmit = async (data) => {
        try {
            const imageUrl = await handleCloudinaryUpload(data);
            const formDataWithImageUrl = { ...data, image: imageUrl };
            const res = await postArticle(formDataWithImageUrl);
            if (res.status === 400) {
                setMessageError("L'article existe deja");
                setMode("error");
            } else if (res.status === 200) {
                onUpdateArticles((pre) => [...pre, formDataWithImageUrl]);
                setArticle(res.data);
                closeModal();
            }
        } catch (error) {
            setMessageError(error.message);
            setMode("error");
        }
    };

    const handleEdit = async (data) => {
        try {
            console.log(data);
            const imageUrl = data.image[0]
                ? await handleCloudinaryUpload(data)
                : article.image;
            const formDataWithImageUrl = {
                ...data,
                image: imageUrl,
                _id: article._id,
            };
            const res = await putArticle(formDataWithImageUrl);
            if (res.status === 400) {
                throw new Error("L'article existe deja");
            } else if (res.status === 200) {
                onUpdateArticles((pre) => {
                    const updateArticles = pre.map((preA) =>
                        preA._id === article._id
                            ? { ...formDataWithImageUrl }
                            : preA
                    );
                    return [...updateArticles];
                });
                setArticle(formDataWithImageUrl);
                closeModal();
            }
        } catch (error) {
            setMessageError(error.message);
            setMode("error");
        }
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
            return (
                <FormEditArticle
                    closeModal={closeModal}
                    onSubmit={handleSubmit(handleEdit)}
                    register={register}
                    errors={errors}
                    article={article}
                />
            );
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
