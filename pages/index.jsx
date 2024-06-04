import styles from "../styles/Home.module.css";
import SearchBar from "@/componets/SearchBar";
import { useState } from "react";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenreOverlayOpen, setIsGenreOverlayOpen] = useState(false);
  const [isStreamingServicesOverlayOpen, setIsStreamingServicesOverlayOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const router = useRouter();

  const handleSearch = (term) => setSearchTerm(term);

  const handleGetRecommendations = () => {
    if (searchTerm.trim()) {
      router.push({
        pathname: '/recommendations',
        query: {
          movie: searchTerm,
          services: selectedServices.join(','),
          genres: selectedGenres.join(',')
        },
      });
    } else {
      console.log('Please enter a movie or television show');
    }
  };

  const toggleGenreOverlay = () => {
    setIsGenreOverlayOpen(!isGenreOverlayOpen);
    setIsStreamingServicesOverlayOpen(false);
  };

  const toggleStreamingServicesOverlay = () => {
    setIsStreamingServicesOverlayOpen(!isStreamingServicesOverlayOpen);
    setIsGenreOverlayOpen(false);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenres(prevSelected =>
      prevSelected.includes(genre)
        ? prevSelected.filter(g => g !== genre)
        : [...prevSelected, genre]
    );
  };

  const handleServiceClick = (service) => {
    setSelectedServices(prevSelected =>
      prevSelected.includes(service)
        ? prevSelected.filter(s => s !== service)
        : [...prevSelected, service]
    );
  };

  const handleDoneClick = () => {
    setIsGenreOverlayOpen(false);
    setIsStreamingServicesOverlayOpen(false);
  };

  return (
  <ChakraProvider theme={theme}>
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Deciding what to watch shouldn’t take forever.</h1>
        <p className={styles.description}>WatchBuddy makes it simple. Tell us what you’re in the mood for and we’ll find you something to watch.</p>
      </header>
      <main className={styles.main}>
        <section className={styles.featureSection}>
          <div className={styles.searchBox}>
            <p>Give me something similar to:</p>
            <SearchBar onSearch={handleSearch} />
            <p>Or</p>
            <p onClick={toggleGenreOverlay} style={{ cursor: 'pointer' }}>Add genre/mood +</p>
            {selectedGenres.length > 0 && (
              <div className={styles.selectedOptions}>
                {selectedGenres.map((genre) => (
                  <span key={genre} className={styles.selectedOption}>
                    {genre} <span className={styles.checkmark}>✓</span>
                  </span>
                ))}
              </div>
            )}
            {isGenreOverlayOpen && (
              <div className={styles.overlay}>
                <h2>Tell us what you’re in the mood for</h2>
                <p>Select up to 6 options</p>
                <div className={styles.options}>
                  <h3>Genre</h3>
                  {["Action", "Adventure", "Animation", "Comedy", "Documentary", "Drama", "Fantasy", "Horror", "Musical", "Romantic Comedy", "Sci-Fi", "Thriller/Suspense"].map((genre) => (
                    <button
                      key={genre}
                      className={`${styles.optionButton} ${selectedGenres.includes(genre) ? styles.selected : ''}`}
                      onClick={() => handleGenreClick(genre)}
                    >
                      {genre} {selectedGenres.includes(genre) ? <span className={styles.checkmark}>✓</span> : <span className={styles.plus}>+</span>}
                    </button>
                  ))}
                </div>
                <div className={styles.options}>
                  <h3>Mood</h3>
                  {["Cynical", "Funny", "Gripping", "Intense", "Heartwarming", "Lighthearted", "Scary", "Moving", "Tense", "Thought-provoking", "Uplifting"].map((mood) => (
                    <button
                      key={mood}
                      className={`${styles.optionButton} ${selectedGenres.includes(mood) ? styles.selected : ''}`}
                      onClick={() => handleGenreClick(mood)}
                    >
                      {mood} {selectedGenres.includes(mood) ? <span className={styles.checkmark}>✓</span> : <span className={styles.plus}>+</span>}
                    </button>
                  ))}
                </div>
                <button className={styles.button} onClick={handleDoneClick}>Done</button>
              </div>
            )}
            <hr />
            <p onClick={toggleStreamingServicesOverlay} style={{ cursor: 'pointer' }}>Add your streaming services (optional) +</p>
            {selectedServices.length > 0 && (
              <div className={styles.selectedOptions}>
                {selectedServices.map((service) => (
                  <span key={service} className={styles.selectedOption}>
                    {service} <span className={styles.checkmark}>✓</span>
                  </span>
                ))}
              </div>
            )}
            {isStreamingServicesOverlayOpen && (
              <div className={styles.overlay}>
                <h2>Add Your Streaming Services</h2>
                <p style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>For personalized recommendations, tell us where to watch</p>
                <div className={styles.services}>
                  {["Netflix", "Hulu", "Amazon Prime", "HBO Max"].map((service) => (
                    <div
                      key={service}
                      className={`${styles.service} ${selectedServices.includes(service) ? styles.selected : ''}`}
                      onClick={() => handleServiceClick(service)}
                    >
                      <img src={`/${service.toLowerCase().replace(/ /g, "_")}.png`} alt={service} />
                      <p>{service}</p>
                    </div>
                  ))}
                </div>
                <button className={styles.button} onClick={handleDoneClick}>Done</button>
              </div>
            )}
            <button className={styles.button} onClick={handleGetRecommendations}>Get recommendations</button>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 WatchBuddy. All rights reserved.</p>
      </footer>
    </div>
  </ChakraProvider>
  );
};

export default Home;
