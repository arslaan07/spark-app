// Modified Iphone component to accept and use selectedButtonStyle prop

// In Iphone.jsx
import React, { useState } from 'react';
import { BiCart } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './Iphone.module.css'

const Iphone = ({ backgroundColor, username, profileImage, links, shops, Layout, themes,
    selectedTheme, buttonColor, buttonFontColor, selectedFont, fontColor, selectedButtonStyle, selectedButtonRadius }) => {
    const [selectedBtn, setSelectedBtn] = useState('link');
    // Slider settings for carousel
    const sliderSettings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };

    // Function to get button style based on selection
    const getButtonStyle = () => {
      const baseStyle = {
        backgroundColor: selectedTheme !== -1 ? themes[selectedTheme]?.buttonColor : buttonColor,
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
            border: `1px solid ${buttonColor}`,
          };
        case 'Hard shadow':
          return {
            ...baseStyle,
            backgroundColor: '#fff',
            border: `1px solid ${buttonColor}`,
            boxShadow: `4px 4px 0 ${buttonColor}`,
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

  return (
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
              {links.map((link, i) => (
                <button 
                  style={buttonStyle} 
                  key={i} 
                  className={styles.linkBtn}
                >
                  <div className={styles.iconContainer}>
                    <img src="/images/Links/youtube.png" alt="YouTube" />
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
              {links.map((link, i) => (
                <button 
                  style={buttonStyle} 
                  key={i} 
                  className={styles.linkGridBtn}
                >
                  <div className={styles.iconGridContainer}>
                    <img src="/images/Links/youtube.png" alt="YouTube" />
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
                {links.map((link, i) => (
                  <div key={i} className={styles.carouselSlide}>
                    <button 
                      style={buttonStyle} 
                      className={styles.linkCarouselItem}
                    >
                      <div className={styles.iconCarouselContainer}>
                        <img src="/images/Links/youtube.png" alt="YouTube" />
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
              {shops.map((shop) => (
                <div 
                  key={shop.id}
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
              {shops.map((shop) => (
                <div  
                  key={shop.id}
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
                {shops.map((shop) => (
                  <div key={shop.id} className={styles.carouselSlide}>
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