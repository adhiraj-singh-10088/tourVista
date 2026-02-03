export default function ThemeToggle({ isLightMode, setIsLightMode }) {
  return (
    <button className="mode-toggle" onClick={() => setIsLightMode((p) => !p)} aria-label="Toggle color theme">
      {isLightMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
