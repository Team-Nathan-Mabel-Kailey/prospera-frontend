import { useState, useEffect } from "react";
import './NewsFeed.css';
import NewsCard from './NewsCard';

const categories = [
    { name: 'Market News', query: 'market-news' },
    { name: 'Personal Finance', query: 'personal-finance' },
    { name: 'Economic News', query: 'economic-news' },
    { name: 'Stock News', query: 'stock-news' },
];

const NewsFeed = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(categories[0].query);
    const [loading, setLoading] = useState(false);

    const apiKey = import.meta.env.VITE_API_KEY;
    let baseURL = `https://newsapi.org/v2`;

    useEffect(() => {
        const fetchNewsArticles = async () => {
            setLoading(true);
            let url = `${baseURL}/everything?q=${selectedCategory}&apiKey=${apiKey}&page=${page}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.articles && data.articles.length > 0) {
                    const filteredArticles = data.articles.filter(article => 
                        !article.title.includes('[Removed]') && !article.content.includes('[Removed]')
                    );
                    const limitedArticles = filteredArticles.slice(0, 6);
                    setNewsArticles(prevArticles => (
                        page === 1 ? limitedArticles : [...prevArticles, ...limitedArticles]
                    ));
                } else {
                    if (page === 1) {
                        setNewsArticles([]);
                    }
                }
            } catch (error) {
                console.error('Error fetching news articles:', error);
            }
            setLoading(false);
        };

        fetchNewsArticles();
    }, [page, apiKey, baseURL, selectedCategory]);

    const loadMoreFunction = () => {
        setPage(page => page + 1);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setPage(1);
    };

    return (
        <div className='newsFeedContainer'>
            <h1>News Feed</h1>
            <h3>Financial News</h3>

            <div className='newsCategories'>
                {categories.map(category => (
                    <a 
                        key={category.query} 
                        className={category.query === selectedCategory ? 'active' : ''}
                        onClick={() => handleCategoryChange(category.query)}
                    >
                        {category.name}
                    </a>
                ))}
            </div>

            <div className='newsArticleCards'>
                {newsArticles.map((article, index) => (
                    <NewsCard 
                        key={index} 
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
                <button className="loadMoreButton" onClick={loadMoreFunction} disabled={loading}>
                    {loading ? 'Loading...' : 'Load More'}
                </button>
            </a>
        </div>
    );
}

export default NewsFeed;
