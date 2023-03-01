const Post = ({ title, image, description }) => {
    return (
        <div className="row  col-lg-6 col-xl-4">
            <div className="col-sm">
                <div className="card my-4" style={{ width: "18rem" }}>
                    <div>
                        <img
                            className="card-img"
                            src={image}
                            style={{ width: "100%" }}
                        />
                        <h3 className="card-title my-4 ml-2">{title}</h3>
                        <p className="card-text my-4 ml-2">{description}</p>
                        <p className="text-center">
                            <span className="text-white btn btn-primary">
                                Lire l'article
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Post;
