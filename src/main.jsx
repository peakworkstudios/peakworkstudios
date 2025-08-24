import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App.jsx'
    // Global styles are now handled by styled-components' createGlobalStyle in App.jsx
    // import './index.css' // This file is no longer needed for global styles

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
