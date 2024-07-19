import { useState, useEffect } from "react";

import './NewsFeed.css'
import NewsCard from './NewsCard'

const NewsFeed = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [page, setPage] = useState(1);

    const apiKey = import.meta.env.VITE_API_KEY;
    let baseURL = `https://newsapi.org/v2`


    useEffect(() => {
        //Fetch news articles
        let url = `${baseURL}/everything?q=credit&apiKey=${apiKey}&page=${page}`

        //Set the news articles 
        async function fetchNewsArticles() {
            const response = await fetch(url);
            const data = await response.json();

            console.log(data);

            if(data.articles && data.articles.length > 0) {
                const limitedArticles = data.articles.slice(0, 6);
                setNewsArticles(prevArticles => (
                page === 1 ? limitedArticles : [...prevArticles, ...limitedArticles]));
            } else {
                if (page === 1) {
                    setNewsArticles([]);
                }
            }
        }

        fetchNewsArticles();

    }, [page, apiKey, baseURL])

    //Load more 
    const loadMoreFunction = () => {
        setPage(page => page + 1);
        
    };

    return (
        <div className='newsFeedContainer'>
            <h1>News Feed</h1>
            <h3>Header 2</h3>

            <div className='newsCategories'>
                <a>Category 1</a>
                <a>Category 2</a>
                <a>Category 3</a>
                <a>Category 4</a>
            </div>

            <div className='newsArticleCards'>

                {newsArticles.map((article, index) => (
                    <NewsCard 
                        key={index} 
                        article={article}
                        title={article.title}
                        image={article.urlToImage}
                        author={article.author}
                        content={article.content}
                        createdAt={article.publishedAt}
                        url={article.url}
                    />
                ))}
            </div>
                
            <a>
                <button className="loadMoreButton" onClick={loadMoreFunction}>Load More</button>
            </a>
        </div>
    )
}

export default NewsFeed
