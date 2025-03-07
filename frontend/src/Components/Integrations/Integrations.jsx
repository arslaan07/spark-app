import styles from './Integrations.module.css';
import React, { useState, useEffect } from 'react';

const Integrations = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
      setTimeout(() => setIsLoading(false), 1000); 
    }, []);
  

  return (
    <section className={styles.integrationsSection}>
      <h2 className={styles.title}>All Link Apps and Integrations</h2>

      <div className={styles.integrationGrid}>
        {isLoading ? (
          // Shimmer effect for loading state (excluding h3 and p)
          Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className={`${styles.integrationCard} ${styles.skeleton}`}>
              <div className={`${styles.skeletonIcon} ${styles.skeleton}`}></div>
              <div className={styles.skeletonText}>
                <h3>Loading...</h3> {/* Placeholder for h3 */}
                <p>Loading...</p> {/* Placeholder for p */}
              </div>
            </div>
          ))
        ) : (
          // Actual content
          <>
            <div className={styles.integrationCard}>
              <div className={styles.iconWrapper}>
                <img src="/images/Integrations/audio.png" alt="Audiomack" />
              </div>
              <div>
                <h3>Audiomack</h3>
                <p>Add an Audiomack player to your Linktree</p>
              </div>
            </div>

            <div className={styles.integrationCard}>
              <div className={styles.iconWrapper}>
                <img src="/images/Integrations/bands.png" alt="Bandsintown" />
              </div>
              <div>
                <h3>Bandsintown</h3>
                <p>Drive ticket sales by listing your events</p>
              </div>
            </div>

            <div className={styles.integrationCard}>
              <div className={styles.iconWrapper}>
                <img src="/images/Integrations/bonfire.png" alt="Bonfire" />
              </div>
              <div>
                <h3>Bonfire</h3>
                <p>Display and sell your custom merch</p>
              </div>
            </div>

            <div className={styles.integrationCard}>
              <div className={styles.iconWrapper}>
                <img src="/images/Integrations/book.png" alt="Books" />
              </div>
              <div>
                <h3>Books</h3>
                <p>Promote books on your Linktree</p>
              </div>
            </div>

            <div className={styles.integrationCard}>
              <div className={styles.iconWrapper}>
                <img src="/images/Integrations/gift.png" alt="Buy Me A Gift" />
              </div>
              <div>
                <h3>Buy Me A Gift</h3>
                <p>Get tipped for what you do with a small gift</p>
              </div>
            </div>

            <div className={styles.integrationCard}>
              <div className={styles.iconWrapper}>
                <img src="/images/Integrations/cameo.png" alt="Cameo" />
              </div>
              <div>
                <h3>Cameo</h3>
                <p>Make impossible fan connections possible</p>
              </div>
            </div>

            <div className={styles.integrationCard}>
              <div className={styles.iconWrapper}>
                <img src="/images/Integrations/club.png" alt="Clubhouse" />
              </div>
              <div>
                <h3>Clubhouse</h3>
                <p>Let your community in on the conversation</p>
              </div>
            </div>

            <div className={styles.integrationCard}>
              <div className={styles.iconWrapper}>
                <img src="/images/Integrations/community.png" alt="Community" />
              </div>
              <div>
                <h3>Community</h3>
                <p>Build an SMS subscriber list</p>
              </div>
            </div>

            <div className={styles.integrationCard}>
              <div className={styles.iconWrapper}>
                <img src="/images/Integrations/contact.png" alt="Contact" />
              </div>
              <div>
                <h3>Contact</h3>
                <p>Easily share downloadable contact details</p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Integrations;