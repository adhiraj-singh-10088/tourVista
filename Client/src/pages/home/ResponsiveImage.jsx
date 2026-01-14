import { useState } from "react";
import "./ResponsiveImage.css";

function ResponsiveImage({
  lowSrc,
  highSrc,
  alt = "",
  fit = "cover",
  priority = false,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="image-wrapper" style={{ width: "100%", height: "100%" }}>
      <div className="image-scale" style={{ width: "100%", height: "100%", position: "relative" }}>
        {/* Low quality image */}
        <img
          src={lowSrc}
          alt={alt}
          className="image low"
          aria-hidden="true"
          style={{ objectFit: fit, width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
        />

        {/* High quality image */}
        <img
          src={highSrc}
          alt={alt}
          className={`image high ${loaded ? "loaded" : ""}`}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          style={{ objectFit: fit, width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
        />
      </div>
    </div>
  );
}

export default ResponsiveImage;
