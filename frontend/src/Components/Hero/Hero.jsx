import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
      setTimeout(() => setIsLoading(false), 1000); 
    }, []);
  

  return (
    <section className={styles.heroSection}>
      {isLoading ? (
        <>
          <div className={styles.leftContent}>
          <h1 className={styles.title}>
              The easiest place to update and share your Connection
            </h1>
            <p className={styles.description}>
              Help your followers discover everything you're sharing all over the internet, in one simple place. They'll thank you for it!
            </p>
            <div className={`${styles.skeletonButton} ${styles.skeleton}`}></div>
          </div>
          <div className={styles.rightContent}>
            <div className={`${styles.skeletonImage} ${styles.skeleton}`}></div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.leftContent}>
            <h1 className={styles.title}>
              The easiest place to update and share your Connection
            </h1>
            <p className={styles.description}>
              Help your followers discover everything you're sharing all over the internet, in one simple place. They'll thank you for it!
            </p>
            <Link to={'/sign-up'} className={styles.getStartedBtn}>Get your free Spark</Link>
          </div>
          <div className={styles.rightContent}>
            <div className={styles.dashboardImage}>
              <img src="/images/Hero/dashboard.png" alt="Analytics Dashboard" />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;