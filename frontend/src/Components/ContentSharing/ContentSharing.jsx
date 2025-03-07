import styles from './ContentSharing.module.css';
import React, { useState, useEffect } from 'react';

const ContentSharing = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
      setTimeout(() => setIsLoading(false), 1000); 
    }, []);
  
  return (
    <section className={styles.sharingSection}>
      {isLoading ? (
        <>
          <div className={styles.textContent}>
          <h2 className={styles.title}>
              Share limitless content in limitless ways
            </h2>
            <p className={styles.description}>
              Connect your content in all its forms and help followers find more of what they're looking for. Your TikToks, Tweets, YouTube videos, music, articles, recipes, podcasts and more - it all comes together in one powerful place.
            </p>
          </div>
          <div className={styles.previewCards}>
            <div className={styles.cardContainer}>
              <div className={`${styles.skeletonCard} ${styles.skeleton}`}></div>
              <div className={`${styles.skeletonCard} ${styles.skeleton}`}></div>
              <div className={`${styles.skeletonCard} ${styles.skeleton}`}></div>
            </div>
            <p className={styles.share}>Share your content in limitless ways on your Spark</p>
          </div>
        </>
      ) : (
        <>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              Share limitless content in limitless ways
            </h2>
            <p className={styles.description}>
              Connect your content in all its forms and help followers find more of what they're looking for. Your TikToks, Tweets, YouTube videos, music, articles, recipes, podcasts and more - it all comes together in one powerful place.
            </p>
          </div>
          <div className={styles.previewCards}>
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <img src="/images/ContentSharing/bubble.png" alt="Content Preview" />
              </div>
              <div className={styles.card}>
                <img src="/images/ContentSharing/woman.png" alt="Content Preview" />
              </div>
              <div className={styles.card}>
                <img src="/images/ContentSharing/man.png" alt="Content Preview" />
              </div>
            </div>
            <p className={styles.share}>Share your content in limitless ways on your Spark</p>
          </div>
        </>
      )}
    </section>
  );
};

export default ContentSharing;