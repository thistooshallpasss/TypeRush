import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '', // ✅ CHANGED from 'name'
        email: '',
        password: '',
    });

    const { username, email, password } = formData; // ✅ CHANGED from 'name'
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        // We will reset the state on unmount or on error
        return () => {
            dispatch(reset());
        }
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess || user) {
            navigate('/dashboard');
        }
    }, [user, isSuccess, navigate]);

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ username, email, password })); // ✅ CHANGED from 'name'
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
            <h2>Register</h2>
            {isError && <p style={{ color: 'red' }}>{message || 'An error occurred'}</p>}
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    name="username" // ✅ CHANGED from 'name'
                    value={username} // ✅ CHANGED from 'name'
                    placeholder="Username" // ✅ CHANGED from 'Name'
                    onChange={onChange}
                    required
                    style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid var(--secondary-color)' }}
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={onChange}
                    required
                    style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid var(--secondary-color)' }}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password (min 6 characters)"
                    onChange={onChange}
                    required
                    style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid var(--secondary-color)' }}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '5px', cursor: 'pointer' }}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p style={{ marginTop: '1rem' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)' }}>Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;