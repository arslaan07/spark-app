// Modified Iphone component to accept and use selectedButtonStyle prop

// In Iphone.jsx
import React, { useState } from 'react';
import { BiCart } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import themes from '../../utils/themes'
import applications from '../../utils/applications'
import styles from './Iphone.module.css'

const Iphone = ({ backgroundColor, username, profileImage, links, shops, Layout, isLoading,
    selectedTheme, buttonColor, setButtonColor, manualColorChange, buttonFontColor, selectedFont, fontColor, selectedButtonStyle, selectedButtonRadius, bio }) => {
    const [selectedBtn, setSelectedBtn] = useState('link')
    console.log(isLoading)
    // Slider settings for carousel
    const sliderSettings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };
    // console.log(links)
    // Function to get button style based on selection
    const getButtonStyle = () => {
      const effectiveButtonColor = manualColorChange 
        ? buttonColor 
        : (selectedTheme === -1 ? themes[selectedTheme]?.buttonColor : buttonColor);
      const baseStyle = {
        backgroundColor: effectiveButtonColor,
        color: buttonFontColor,
        fontFamily: selectedFont,
        borderRadius: selectedButtonRadius, 
      };
      
      // Add specific styles based on selectedButtonStyle
      switch(selectedButtonStyle) {
        case 'Fill':
          return {
            ...baseStyle,
            border: 'none',
          };
        case 'Outline':
          return {
            ...baseStyle,
            backgroundColor: 'transparent',
            border: `1px solid #232429`,
          };
        case 'Hard shadow':
          return {
            ...baseStyle,
            backgroundColor: '#fff',
            border: `1px solid #232429`,
            boxShadow: `4px 4px 0 #232429`,
          };
        case 'Soft shadow':
          return {
            ...baseStyle,
            backgroundColor: '#fff',
            border: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          };
        default:
          return baseStyle;
      }
    };

    const buttonStyle = getButtonStyle();

  return isLoading ? (
    <div className={styles.phoneContainer}>
      <div className={styles.phone}>

        {/* Rest of the code remains the same */}
        {/* User Card Skeleton */}
      <div className={styles.usercard}>
        <div className={styles.profileHeader}>
          <div className={`${styles.avatar} ${styles.skeleton} ${styles.skeletonProfileImage}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonUsername}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonBio}`}></div>
        </div>
      </div>
        <div className={styles.dynamicIsland}></div>
        <div className={styles.content}>
          <div className={styles.buttons}>
            <div className={`${styles.skeleton} ${styles.skeletonLinkBtn}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonLinkBtn}`}></div>
          </div>
          
          {/* List Layout for Links - with updated button style */}
          {selectedBtn === 'link' && Layout === 'Stack' && (
            <div className={styles.links}>
              {[...links].reverse().map((link, i) => (
                <div key={i} className={`${styles.skeleton} ${styles.skeletonLink}`}></div>
              ))}
            </div>
          )}
          
          {/* Grid Layout for Links - with updated button style */}
          {selectedBtn === 'link' && Layout === 'Grid' && (
            <div className={styles.linksGridLayout}>
              {[...links].reverse().map((link, i) => (
                <div key={i} className={`${styles.skeleton} ${styles.skeletonLink}`}></div>
              ))}
            </div>
          )}
          
          {/* Carousel Layout for Links - with updated button style */}
          {selectedBtn === 'link' && Layout === 'Carousel' && (
            <div className={styles.carouselContainer}>
              <Slider {...sliderSettings}>
                {[...links].reverse().map((link, i) => (
                  <div key={i} className={`${styles.skeleton} ${styles.skeletonLink}`}></div>
                ))}
              </Slider>
            </div>
          )}
          
          {/* Shop Items - with updated button style for Buy buttons */}
          {selectedBtn === 'shop' && Layout === 'Stack' && (
            <div className={styles.shops}>
              {[...shops].reverse().map((shop, i) => (
                <div key={i} className={`${styles.skeleton} ${styles.skeletonLink}`}></div>
              ))}
            </div>
          )}
          
          {/* Grid Layout for Shop Items - with updated button style */}
          {selectedBtn === 'shop' && Layout === 'Grid' && (
            <div className={styles.shopGridLayout}>
              {[...shops].reverse().map((shop) => (
                <div key={i} className={`${styles.skeleton} ${styles.skeletonLink}`}></div>
              ))}
            </div>
          )}
          
          {/* Carousel Layout for Shop Items - with updated button style */}
          {selectedBtn === 'shop' && Layout === 'Carousel' && (
            <div className={styles.carouselContainer}>
              <Slider {...sliderSettings}>
                {[...shops].reverse().map((shop) => (
                  <div key={i} className={`${styles.skeleton} ${styles.skeletonLink}`}></div>
                ))}
              </Slider>
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <button className={styles.connectBtn}>Get Connected</button>
          <div className={styles.logo}>
            <div className={styles.logoImg}>
              <img src="/images/Footer/chingari.png" alt="Spark" />
              <div className={styles.dot}></div> 
            </div>
            <span className={styles.textWrapper}>
              <span className={styles.sparktext}>SPARK<sup>TM</sup></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.phoneContainer}>
      <div style={{ backgroundColor: selectedTheme !== -1 ? themes[selectedTheme]?.backgroundColor : ""}} className={styles.phone}>
        {/* Rest of the code remains the same */}
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
                <p className={styles.bio}>{bio.content}</p>
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
          
          {/* List Layout for Links - with updated button style */}
          {selectedBtn === 'link' && Layout === 'Stack' && (
            <div className={styles.links}>
              {[...links].reverse().map((link, i) => (
                <button 
                  style={buttonStyle} 
                  key={i} 
                  className={styles.linkBtn}
                >
                  <div className={styles.iconContainer}>
                    <img src={`/images/LinkModal/${link.application.toLowerCase()}.png`} alt={link.application} />
                  </div>
                  <div className={styles.marqueeContainer}>
                    <div className={styles.marqueeText}>
                      <span style={{ fontFamily: selectedFont }}>{link.url}</span>
                      <span style={{ fontFamily: selectedFont }}>{link.url}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {/* Grid Layout for Links - with updated button style */}
          {selectedBtn === 'link' && Layout === 'Grid' && (
            <div className={styles.linksGridLayout}>
              {[...links].reverse().map((link, i) => (
                <button 
                  style={buttonStyle} 
                  key={i} 
                  className={styles.linkGridBtn}
                >
                  <div className={styles.iconGridContainer}>
                  <img src={`/images/LinkModal/${link.application.toLowerCase()}.png`} alt={link.application} />
                  </div>
                  <div className={styles.marqueeContainer}>
                    <div className={styles.marqueeText}>
                      <span style={{ fontFamily: selectedFont }}>{link.url}</span>
                      <span style={{ fontFamily: selectedFont }}>{link.url}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {/* Carousel Layout for Links - with updated button style */}
          {selectedBtn === 'link' && Layout === 'Carousel' && (
            <div className={styles.carouselContainer}>
              <Slider {...sliderSettings}>
                {[...links].reverse().map((link, i) => (
                  <div key={i} className={styles.carouselSlide}>
                    <button 
                      style={buttonStyle} 
                      className={styles.linkCarouselItem}
                    >
                      <div className={styles.iconCarouselContainer}>
                      <img src={`/images/LinkModal/${link.application.toLowerCase()}.png`} alt={link.application} />
                      </div>
                      <div className={styles.marqueeContainer}>
                        <div className={styles.marqueeText}>
                          <span style={{ fontFamily: selectedFont }}>{link.url}</span>
                          <span style={{ fontFamily: selectedFont }}>{link.url}</span>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </Slider>
            </div>
          )}
          
          {/* Shop Items - with updated button style for Buy buttons */}
          {selectedBtn === 'shop' && Layout === 'Stack' && (
            <div className={styles.shops}>
              {[...shops].reverse().map((shop) => (
                <div 
                  key={shop._id}
                  style={{ 
                    border: selectedTheme !== -1 ? themes[selectedTheme]?.border : "",
                  }}  
                  className={styles.shopItem}
                >
                  <div className={styles.marqueeContainer}>
                    <div className={styles.marqueeText}>
                      <span style={{ fontFamily: selectedFont, color: fontColor }}>{shop.title}</span>
                      <span style={{ fontFamily: selectedFont, color: fontColor }}>{shop.title}</span>
                    </div>
                  </div>
                  <button 
                    style={buttonStyle} 
                    className={styles.buyItem}
                  >
                    <span className={styles.cartIcon}><BiCart /></span>
                    <span>Buy Now</span>
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Grid Layout for Shop Items - with updated button style */}
          {selectedBtn === 'shop' && Layout === 'Grid' && (
            <div className={styles.shopGridLayout}>
              {[...shops].reverse().map((shop) => (
                <div  
                  key={shop._id}
                  style={{ 
                    border: selectedTheme !== -1 ? themes[selectedTheme]?.border : "",
                  }} 
                  className={styles.shopGridItem}
                >
                  <div className={styles.marqueeContainer}>
                    <div className={styles.marqueeText}>
                      <span style={{ fontFamily: selectedFont, color: fontColor }} className={styles.shopGridLink}>{shop.title}</span>
                      <span style={{ fontFamily: selectedFont, color: fontColor }} className={styles.shopGridLink}>{shop.title}</span>
                    </div>
                  </div>
                  <button 
                    style={buttonStyle} 
                    className={styles.buyGridItem}
                  >
                    <span className={styles.cartIcon}><BiCart /></span>
                    <span>Buy</span>
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Carousel Layout for Shop Items - with updated button style */}
          {selectedBtn === 'shop' && Layout === 'Carousel' && (
            <div className={styles.carouselContainer}>
              <Slider {...sliderSettings}>
                {[...shops].reverse().map((shop) => (
                  <div key={shop._id} className={styles.carouselSlide}>
                    <div 
                      style={{
                        border: selectedTheme !== -1 ? themes[selectedTheme]?.border : "",
                      }} 
                      className={styles.shopCarouselItem}
                    >
                      <div className={styles.marqueeContainer}>
                        <div className={styles.marqueeText}>
                          <span style={{ fontFamily: selectedFont, color: fontColor }} className={styles.shopCarouselTitle}>{shop.title}</span>
                          <span style={{ fontFamily: selectedFont, color: fontColor }} className={styles.shopCarouselTitle}>{shop.title}</span>
                        </div>
                      </div>
                      <button 
                        style={buttonStyle} 
                        className={styles.buyCarouselItem}
                      >
                        <span className={styles.cartIcon}><BiCart /></span>
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <button className={styles.connectBtn}>Get Connected</button>
          <div className={styles.logo}>
            <div className={styles.logoImg}>
              <img src="/images/Footer/chingari.png" alt="Spark" />
              <div className={styles.dot}></div> 
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