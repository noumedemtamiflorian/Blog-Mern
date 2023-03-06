import { Link } from "react-router-dom";
import { selectFirstFiveWords } from "../../utils/fonctions/selectFirstFiveWords";

const Post = ({ _id, title, image, description }) => {
    return (
        <div className="row  col-lg-6 col-xl-4">
            <div className="col-sm d-flex justify-content-center">
                <div className="card my-4 post-card">
                    <div>
                        <img
                            className="card-img"
                            src={image}
                            style={{ width: "100%" }}
                        />
                        <h3 className="card-title my-4 ml-2">
                            {selectFirstFiveWords(title)}
                        </h3>
                        <p className="card-text my-4 ml-2">
                            {selectFirstFiveWords(description, 50)}
                        </p>
                        <p className="text-center">
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
export default Post;
