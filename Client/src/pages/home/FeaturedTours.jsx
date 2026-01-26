import './FeaturedTours.css';
import useTours from '../../hooks/useTours';
import { useNavigate } from 'react-router-dom';

const FeaturedTours = () => {
    const navigate = useNavigate();
    const { status, tours } =
        useTours(5, new URLSearchParams("limit=5&sort=-ratingsAverage"));

    if (status === "loading") {
        return <p>Loading Featured tours…</p>;
    }

    return (
        <div className="featured-tours-container">
            <h2 className="section-title">Featured Tours</h2>
            <div className="tours-wrapper">
                {tours.map((tour) => (
                    <div key={tour._id} className="tour-card">
                        <img
                            src={`/api/v1/img/tours/${tour.imageCover}`}
                            alt={tour.name}
                            className="tour-bg"
                            loading="lazy"
                        />
                        <div className="tour-content">
                            <div className="tour-minimized">
                                <h3>{tour.difficulty}</h3>
                            </div>
                            <div className="tour-expanded">
                                <h3>{tour.name}</h3>
                                <p>{tour.summary}</p>
                                <span className="tour-price">{`₹ ${tour.price}`}</span>
                                <button className="book-btn"
                                    onClick={() => navigate("/tours")}
                                >View More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedTours;
