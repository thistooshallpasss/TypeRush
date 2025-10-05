import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { useTheme } from '../../context/ThemeContext';

// Basic inline styles for demonstration. You can move these to a CSS file.
const navStyle = {
    background: 'var(--navbar-bg)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    color: 'var(--text-color)',
};

const linkStyle = {
    color: 'var(--text-color)',
    textDecoration: 'none',
    margin: '0 1rem',
    fontWeight: 'bold',
};

const logoStyle = {
    ...linkStyle,
    fontSize: '1.5rem',
};

const buttonStyle = {
    background: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '1rem',
};

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { theme, toggleTheme } = useTheme();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <nav style={navStyle}>
            <Link to="/" style={logoStyle}>
                TypeRush
            </Link>
            <div>
                <Link to="/leaderboard" style={linkStyle}>
                    Leaderboard
                </Link>
                {user ? (
                    <>
                        <Link to="/dashboard" style={linkStyle}>
                            Dashboard
                        </Link>
                        <button onClick={onLogout} style={buttonStyle}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={linkStyle}>
                            Login
                        </Link>
                        <Link to="/register" style={linkStyle}>
                            Register
                        </Link>
                    </>
                )}
                <button onClick={toggleTheme} style={buttonStyle}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
