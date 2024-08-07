import React, { useState, useEffect } from 'react';
import './NewsWidget.css';
import axios from 'axios';

const NewsWidget = ({ data }) => {
    const articles = {
        "Stocks": {
            title: "Stocks up slightly as market tries to recoup Monday’s losses: Live updates",
            description: "U.S. stocks were mixed on Wednesday, with tech giants like Apple gaining while companies such as Airbnb and Super Micro Computer declined following earnings reports, as markets continued to recover from Monday's sharp drop.",
            urlToImage: "https://image.cnbcfm.com/api/v1/image/108016822-1722954760100-gettyimages-2165544319-ms1_8094_1eylb1d9.jpeg?v=1722954884&w=740&h=416&ffmt=webp&vtcrop=y",
            url: "https://www.cnbc.com/2024/08/06/stock-market-today-live-updates.html"
        },
        "Budgeting": {
            title: "9 Steps To Include Fun in Your Budget",
            description: "Balancing your budget to include both essential expenses and funds for enjoyable activities can help prevent overspending caused by feeling deprived, allowing you to maintain financial stability while still enjoying life.",
            urlToImage: "https://www.becu.org/-/media/Images/heroes-page-promos/blog-articles/2022/Everyday-Finance/Steps-To-Include-Fun-In-Your-Budget_HERO_760x290.jpg?h=290&iar=0&w=760&rev=39dafa9700974db1821264b504fce882&hash=4D7058C8318ABA18153DF9DFCCD1B42E",
            url: "https://www.becu.org/blog/steps-to-include-fun-in-your-budget"
        },
        "Maintaining Good Credit": {
            title: "A good credit score matters. Here’s how to build and improve yours",
            description: "Despite record consumer debt levels due to inflation and rising interest rates, the average U.S. credit score remains good, and individuals can take steps to improve their scores, which are crucial for obtaining loans, credit cards, and even basic services like housing and utilities.",
            urlToImage: "https://fortune.com/img-assets/wp-content/uploads/2023/05/Recommends_build_and_improve_credit.jpg?w=1440&q=75",
            url: "https://fortune.com/recommends/credit-cards/how-to-build-and-improve-your-credit-score/"
        },
        "Credit Card Tips": {
            title: "7 Credit Card Tips Everyone Should Know",
            description: "Credit cards offer convenience, safety, and rewards for everyday purchases while building credit, but optimizing their use through responsible spending, full payments, and understanding card features can maximize their benefits.",
            urlToImage: "https://www.nerdwallet.com/assets/blog/wp-content/uploads/2020/06/FB-GettyImages-1058730264-770x462.jpg",
            url: "https://www.nerdwallet.com/article/credit-cards/credit-card-tips-everyone-should-know"
        },
        "Paying Bills": {
            title: "60+ Clever Ways to Lower Your Household Bills and Save Money",
            description: "While there are many money-saving strategies available, creating and adhering to a budget, particularly by analyzing and reducing utility costs, is the most effective yet often overlooked method for lowering household bills.",
            urlToImage: "https://www.rd.com/wp-content/uploads/2021/06/GettyImages-496776564-e1624733416223.jpg?fit=700,700",
            url: "https://www.rd.com/list/lower-bills/"
        },
        "Spending": {
            title: "5 tips to save money on back-to-school shopping — this weekend and beyond",
            description: "As back-to-school shopping season begins, families can save money on the expected $875 average spend by utilizing strategies like planning around tax-free shopping dates in participating states.",
            urlToImage: "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/3000x2059+0+0/resize/1600/quality/85/format/webp/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F65%2F89%2F09d8c3554913ace292fbc9e06e67%2Fgettyimages-82291787.jpg",
            url: "https://www.npr.org/2024/08/02/nx-s1-5057591/back-to-school-shopping-tips-deals"
        }
    };

    const stopPropagation = (evt) => {
        evt.stopPropagation();
    };

    const article = articles[data.query] || {
        title: "No article found",
        description: "Sorry, we couldn't find an article for this topic.",
        urlToImage: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        url: "#"
    };

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
    );
};

export default NewsWidget;

    // Used for fetching articles using NewsAPI (not available on deployed sites, pay-wall)
    // const [article, setArticle] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const allowedSources = [
    //     'fox-business', 'business-insider', 'bloomberg', 'abc-news', 
    //     'reuters', 'forbes', 'the-economist', 'wall-street-journal', 'yahoo-finance'
    // ];

    // const fetchOneArticle = async (query) => {
    //     const response = await axios.get('https://newsapi.org/v2/everything', {
    //         params: {
    //             q: query,
    //             language: 'en',
    //             sortBy: 'publishedAt',
    //             pageSize: 1,
    //             apiKey: import.meta.env.VITE_NEWS_API_KEY,
    //             sources: "fox-business,business-insider,bloomberg,yahoo-finance"
    //         },
    //     });
    //     return response.data.articles[0];
    // };

    // useEffect(() => {
    //     const getArticle = async () => {
    //         try {
    //             const fetchedArticle = await fetchOneArticle(data.query);
    //             setArticle(fetchedArticle);
    //         } catch (err) {
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     getArticle();
    // }, [data.query]);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    // if (!article) return <div>No article found</div>;