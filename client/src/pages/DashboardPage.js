import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserScores, reset } from '../features/stats/statsSlice';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Spinner from '../components/common/Spinner'; // Import Spinner

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DashboardPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { scores, isLoading } = useSelector((state) => state.stats);

    useEffect(() => {
        dispatch(getUserScores());
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    // If loading, return Spinner
    if (isLoading) {
        return <Spinner />;
    }

    // Prepare data for the chart
    const chartData = {
        labels: scores.map(s => new Date(s.createdAt).toLocaleDateString()).reverse(),
        datasets: [
            {
                label: 'WPM',
                data: scores.map(s => s.wpm).reverse(),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Accuracy (%)',
                data: scores.map(s => s.accuracy).reverse(),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y1',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Your Typing Progress Over Time',
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Words Per Minute (WPM)',
                },
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Accuracy (%)',
                },
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
        },
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Welcome back, {user?.username} 👋</h2>

            {/* Chart Section */}
            {scores.length > 1 ? (
                <div style={{ background: 'var(--accent-color)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
                    <Line options={chartOptions} data={chartData} />
                </div>
            ) : !isLoading && scores.length <= 1 ? (
                <p style={{ textAlign: 'center' }}>Complete at least two tests to see your progress chart.</p>
            ) : null}

            <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Past Results</h3>

            {scores.length > 0 ? (
                <div style={{ maxWidth: '800px', margin: 'auto' }}>
                    {scores.map((score) => (
                        <div key={score._id} style={{ display: 'flex', justifyContent: 'space-around', background: 'var(--accent-color)', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                            <p><strong>WPM:</strong> {score.wpm}</p>
                            <p><strong>Accuracy:</strong> {score.accuracy}%</p>
                            <p><strong>Mode:</strong> {score.mode}</p>
                            <p><strong>Date:</strong> {new Date(score.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: 'center' }}>You haven't completed any tests yet.</p>
            )}

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Link to="/" style={{ textDecoration: 'none', background: 'var(--primary-color)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '5px' }}>
                    Start a New Test
                </Link>
            </div>
        </div>
    );
};

export default DashboardPage;
