import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NewsCard from './NewsCard';
import Modal from './Modal';
import './NewsFeed.css';
import { useAuth } from '../AuthContext/AuthContext';

const NewsFeed = () => {
    const { user } = useAuth();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('stock-news');
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [currentSearch, setCurrentSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [userTopics, setUserTopics] = useState([]);
    const [hasCompletedTopics, setHasCompletedTopics] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    let BASE_URL = import.meta.env.VITE_BASE_URL;

    const allowedSources = [
        'fox-business', 'business-insider', 'bloomberg', 'abc-news',
        'reuters', 'forbes', 'the-economist', 'wall-street-journal', 'yahoo-finance'
    ];

    const economicNewsSources = [
        'fox-business', 'business-insider', 'bloomberg', 'abc-news',
        'reuters', 'forbes', 'the-economist', 'wall-street-journal', 'yahoo-finance'
    ];

    useEffect(() => {
        const fetchUserTopics = async () => {
            if (user) {
                try {
                    const response = await axios.get(`${BASE_URL}/users/get-topics/${user.userID}`);
                    setUserTopics(response.data.topics);
                    setHasCompletedTopics(response.data.hasCompletedTopics);
                } catch (error) {
                    console.error('Error fetching user topics:', error);
                    setError('Failed to fetch user topics. Please try again later.');
                }
            }
        };

        fetchUserTopics();
    }, [user, BASE_URL]);

    const fetchArticles = async (pageNum = page) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (category === 'stock-news') {
                const options = {
                    method: 'GET',
                    url: 'https://yahoo-finance15.p.rapidapi.com/api/v2/markets/news',
                    params: { type: 'ALL' },
                    headers: {
                        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
                    }
                };
                response = await axios.request(options);
                let allArticles = response.data.body.map(newsItem => ({
                    title: newsItem.title,
                    description: newsItem.text,
                    url: newsItem.url,
                    urlToImage: newsItem.img,
                    source: { name: newsItem.source },
                    publishedAt: newsItem.time
                }));

                if (currentSearch) {
                    allArticles = allArticles.filter(article => 
                        article.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                        article.description.toLowerCase().includes(currentSearch.toLowerCase())
                    );
                }

                setTotalResults(allArticles.length);
                const startIndex = (pageNum - 1) * 9;
                setArticles(allArticles.slice(startIndex, startIndex + 9));
            } else if (category === 'recommended' && userTopics.length > 0) {
                const recommendedArticles = [];
                for (const topic of userTopics) {
                    const newsApiOptions = {
                        method: 'GET',
                        url: 'https://newsapi.org/v2/everything',
                        params: {
                            q: `${topic} ${currentSearch}`.trim(),
                            language: 'en',
                            sortBy: 'publishedAt',
                            pageSize: 9,
                            page: pageNum,
                            apiKey: import.meta.env.VITE_NEWS_API_KEY,
                            sources: allowedSources.join(',')
                        }
                    };
                    const res = await axios.request(newsApiOptions);
                    recommendedArticles.push(...res.data.articles);
                    setTotalResults(res.data.totalResults);
                }
                setArticles(recommendedArticles.slice(0, 9));
            } else {
                const domains = category === 'personal-finance'
                    ? 'forbes.com,bloomberg.com,abcnews.go.com'
                    : '';
                const newsApiOptions = {
                    method: 'GET',
                    url: 'https://newsapi.org/v2/everything',
                    params: {
                        q: `${category} ${currentSearch}`.trim(),
                        language: 'en',
                        sortBy: 'publishedAt',
                        pageSize: 9,
                        page: pageNum,
                        apiKey: import.meta.env.VITE_NEWS_API_KEY,
                        domains: domains || undefined,
                        sources: category === 'economic-news' ? economicNewsSources.join(',') : undefined,
                    }
                };
                response = await axios.request(newsApiOptions);
                setArticles(response.data.articles);
                setTotalResults(response.data.totalResults);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            setError('Failed to fetch articles. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [category, currentSearch, userTopics]);

    const handleCategoryChange = (newCategory) => {
        if (newCategory === 'recommended' && !hasCompletedTopics) {
            setShowModal(true);
        } else {
            setCategory(newCategory);
            setPage(1);
            setQuery('');
            setCurrentSearch('');
        }
    };

    const handleSearchChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setCurrentSearch(query);
        setPage(1);
        fetchArticles(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchArticles(newPage);
        window.scrollTo(0, 0);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleGoToTopics = () => {
        navigate('/topic-selection');
    };

    return (
        <div className="newsFeedContainer">
            <div className="newsfeedTitle">
                <h1>Your Newsfeed</h1>
            </div>

            <div className="newsCategories">
                <button 
                    onClick={() => handleCategoryChange('recommended')} 
                    className={category === 'recommended' ? 'active' : ''}
                >
                    Recommended
                </button>
                <button 
                    onClick={() => handleCategoryChange('stock-news')} 
                    className={category === 'stock-news' ? 'active' : ''}
                >
                    Stock News
                </button>
                <button 
                    onClick={() => handleCategoryChange('market-news')} 
                    className={category === 'market-news' ? 'active' : ''}
                >
                    Market News
                </button>
                <button 
                    onClick={() => handleCategoryChange('personal-finance')} 
                    className={category === 'personal-finance' ? 'active' : ''}
                >
                    Personal Finance
                </button>
                <button 
                    onClick={() => handleCategoryChange('economic-news')} 
                    className={category === 'economic-news' ? 'active' : ''}
                >
                    Economic News
                </button>
            </div>
            <div className="searchForm">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                        placeholder="Search for articles..."
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <div className="newsArticleCards">
                        {articles.map((article, index) => (
                            <NewsCard key={index} article={article} />
                        ))}
                    </div>
                    {articles.length === 0 && (
                        <div>No articles found. Try a different search or category.</div>
                    )}
                    <div className="pagination">
                        <button 
                            onClick={() => handlePageChange(page - 1)} 
                            disabled={page === 1}
                            className='prevBtn'
                        >
                            Previous
                        </button>
                        <span>Page {page}</span>
                        <button 
                            onClick={() => handlePageChange(page + 1)} 
                            disabled={page * 9 >= totalResults}
                            className='nexBtn'
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
            <Modal 
                show={showModal} 
                handleClose={handleCloseModal} 
                handleGoToTopics={handleGoToTopics} 
            />
        </div>
    );
};

export default NewsFeed;