import React from 'react';

const footerStyle = {
    textAlign: 'center',
    padding: '1.5rem',
    marginTop: '3rem',
    backgroundColor: 'var(--accent-color)',
    color: 'var(--secondary-color)',
    borderTop: '1px solid #ddd',
};

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <p>&copy; {new Date().getFullYear()} TypeRush. Built for your portfolio.</p>
        </footer>
    );
};

export default Footer;