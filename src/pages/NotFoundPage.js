// NotFoundPage.jsx
import React from 'react';
// import '../styles/NotFoundPage.css'; 
import "../styles/pages-styles/NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <p className="error-message">Page Not Found</p>
        <p className="error-description">
          Sorry, the page you are looking for does not exist.
        </p>
        <a href="/admin" className="back-link">Go back to Dashboard</a>
      </div>
    </div>
  );
}


export default NotFoundPage;
