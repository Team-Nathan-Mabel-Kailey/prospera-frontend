import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './NewsCardDetail.css'

function NewsCardDetail () {
    const { articleId } = useParams();
    const [article, setArticle] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { title, content, createdAt, image } = location.state;

    if (error) {
        return <NotFound />;
    }

    return (
        <div className="articleContainer">
            <h1>{title}</h1>
            {image ? <img src={image} alt={title} /> : <img src="https://placehold.jp/400x200.png" alt={title} />}
            <p>{createdAt}</p>
            <p>{content}</p>
        </div>
    )
}

export default NewsCardDetail
