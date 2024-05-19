// pages/index.js
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to Watch Buddy</h1>
        <p className={styles.description}>Find your next favorite movie</p>
      </header>

      <main className={styles.main}>
        <section className={styles.featureSection}>
          <h2>Explore Movies</h2>
          <p>Search and discover movies tailored to your taste</p>
          <Link href="/movie">
            <button className={styles.button}>Get Started</button>
          </Link>
        </section>
        <section className={styles.featureSection}>
          <h2>Personalized Recommendations</h2>
          <p>Receive movie suggestions based on your preferences</p>
        </section>
        <section className={styles.featureSection}>
          <h2>Connect with Streaming Services</h2>
          <p>Sync your accounts to get the best recommendations</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Watch Buddy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
