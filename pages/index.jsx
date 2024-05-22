// pages/index.js
import Link from "next/link";
import styles from "../styles/Home.module.css";
import SearchBar from "@/componets/SearchBar";
import { useState } from "react";

const Home = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const handleSearch = (searchTerm) => {
    console.log(`Searching for ${searchTerm}`);
  };

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
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
                {/* Add your genre/mood options here */}
                <p>Genre/Mood options...</p>
              </div>
            )}
            <hr />
            <p onClick={toggleOverlay} style={{cursor: 'pointer'}}>Add your streaming services (optional) +</p>
            {isOverlayOpen && (
              <div className={styles.overlay}>
                {/* Add your genre/mood options here */}
                <p>Genre/Mood options...</p>
              </div>
            )}
            <Link href="/movie">
              <button className={styles.button}> Get recommendations</button>
            </Link>
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
