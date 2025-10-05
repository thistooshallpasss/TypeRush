import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TypingBox from '../components/typing/TypingBox';
import Results from '../components/typing/Results';
import { saveScore } from '../features/stats/statsSlice';

// 70+ word paragraphs for 30-second tests
const paragraphs30s = [
    "The journey of a thousand miles begins with a single step. This ancient proverb reminds us that even the most daunting tasks are achievable if we break them down into smaller, manageable parts. Consistency, patience, and a clear vision are the keys to unlocking potential. Every effort, no matter how small it may seem at the time, contributes to the final outcome. Remember to celebrate the small victories along the way, as they provide the fuel for the long road ahead.",
    "In the heart of the bustling city, there was a quiet park, a small oasis of green amidst the concrete jungle. People from all walks of life would gather there to escape the noise and haste of their daily routines. Children's laughter echoed from the playground, while artists sketched the tranquil scenery. It served as a beautiful reminder that moments of peace and serenity can be found even in the most unexpected places if one only takes a moment to look."
];

// 140+ word paragraphs for 60-second tests
const paragraphs60s = [
    "Artificial intelligence is rapidly transforming our world, from the way we interact with technology to how businesses operate. Machine learning algorithms, a subset of AI, can now analyze vast amounts of data to identify patterns and make predictions with incredible accuracy. This has led to breakthroughs in fields like medicine, where AI helps in diagnosing diseases earlier, and in finance, where it detects fraudulent transactions. However, this technological revolution also brings forth important ethical considerations regarding privacy, job displacement, and algorithmic bias. As we continue to develop more advanced AI systems, it is crucial that we establish strong guidelines and regulations to ensure that these powerful tools are used responsibly and for the benefit of all humanity. The future will be shaped by how we navigate these complex challenges and harness the full potential of artificial intelligence.",
    "The study of astronomy opens a window to the vastness of the universe, revealing wonders that stretch the limits of human imagination. From the fiery birth of stars in stellar nurseries to the mysterious pull of black holes, every discovery unveils another layer of cosmic complexity. Telescopes, both on Earth and in space, act as our eyes, peering across billions of light-years to capture faint glows from distant galaxies. Each image tells a story of cosmic evolution, a grand narrative written in the language of light and gravity. Understanding our place within this immense cosmos is not just a scientific endeavor but a philosophical one, prompting us to reflect on our own existence and the intricate web of connections that binds everything together. The quest for knowledge is as boundless as the universe itself."
];

// Helper function to get a random paragraph
const getParagraph = (mode) => {
    if (mode === 'time-30') {
        return paragraphs30s[Math.floor(Math.random() * paragraphs30s.length)];
    }
    return paragraphs60s[Math.floor(Math.random() * paragraphs60s.length)];
};

const HomePage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [mode, setMode] = useState('time-60');
    const [duration, setDuration] = useState(60);
    const [testText, setTestText] = useState(getParagraph(mode));
    const [testResults, setTestResults] = useState(null);
    const [isTestActive, setIsTestActive] = useState(false);

    useEffect(() => {
        const time = parseInt(mode.split('-')[1]);
        setDuration(time || 60);
        handleRestart();
    }, [mode]);

    const handleTestFinish = useCallback((results) => {
        setTestResults(results);
        setIsTestActive(false);
        if (user) {
            dispatch(saveScore({ ...results, mode }));
        }
    }, [user, mode, dispatch]);

    const handleRestart = () => {
        setTestText(getParagraph(mode));
        setTestResults(null);
        setIsTestActive(false);
    };

    const startTest = () => {
        handleRestart();
        setIsTestActive(true);
    }

    const handleModeChange = (newMode) => {
        setMode(newMode);
    };

    const modeButtonStyle = (buttonMode) => ({ /* ... styles remain the same ... */ });

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