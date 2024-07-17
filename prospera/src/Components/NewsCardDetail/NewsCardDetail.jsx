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
    const { title, content, createdAt } = location.state;

    console.log("news card detail", title, content, createdAt);

    if (error) {
        return <NotFound />;
    }

    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}

export default NewsCardDetail
