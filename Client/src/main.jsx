import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* FIX: The entire application is wrapped with the `<BrowserRouter>` component. */}
    {/* WHY: This component enables "client-side routing." It allows the app to change pages (e.g., from Home to Login) without a full page refresh, */}
    {/* creating a smoother single-page application (SPA) experience. It syncs the UI with the URL in the browser's address bar. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
