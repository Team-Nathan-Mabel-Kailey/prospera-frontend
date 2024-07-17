import './NewsCard.css'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NewsCard = ({image, title, author, content, createdAt}) => {
    return (
        <div className='newsCardContainer'>
                <figure>
                    {image ? <img src={image} alt={title} /> : <img src="https://placehold.jp/400x200.png" alt={title} />}
                </figure>
            <h3>{title}</h3>

            <Link to={`/news/${author}`} state={{title, content, createdAt, image}} className="read-more">Read more
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </Link>
        </div>
    )
}

NewsCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
};

export default NewsCard
