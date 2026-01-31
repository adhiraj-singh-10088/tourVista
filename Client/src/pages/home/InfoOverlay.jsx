import { Link } from "react-router-dom";
import "./InfoOverlay.css";

function InfoOverlay() {
    return (
        <div className="info-overlay">
            <div className="info-content">
                <h2 className="info-title">Discover Your Next Adventure</h2>
                <div className="info-points">
                    <div className="info-point">
                        <div className="point-icon">🌍</div>
                        <div className="point-text">
                            <h3>Explore Exotic Destinations</h3>
                            <p>From ancient pyramids to vast deserts, discover the world's most breathtaking locations</p>
                        </div>
                    </div>
                    <div className="info-point">
                        <div className="point-icon">⭐</div>
                        <div className="point-text">
                            <h3>Curated Experiences</h3>
                            <p>Handpicked tours designed by travel experts to give you unforgettable memories</p>
                        </div>
                    </div>
                </div>
                <div className="cta-container">
                    <Link to="/tours" className="cta-button">
                        Explore All Tours
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default InfoOverlay;
