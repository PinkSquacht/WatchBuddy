import { useState } from 'react';
import axios from 'axios';

export default function Recommendations() {
    const [mood, setMood] = useState('');
    const [recommendations, setRecommendations] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/recommendations', { mood });
            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error(error);
            setError('Error: Unable to get recommendations');
        }
    };

    return (
        <div>
            <h1>Get Recommendations</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="Enter your mood"
                    required
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {recommendations && (
                <div>
                    <h2>Recommendations:</h2>
                    <p>{recommendations}</p>
                </div>
            )}
        </div>
    );
}