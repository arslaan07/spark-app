import React, { useState } from 'react';
import { BiCart } from "react-icons/bi";
import styles from './Iphone.module.css'

// const truncateUrl = (url) => {
//     try {
//         // Remove 'https://' or 'http://' and 'www.' if present
//         let truncated = url.replace(/^(https?:\/\/)?(www\.)?/, '');
//         // Remove any trailing slashes
//         truncated = truncated.replace(/\/$/, '');
//         return truncated.length > 23 ? `${truncated.substr(0, 23)} ...`: truncated;
//     } catch (error) {
//         console.error('Error truncating URL:', error);
//         return url; // Return the original URL if something goes wrong
//     }
// };
const Iphone = ({ backgroundColor, username, profileImage, links }) => {
    const [selectedBtn, setSelectedBtn] = useState('link')
  return (
    <div className={styles.phoneContainer}>
      <div className={styles.phone}>
        <div style={{ backgroundColor: backgroundColor }} className={styles.usercard}>
            <div className={styles.profileHeader}>
                <div className={styles.avatar}>
                <img 
              src={profileImage}
              alt="Profile"
              className={styles.profileImage}
            />
                </div>
            <h3 className={styles.username}>{username}</h3>
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
            {
                selectedBtn === 'link' && <>
                {
                    links.map((link, i) => (
                        <button className={styles.linkBtn}>
                <div className={styles.iconContainer}>
                    <img src="/images/Links/youtube.png" alt="YouTube" />
                </div>
                {link.url}
            </button>
                    ))
                }
                {/* <button className={styles.linkBtn}>
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
            <button className={styles.linkBtn}>
                <div className={styles.iconContainer}>
                    <img src="/images/Links/youtube.png" alt="YouTube" />
                </div>
              Latest YouTube Video
            </button> */}
            </>           
            }
            {/* <div className={styles.shops}> */}
            {
                selectedBtn ==='shop' && <>
                    <div className={styles.shopItem}>
                        <span>magnetic-earbus-connector</span>
                        <button className={styles.buyItem}>
                            <span className={styles.cartIcon}><BiCart /></span>
                            <span>Buy Now</span>
                        </button>
                    </div>
                    <div className={styles.shopItem}>
                        <span>magnetic-earbus-connector</span>
                        <button className={styles.buyItem}>
                            <span className={styles.cartIcon}><BiCart /></span>
                            <span>Buy Now</span>
                        </button>
                    </div>
                    <div className={styles.shopItem}>
                        <span>magnetic-earbus-connector</span>
                        <button className={styles.buyItem}>
                            <span className={styles.cartIcon}><BiCart /></span>
                            <span>Buy Now</span>
                        </button>
                    </div>
                    <div className={styles.shopItem}>
                        <span>magnetic-earbus-connector</span>
                        <button className={styles.buyItem}>
                            <span className={styles.cartIcon}><BiCart /></span>
                            <span>Buy Now</span>
                        </button>
                    </div>
                </>
            }
            {/* </div> */}
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
