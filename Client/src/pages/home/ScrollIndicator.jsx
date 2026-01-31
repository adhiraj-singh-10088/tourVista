import "./ScrollIndicator.css";

function ScrollIndicator() {
    return (
        <div className="scroll-indicator">
            <div className="mouse">
                <div className="wheel"></div>
            </div>
            <div className="arrow">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default ScrollIndicator;
