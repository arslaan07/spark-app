import React, { useState } from 'react';
import styles from './Iphone.module.css'

const Iphone = () => {
    const [selectedBtn, setSelectedBtn] = useState('link')
    const [profileImage, setProfileImage] = useState('/images/Iphone/default.png') 
  return (
    <div className={styles.phoneContainer}>
      <div className={styles.phone}>
        <div className={styles.usercard}>
            <div className={styles.profileHeader}>
                <div className={styles.avatar}>
                <img 
              src={profileImage}
              alt="Profile"
              className={styles.profileImage}
            />
                </div>
            <h3 className={styles.username}>@peppo_08</h3>
          </div>
        </div>
        <div className={styles.dynamicIsland}></div>
        <div className={styles.content}>
          <div className={styles.buttons}>
          <span 
            className={`${styles.button} ${selectedBtn === 'link' ? styles.active : ''}`}
            onClick={() => setSelectedBtn('link')}
          >
            Link
          </span>
          <span 
            className={`${styles.button} ${selectedBtn === 'shop' ? styles.active : ''}`}
            onClick={() => setSelectedBtn('shop')}
          >
            Shop
          </span>
          </div>
          <div className={styles.links}>
            <button className={styles.linkBtn}>
                <div className={styles.iconContainer}>
                    <img src="/images/Links/youtube.png" alt="YouTube" />
                </div>
              Latest YouTube Video
            </button>
            <button className={styles.linkBtn}>
                <div className={styles.iconContainer}>
                    <img src="/images/Links/instagram.png" alt="Instagram" />
                </div>
              Latest Instagram Post
            </button>
          </div>
        </div>
        <div className={styles.footer}>
            <button className={styles.connectBtn}>Get Connected</button>
            <div className={styles.logo}>
                    <div className={styles.logoImg}>
                      <img src="/images/Footer/chingari.png" alt="Spark" />
                      <div className={styles.dot} ></div> 
                    </div>
                    <span className={styles.textWrapper}>
                      <span className={styles.sparktext}>SPARK<sup>TM</sup></span>
                    </span>
                  </div>
        </div>
      </div>
    </div>
  );
};

export default Iphone;
