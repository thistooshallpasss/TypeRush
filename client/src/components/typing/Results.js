import React from 'react';
import './Results.css';

const Results = ({ results, onRestart }) => {
    // ✅ Destructure the new totalErrors prop
    const { wpm, accuracy, time, totalErrors } = results;

    return (
        <div className="results-container">
            <h2>Test Complete!</h2>
            <div className="results-grid">
                <div className="result-item">
                    <p className="result-label">WPM</p>
                    <p className="result-value">{wpm}</p>
                </div>
                <div className="result-item">
                    <p className="result-label">Accuracy</p>
                    <p className="result-value">{accuracy}%</p>
                </div>
                {/* ✅ Add the new results block */}
                <div className="result-item">
                    <p className="result-label">Total Mistakes</p>
                    <p className="result-value">{totalErrors}</p>
                </div>
            </div>
            <button onClick={onRestart} className="restart-button">
                Try Again
            </button>
        </div>
    );
};

export default Results;