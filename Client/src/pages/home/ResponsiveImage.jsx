function ResponsiveImage({
  src,
  alt = "",
  fit = "cover",
  priority = false,
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: fit,
          objectPosition: "center",
          display: "block",
        }}
      />
    </div>
  );
}

export default ResponsiveImage;
