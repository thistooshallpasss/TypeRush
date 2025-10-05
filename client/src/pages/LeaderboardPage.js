import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaderboard, reset } from '../features/leaderboard/leaderboardSlice';
import Spinner from '../components/common/Spinner'; // Import Spinner

const LeaderboardPage = () => {
    const dispatch = useDispatch();
    // We'll add a state for mode selection later. For now, let's hardcode one.
    const [mode] = useState('time-60');

    const { leaderboard, isLoading, isError, message } = useSelector(
        (state) => state.leaderboard
    );

    useEffect(() => {
        dispatch(getLeaderboard(mode));
        return () => {
            dispatch(reset());
        };
    }, [dispatch, mode]);

    // If loading, return Spinner
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>🏆 Leaderboard</h2>
            <h4>Top scores for mode: {mode}</h4>

            {isError && <p style={{ color: 'red' }}>{message}</p>}

            <table style={{ margin: '2rem auto', borderCollapse: 'collapse', width: '80%', backgroundColor: 'var(--accent-color)' }}>
                <thead>
                    <tr style={{ background: 'var(--primary-color)', color: 'white' }}>
                        <th style={{ padding: '1rem' }}>Rank</th>
                        <th style={{ padding: '1rem' }}>Player</th>
                        <th style={{ padding: '1rem' }}>WPM</th>
                        <th style={{ padding: '1rem' }}>Accuracy</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((player, index) => (
                        <tr key={player._id} style={{ borderBottom: '1px solid var(--secondary-color)' }}>
                            <td style={{ padding: '1rem' }}>{index + 1}</td>
                            <td style={{ padding: '1rem' }}>{player.user.username}</td>
                            <td style={{ padding: '1rem', fontWeight: 'bold' }}>{player.wpm}</td>
                            <td style={{ padding: '1rem' }}>{player.accuracy}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardPage;
