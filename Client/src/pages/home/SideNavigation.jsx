import "./SideNavigation.css";

function SideNavigation({ activeSection, sections, onNavigate }) {
    return (
        <div className="side-navigation">
            {sections.map((section, index) => (
                <button
                    key={index}
                    className={`nav-dot ${activeSection === index ? "active" : ""}`}
                    onClick={() => onNavigate(index)}
                    title={section.label}
                    aria-label={`Go to ${section.label}`}
                >
                    <span className="dot-label">{section.label}</span>
                </button>
            ))}
        </div>
    );
}

export default SideNavigation;
