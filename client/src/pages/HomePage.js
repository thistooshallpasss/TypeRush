import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TypingBox from '../components/typing/TypingBox';
import Results from '../components/typing/Results';
import { saveScore } from '../features/stats/statsSlice';

const paragraphs = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
    "Never underestimate the power of a good book. It can transport you to new worlds and open your mind.",
    "Technology has revolutionized the way we live, work, and communicate with each other across the globe."
];

const getParagraph = () => paragraphs[Math.floor(Math.random() * paragraphs.length)];

const HomePage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [mode, setMode] = useState('time-60');
    const [duration, setDuration] = useState(60);
    const [testText, setTestText] = useState(getParagraph());
    const [testResults, setTestResults] = useState(null);
    const [isTestActive, setIsTestActive] = useState(false);

    useEffect(() => {
        const time = parseInt(mode.split('-')[1]);
        setDuration(time || 60);
        handleRestart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    const handleTestFinish = useCallback((results) => {
        setTestResults(results);
        setIsTestActive(false);
        if (user) {
            dispatch(saveScore({ ...results, mode }));
        }
    }, [user, mode, dispatch]);

    const handleRestart = () => {
        setTestText(getParagraph());
        setTestResults(null);
        setIsTestActive(false);
    };

    const startTest = () => {
        handleRestart();
        setIsTestActive(true);
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
    };

    const modeButtonStyle = (buttonMode) => ({
        padding: '0.5rem 1rem',
        margin: '0 0.5rem',
        border: '1px solid var(--primary-color)',
        borderRadius: '5px',
        cursor: 'pointer',
        background: mode === buttonMode ? 'var(--primary-color)' : 'transparent',
        color: mode === buttonMode ? 'white' : 'var(--primary-color)',
    });

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Typing Test</h1>
            {isTestActive ? (
                <TypingBox text={testText} duration={duration} onTestFinish={handleTestFinish} />
            ) : testResults ? (
                <Results results={testResults} onRestart={startTest} />
            ) : (
                <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--accent-color)', borderRadius: '8px' }}>
                    <h3>Select a Mode to Begin</h3>
                    <div>
                        <button style={modeButtonStyle('time-30')} onClick={() => handleModeChange('time-30')}>30 Seconds</button>
                        <button style={modeButtonStyle('time-60')} onClick={() => handleModeChange('time-60')}>60 Seconds</button>
                    </div>
                    <button onClick={startTest} style={{ marginTop: '2rem', background: 'var(--primary-color)', color: 'white', padding: '0.75rem 2rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                        Start Test
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;