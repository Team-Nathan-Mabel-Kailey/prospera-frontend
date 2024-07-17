import './NewsCard.css'
import PropTypes from 'prop-types';

const NewsCard = ({image, title, onClick}) => {
    return (
        <div className='newsCardContainer' onClick={onClick}>
            <figure>
                <img src={image} alt={title} />
            </figure>
            <h3>{title}</h3>

            <a href="" className="read-more">Read more
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </a>
        </div>
    )
}

NewsCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default NewsCard
