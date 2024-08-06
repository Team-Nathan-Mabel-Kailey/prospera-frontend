import React, { useState, useEffect } from 'react';
import './NewsWidget.css';
import axios from 'axios';

const NewsWidget = ({ data }) => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const allowedSources = [
        'fox-business', 'business-insider', 'bloomberg', 'abc-news', 
        'reuters', 'forbes', 'the-economist', 'wall-street-journal', 'yahoo-finance'
    ];

    const fetchOneArticle = async (query) => {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: query,
                language: 'en',
                sortBy: 'publishedAt',
                pageSize: 1,
                apiKey: import.meta.env.VITE_NEWS_API_KEY,
                sources: "fox-business,business-insider,bloomberg,yahoo-finance"
            },
        });
        return response.data.articles[0];
    };
    
    const stopPropagation = (evt) => {
        evt.stopPropagation();
    };

    useEffect(() => {
        const getArticle = async () => {
            try {
                const fetchedArticle = await fetchOneArticle(data.query);
                setArticle(fetchedArticle);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getArticle();
    }, [data.query]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!article) return <div>No article found</div>;

    return (
        <div className="news-widget">
            <h2>Your "{data.query}" Article</h2>
            <div className="article-content">
                <figure>
                <img src={article.urlToImage} alt={article.title} />
                </figure>
                <h3>{article.title}</h3>
                <p className="description">{article.description}</p>
                <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="read-more"
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                >
                Read more
                    <span className="icon">➜</span>
                </a>
            </div>
    </div>
        // <div className="randomArticle">
        //     <h2>Your "{data.query}" Article</h2>
        //     <figure>
        //         <img src={article.urlToImage} alt={article.title} />
        //     </figure>
        //     <h3>{article.title}</h3>
        //     <p>{article.description}</p>
        //     <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more"
        //     onMouseDown={stopPropagation}
        //     onTouchStart={stopPropagation}>
        //         Read more
        //         <span className="icon">➜</span>
        //     </a>
        // </div>
    );
};

export default NewsWidget;