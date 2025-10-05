// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import './TypingBox.css';

// const TypingBox = ({ text, duration, onTestFinish }) => {
//     const [userInput, setUserInput] = useState('');
//     const [timeRemaining, setTimeRemaining] = useState(duration);
//     const [isRunning, setIsRunning] = useState(false);
//     const [errors, setErrors] = useState(0);

//     const intervalRef = useRef(null);
//     const inputRef = useRef(null);

//     useEffect(() => {
//         inputRef.current.focus();
//     }, []);

//     const calculateResults = useCallback(() => {
//         const timeTaken = duration - timeRemaining;
//         const grossWPM = timeTaken > 0 ? (userInput.length / 5) / (timeTaken / 60) : 0;
//         const accuracy = userInput.length > 0 ? Math.max(0, Math.round(((userInput.length - errors) / userInput.length) * 100)) : 100;
//         return { wpm: Math.round(grossWPM), accuracy, time: timeTaken };
//     }, [duration, timeRemaining, userInput, errors]);

//     useEffect(() => {
//         if (isRunning && timeRemaining > 0) {
//             intervalRef.current = setInterval(() => {
//                 setTimeRemaining((prev) => prev - 1);
//             }, 1000);
//         } else if (timeRemaining === 0 && isRunning) {
//             setIsRunning(false);
//             onTestFinish(calculateResults());
//         }
//         return () => clearInterval(intervalRef.current);
//     }, [isRunning, timeRemaining, onTestFinish, calculateResults]);

//     const handleChange = (e) => {
//         const val = e.target.value;
//         if (!isRunning && timeRemaining > 0) {
//             setIsRunning(true);
//         }
//         if (val.length >= text.length) {
//             setIsRunning(false);
//             onTestFinish(calculateResults());
//             return;
//         }
//         setUserInput(val);
//         calculateErrors(val);
//     };

//     const calculateErrors = (currentInput) => {
//         let errorCount = 0;
//         const textToCompare = text.substring(0, currentInput.length);
//         for (let i = 0; i < currentInput.length; i++) {
//             if (currentInput[i] !== textToCompare[i]) {
//                 errorCount++;
//             }
//         }
//         setErrors(errorCount);
//     };

//     const renderText = () => {
//         return text.split('').map((char, idx) => {
//             let className = 'char-pending';
//             if (idx < userInput.length) {
//                 className = char === userInput[idx] ? 'char-correct' : 'char-incorrect';
//             }
//             return <span key={idx} className={className}>{char}</span>;
//         });
//     };

//     return (
//         <div className="typing-box">
//             <div className="stats-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
//                 <div className="stat">Time: <strong>{timeRemaining}s</strong></div>
//                 <div className="stat">Errors: <strong>{errors}</strong></div>
//             </div>
//             <div className="text-display">{renderText()}</div>
//             <textarea
//                 ref={inputRef}
//                 value={userInput}
//                 onChange={handleChange}
//                 placeholder="Start typing here..."
//                 className="text-input"
//                 disabled={!isRunning && timeRemaining !== duration}
//             />
//         </div>
//     );
// };

// export default TypingBox;


import React, { useState, useEffect, useRef, useCallback } from 'react';
import './TypingBox.css';

const TypingBox = ({ text, duration, onTestFinish }) => {
    const [userInput, setUserInput] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const [currentErrors, setCurrentErrors] = useState(0); // Renamed for clarity
    const [totalErrors, setTotalErrors] = useState(0); // ✅ New state for total mistakes

    const intervalRef = useRef(null);
    const inputRef = useRef(null);
    const lastInputLength = useRef(0); // To check if user is typing forward or backspacing

    // Focus on the input field when the component mounts
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // Calculate results (WPM, accuracy, etc.) and include totalErrors in the results
    const calculateResults = useCallback(() => {
        const timeTaken = duration - timeRemaining;
        const grossWPM = timeTaken > 0 ? (userInput.length / 5) / (timeTaken / 60) : 0;
        const accuracy = userInput.length > 0 ? Math.max(0, Math.round(((userInput.length - currentErrors) / userInput.length) * 100)) : 100;
        // ✅ Include totalErrors in the final results
        return { wpm: Math.round(grossWPM), accuracy, time: timeTaken, totalErrors };
    }, [duration, timeRemaining, userInput, currentErrors, totalErrors]);

    // Timer logic: Update the time remaining and trigger test finish when the time is up
    useEffect(() => {
        if (isRunning && timeRemaining > 0) {
            intervalRef.current = setInterval(() => {
                setTimeRemaining((prev) => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0 && isRunning) {
            setIsRunning(false);
            onTestFinish(calculateResults());
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, timeRemaining, onTestFinish, calculateResults]);

    // Handle user input and detect errors
    const handleChange = (e) => {
        const val = e.target.value;
        if (!isRunning && timeRemaining > 0) setIsRunning(true);

        // ✅ New logic to track every mistake
        if (val.length > lastInputLength.current) { // User is typing forward
            const lastCharTyped = val[val.length - 1];
            const expectedChar = text[val.length - 1];
            if (lastCharTyped !== expectedChar) {
                setTotalErrors((prev) => prev + 1);
            }
        }
        lastInputLength.current = val.length;

        // Check for completion (test finish when user completes the text)
        if (val.length >= text.length) {
            setIsRunning(false);
            onTestFinish(calculateResults());
            setUserInput(val); // Set one last time before returning
            return;
        }

        setUserInput(val);
        calculateCurrentErrors(val);
    };

    // Calculate the number of errors in the current user input
    const calculateCurrentErrors = (currentInput) => {
        let errorCount = 0;
        for (let i = 0; i < currentInput.length; i++) {
            if (currentInput[i] !== text[i]) errorCount++;
        }
        setCurrentErrors(errorCount);
    };

    // Render the text with different styles for correct, incorrect, and pending characters
    const renderText = () => {
        return text.split('').map((char, idx) => {
            let className = 'char-pending';
            if (idx < userInput.length) {
                className = char === userInput[idx] ? 'char-correct' : 'char-incorrect';
            }
            return <span key={idx} className={className}>{char}</span>;
        });
    };

    return (
        <div className="typing-box">
            <div className="stats-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div className="stat">Time: <strong>{timeRemaining}s</strong></div>
                {/* ✅ Display the new totalErrors metric */}
                <div className={`stat ${timeRemaining <= 10 ? 'timer-urgent' : ''}`}>
                    Time: <strong>{timeRemaining}s</strong>
                </div>
                <div className="stat">Mistakes: <strong>{totalErrors}</strong></div>
            </div>
            <div className="text-display">{renderText()}</div>
            <textarea
                ref={inputRef}
                value={userInput}
                onChange={handleChange}
                placeholder="Start typing here..."
                className="text-input"
                disabled={!isRunning && timeRemaining !== duration}
            />
        </div>
    );
};

export default TypingBox;
