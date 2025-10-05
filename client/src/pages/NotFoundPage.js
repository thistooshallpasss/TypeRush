import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h1>404</h1>
            <h3>Oops! Page not found.</h3>
            <p>The page you're looking for doesn’t exist or has been moved.</p>
            <Link
                to="/"
                style={{
                    display: 'inline-block',
                    marginTop: '1.5rem',
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                }}
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
