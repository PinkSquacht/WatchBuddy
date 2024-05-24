// pages/index.js
import styles from "../styles/Home.module.css";
import SearchBar from "@/componets/SearchBar";
import { useState } from "react";
import { useRouter } from "next/router";
import { list } from "@chakra-ui/react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]); // [Netflix, Hulu, Amazon Prime, HBO Max]
  const router = useRouter();

  const handleSearch = (term) => {
    console.log('Search term set to:', term);
    setSearchTerm(term);
  };

  const handleGetRecommendations = () => {
    if (searchTerm.trim()) {
      console.log('Navigating to recommendations with term:', searchTerm);
      router.push({
        pathname: '/recommendations',
        query: { mood: searchTerm, services: selectedServices.join(',') },
      });
    } else {
      console.log('Please enter a mood');
    }
    };

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const handleServiceClick = (service) => {
    setSelectedServices((prevSelected) => 
      prevSelected.includes(service)
        ? prevSelected.filter((s) => s !== service)
        : [...prevSelected, service]
    );
  };

  const handleDoneClick = () => {
    setIsOverlayOpen(false);
  };

  return (
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
            <p onClick={toggleOverlay} style={{cursor: 'pointer'}}>Add genre/mood +</p>
            {isOverlayOpen && (
              <div className={styles.overlay}>
                {/* Add your genre/mood here */}
                <p>Genre/Mood options...</p>
              </div>
            )}
            <hr />
            <p onClick={toggleOverlay} style={{cursor: 'pointer'}}>Add your streaming services (optional) +</p>
            {selectedServices.length > 0 && (
              <div className={styles.selectedServices}>
                <p>Selected Services:</p>
                <ul>
                  {selectedServices.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
            )}
            {isOverlayOpen && (
              <div className={styles.overlay}>
                <h2>Select Your Steaming Services</h2>
                <div className={styles.services}>
                  {["Netflix", "Hulu", "Amazon Prime", "HBO Max"].map((service) => (
                    <div
                      key={service}
                      className={ `${styles.service} ${selectedServices.includes(service) ? styles.selected : ''}` }
                      onClick={() => handleServiceClick(service)}
                    >
                      <img src={`/${service.toLowerCase().replace(" ", "_")}.png`} alt={service} />
                      <p>{service}</p>
                    </div>
                  ))}
                </div>
                <button className={styles.button} onClick={handleDoneClick}>Done</button>
              </div>
              )}
              <button className={styles.button} onClick={handleGetRecommendations}> Get recommendations</button>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 Watch Buddy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
