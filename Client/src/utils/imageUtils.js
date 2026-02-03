export const buildUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  if (img.startsWith("/api/v1") || img.startsWith("api/v1/")) return `/${img.replace(/^\//, "")}`;
  if (img.startsWith("/img") || img.startsWith("img/")) return `/api/v1/${img.replace(/^\//, "")}`;
  return `/api/v1/img/tours/${img}`;
};
