import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import React, { useState, useEffect } from 'react';
import { RiTruckLine } from 'react-icons/ri';

const Footer = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000); 
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        {isLoading ? (
          // Shimmer effect for loading state
          <>
            <div className={styles.footerGrid}>
              <div className={styles.column}>
                <div className={`${styles.skeletonActionButtons} ${styles.skeleton}`}></div>
              </div>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className={styles.column}>
                  <div className={`${styles.skeletonList} ${styles.skeleton}`}></div>
                </div>
              ))}
            </div>
            <div className={styles.info}>
              <div className={`${styles.skeletonDisclaimer} ${styles.skeleton}`}></div>
              <div className={`${styles.skeletonSocialLinks} ${styles.skeleton}`}></div>
            </div>
          </>
        ) : (
          // Actual content
          <>
            <div className={styles.footerGrid}>
              <div className={styles.column}>
                <div className={styles.actionButtons}>
                  <Link style={{ fontWeight: "600" }} to={'/sign-in'} className={styles.loginBtn}>Log in</Link>
                  <Link style={{ color: "#fff", fontWeight: "600" }} to={'/sign-up'} className={styles.signupBtn}>Sign up free</Link>
                </div>
              </div>
              <div className={styles.column}>
                <ul>
                  <li><a href="#">About Spark</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Press</a></li>
                  <li><a href="#">Social Board</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
              <div className={styles.column}>
                <ul>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Getting Started</a></li>
                  <li><a href="#">Featured Access Fee</a></li>
                  <li><a href="#">Help</a></li>
                </ul>
              </div>
              <div className={styles.column}>
                <ul>
                  <li><a href="#">Terms and Conditions</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Cookie Notice</a></li>
                  <li><a href="#">Trust Center</a></li>
                </ul>
              </div>
            </div>
            <div className={styles.info}>
              <p className={styles.disclaimer}>* The testimonials above are based on real user experiences. Results may vary depending on individual use cases. For more information about <span className={styles.spark}>SPARK</span> and its features, please visit our office</p>
              <div className={styles.socialLinks}>
                <a href="#"><img src='/images/Footer/twitter.png' className={styles.twitter} /></a>
                <a href="#"><img src='/images/Footer/instagram.png' className={styles.instagram} /></a>
                <a href="#"><img src='/images/Footer/youtube.png' className={styles.youtube} /></a>
                <a href="#"><img src='/images/Footer/tiktok.png' className={styles.tiktok} /></a>
                <a href="#"><img src='/images/Footer/chingari.png' className={styles.chingari} /></a>
              </div>
            </div>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;