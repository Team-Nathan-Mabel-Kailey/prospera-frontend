import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NewsCard from './NewsCard';
import Modal from './Modal';
import './NewsFeed.css';

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('stock-news');
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [userTopics, setUserTopics] = useState([]);
    const [hasCompletedTopics, setHasCompletedTopics] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const allowedSources = [
        'fox-business', 'business-insider', 'bloomberg', 'abc-news', 
        'reuters', 'forbes', 'the-economist', 'wall-street-journal', 'yahoo-finance'
    ];

    useEffect(() => {
        const fetchUserTopics = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`http://localhost:3000/users/get-topics/${userId}`);
                setUserTopics(response.data.topics);
                setHasCompletedTopics(response.data.hasCompletedTopics);
            } catch (error) {
                console.error('Error fetching user topics:', error);
                setError('Failed to fetch user topics. Please try again later.');
            }
        };

        fetchUserTopics();
    }, []);

    useEffect(() => {
        const fetchArticles = async (reset = false) => {
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
                    setArticles(reset ? articles : [...articles, ...articles]);
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
                                pageSize: 5, // Limit the number of articles per topic
                                page,
                                apiKey: import.meta.env.VITE_NEWS_API_KEY,
                                sources: allowedSources.join(',')
                            }
                        };
                        const res = await axios.request(newsApiOptions);
                        recommendedArticles.push(...res.data.articles);
                    }
                    setArticles(reset ? recommendedArticles : [...articles, ...recommendedArticles]);
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
                            pageSize: 20,
                            page,
                            apiKey: import.meta.env.VITE_NEWS_API_KEY,
                            domains: domains || undefined,
                        }
                    };
                    response = await axios.request(newsApiOptions);
                    setArticles(reset ? response.data.articles : [...articles, ...response.data.articles]);
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
                setError('Failed to fetch articles. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles(true);
    }, [category, query, userTopics]);

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

    const loadMoreArticles = () => {
        setPage(page + 1);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleGoToTopics = () => {
        navigate('/topic-selection');
    };

    useEffect(() => {
        if (page > 1) {
            const fetchMoreArticles = async () => {
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
                        const moreArticles = response.data.body.map(newsItem => ({
                            title: newsItem.title,
                            description: newsItem.text,
                            url: newsItem.url,
                            urlToImage: newsItem.img,
                            source: { name: newsItem.source },
                            publishedAt: newsItem.time
                        }));
                        setArticles([...articles, ...moreArticles]);
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
                                    pageSize: 5, // Limit the number of articles per topic
                                    page,
                                    apiKey: import.meta.env.VITE_NEWS_API_KEY,
                                    sources: allowedSources.join(',')
                                }
                            };
                            const res = await axios.request(newsApiOptions);
                            recommendedArticles.push(...res.data.articles);
                        }
                        setArticles([...articles, ...recommendedArticles]);
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
                                pageSize: 20,
                                page,
                                apiKey: import.meta.env.VITE_NEWS_API_KEY,
                                domains: domains || undefined,
                            }
                        };
                        response = await axios.request(newsApiOptions);
                        setArticles([...articles, ...response.data.articles]);
                    }
                } catch (error) {
                    console.error('Error fetching more articles:', error);
                    setError('Failed to fetch more articles. Please try again later.');
                } finally {
                    setLoading(false);
                }
            };

            fetchMoreArticles();
        }
    }, [page]);

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
                        {articles.map((article, index) => (
                            <NewsCard key={index} article={article} />
                        ))}
                    </div>
                    <button className="loadMoreButton" onClick={loadMoreArticles}>Load More</button>
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
