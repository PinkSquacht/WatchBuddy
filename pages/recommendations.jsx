// pages/recommendations.jsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const router = useRouter();
  const { mood } = router.query;
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('useEffect called with mood:', mood);

    const fetchRecommendations = async () => {
      try {
        const response = await axios.post('https://chat-w-flask.onrender.com/recommendations', { mood });
        console.log('Response:', response.data);
        const recommendationsList = response.data.recommendations.split('\n').map(item => item.trim());
        console.log('Parsed Recommendations:', recommendationsList);
        setRecommendations(recommendationsList);
      } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
        setError('Error fetching recommendations. Please try again.');
      }
    };

    if (mood) {
      fetchRecommendations();
    }
  }, [mood]);

  console.log('Current recommendations:', recommendations);
  console.log('Current error:', error);

  return (
    <div>
      <h1>Recommendations for {mood}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      ) : (
        !error && <p>Loading recommendations...</p>
      )}
    </div>
  );
};

export default Recommendations;
