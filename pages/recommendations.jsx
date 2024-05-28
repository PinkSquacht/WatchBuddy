// pages/recommendations.jsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const router = useRouter();
  const { movie, services } = router.query;
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post('https://chat-w-flask.onrender.com/recommendations', { movie,
          streaming_services: services ? services.split(',') : [],
         });
        const recommendationsList = response.data.recommendations.split('\n').map(item => item.trim());
        setRecommendations(recommendationsList);
      } catch (err) {
        setError('Error fetching recommendations. Please try again.');
      }
    };

    if (movie) {
      fetchRecommendations();
    }
  }, [movie, services]);

  console.log('Current recommendations:', recommendations);
  console.log('Current error:', error);

  return (
    <div>
      <h1>Recommendations for {movie}</h1>
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
