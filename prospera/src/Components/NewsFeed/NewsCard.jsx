import React from 'react';
import './NewsCard.css';
import noImagePlaceholder from './no_image_placeholder.png';

const NewsCard = ({ article }) => {
    return (
        <div className="newsCardContainer">
        <figure>
            {/* <img src={article.urlToImage} alt={article.title} /> */}
            <img src={article.urlToImage ? article.urlToImage : noImagePlaceholder} alt={article.title}/>
        </figure>
        <h3>{article.title}</h3>
        {/* <p><small>{article.source.name}</small></p> */}
        <p>{article.description || article.content}</p>

        <div className="bottomText">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                Read more
                <span className="icon">➜</span>
            </a>
            <p><small>{new Date(article.publishedAt).toLocaleString()}</small></p>
        </div>
        </div>
    );
};

export default NewsCard;
