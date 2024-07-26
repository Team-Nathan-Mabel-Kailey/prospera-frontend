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
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [userTopics, setUserTopics] = useState([]);
    const [hasCompletedTopics, setHasCompletedTopics] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

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
                    const response = await axios.get(`http://localhost:3000/users/get-topics/${user.userID}`);
                    setUserTopics(response.data.topics);
                    setHasCompletedTopics(response.data.hasCompletedTopics);
                } catch (error) {
                    console.error('Error fetching user topics:', error);
                    setError('Failed to fetch user topics. Please try again later.');
                }
            }
        };

        fetchUserTopics();
    }, [user]);

    useEffect(() => {
        const fetchArticles = async () => {
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
                    const articles = response.data.body.map(newsItem => ({
                        title: newsItem.title,
                        description: newsItem.text,
                        url: newsItem.url,
                        urlToImage: newsItem.img,
                        source: { name: newsItem.source },
                        publishedAt: newsItem.time
                    }));
                    setArticles(articles);
                    setTotalResults(response.data.body.length);
                } else if (category === 'recommended' && userTopics.length > 0) {
                    const recommendedArticles = [];
                    for (const topic of userTopics) {
                        const newsApiOptions = {
                            method: 'GET',
                            url: 'https://newsapi.org/v2/everything',
                            params: {
                                q: topic,
                                language: 'en',
                                sortBy: 'publishedAt',
                                pageSize: 9,
                                page,
                                apiKey: import.meta.env.VITE_NEWS_API_KEY,
                                sources: allowedSources.join(',')
                            }
                        };
                        const res = await axios.request(newsApiOptions);
                        recommendedArticles.push(...res.data.articles);
                        setTotalResults(res.data.totalResults);
                    }
                    setArticles(recommendedArticles);
                } else if (category === 'economic-news') {
                    const newsApiOptions = {
                        method: 'GET',
                        url: 'https://newsapi.org/v2/everything',
                        params: {
                            q: query || category,
                            language: 'en',
                            sortBy: 'publishedAt',
                            pageSize: 9,
                            page,
                            apiKey: import.meta.env.VITE_NEWS_API_KEY,
                            sources: economicNewsSources.join(',')
                        }
                    };
                    response = await axios.request(newsApiOptions);
                    setArticles(response.data.articles);
                    setTotalResults(response.data.totalResults);
                } else {
                    const domains = category === 'personal-finance'
                        ? 'forbes.com,bloomberg.com,abcnews.go.com'
                        : '';
                    const newsApiOptions = {
                        method: 'GET',
                        url: 'https://newsapi.org/v2/everything',
                        params: {
                            q: query || category,
                            language: 'en',
                            sortBy: 'publishedAt',
                            pageSize: 9,
                            page,
                            apiKey: import.meta.env.VITE_NEWS_API_KEY,
                            domains: domains || undefined,
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

        fetchArticles();
    }, [category, query, userTopics, page]);

    const handleCategoryChange = (newCategory) => {
        if (newCategory === 'recommended' && !hasCompletedTopics) {
            setShowModal(true);
        } else {
            setCategory(newCategory);
            setPage(1);
            setQuery('');
        }
    };

    const handleSearchChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
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
                        {articles.slice(0, 9).map((article, index) => (
                            <NewsCard key={index} article={article} />
                        ))}
                    </div>
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
