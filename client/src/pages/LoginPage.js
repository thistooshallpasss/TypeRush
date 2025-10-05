import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isSuccess || user) {
            navigate('/dashboard');
        }
        dispatch(reset());
    }, [user, isSuccess, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
            <h2>Login</h2>
            {isError && <p style={{ color: 'red' }}>{message}</p>}
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={onChange}
                    required
                    style={{
                        padding: '0.75rem',
                        borderRadius: '5px',
                        border: '1px solid var(--secondary-color)',
                    }}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={onChange}
                    required
                    style={{
                        padding: '0.75rem',
                        borderRadius: '5px',
                        border: '1px solid var(--secondary-color)',
                    }}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        background: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p style={{ marginTop: '1rem' }}>
                Don’t have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default LoginPage;
