import React, { useState } from 'react';
import { BiCart } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoShareOutline } from "react-icons/io5";
import themes from '../../utils/themes';
import styles from './Mobile.module.css';
import { handleShareProfile } from '../../utils/handleShareProfile';
import { useNavigate, Link } from 'react-router-dom';
import MyToast from '../MyToast/MyToast'
import api from '../../../api';

const Mobile = ({ 
  backgroundColor, 
  username, 
  profileImage, 
  links, 
  shops, 
  Layout,
  selectedTheme, 
  buttonColor, 
  setButtonColor, 
  manualColorChange, 
  buttonFontColor, 
  selectedFont, 
  fontColor, 
  selectedButtonStyle, 
  selectedButtonRadius, 
  bio,
  isLoading,
  setIsLoading
}) => {
  const [selectedBtn, setSelectedBtn] = useState('link');
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

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
    
    switch(selectedButtonStyle) {
      case 'Fill':
        return { ...baseStyle, border: 'none' };
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

  const handleLinkClick = async (url, type, active) => {
    if(!active) {
        MyToast('link has expired', 'error')
        return
    }
    try {
        setIsLoading(true)
        const response = await api.post(`/api/${type}s/${url}/track-click`, { referrer: document.referrer });
        console.log(response);

        if (response.data.success) {
            window.open(response.data.redirectUrl, '_blank');
        }
    } catch (error) {
        console.error("Error in handleLinkClick:", error);
    } finally {
        setIsLoading(false)
    }
  };

  const handleShopClick = async (url, type, active) => {
    if(!active) {
        MyToast('link has expired', 'error')
        return
    }
    try {
        setIsLoading(true)
        const response = await api.post(`/api/${type}s/${url}/track-click`, { referrer: document.referrer });
        console.log(response);

        if (response.data.success) {
            window.open(response.data.redirectUrl, '_blank');
        }
    } catch (error) {
        console.error("Error in handleShopClick:", error);
    } finally {
        setIsLoading(false)
    }
  };

  return (
    <div className={styles.mobileContainer}>
      <div 
        style={{ 
          backgroundColor: selectedTheme !== -1 
            ? themes[selectedTheme]?.backgroundColor 
            : ""
        }} 
        className={styles.mobile}
      >
        {/* User Card */}
        <div style={{ backgroundColor: backgroundColor }} className={styles.usercard}>
            <button
            onClick={() => handleShareProfile(username.slice(1))}
            className={styles.shareIcon}><IoShareOutline size={24} /></button>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>
              {isLoading ? (
                <div className={`${styles.skeleton} ${styles.skeletonAvatar}`}></div>
              ) : (
                <img 
                  src={profileImage}
                  alt="Profile"
                  className={styles.profileImage}
                />
              )}
            </div>
            {isLoading ? (
              <>
                <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
                <div className={`${styles.skeleton} ${styles.skeletonTextShort}`}></div>
              </>
            ) : (
              <>
                <h3 className={styles.username}>{username}</h3>
                <p className={styles.bio}>{bio.content}</p>
              </>
            )}
          </div>
        </div>

        {/* Content */}
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
          
          {/* Skeleton Loading for Links */}
          {isLoading && selectedBtn === 'link' && Layout === 'Stack' && (
            <div className={styles.links}>
              {[1, 2, 3].map((_, i) => (
                <div key={i} className={`${styles.skeleton} ${styles.skeletonButton}`}></div>
              ))}
            </div>
          )}

          {/* Skeleton Loading for Shops */}
          {isLoading && selectedBtn === 'shop' && Layout === 'Stack' && (
            <div className={styles.shops}>
              {[1, 2, 3].map((_, i) => (
                <div key={i} className={`${styles.skeleton} ${styles.skeletonButton}`}></div>
              ))}
            </div>
          )}

          {/* Actual Content */}
          {!isLoading && (
            <>
              {/* List Layout for Links */}
              {selectedBtn === 'link' && Layout === 'Stack' && (
                <div className={styles.links}>
                  {[...links].reverse().map((link, i) => (
                    <button 
                      style={buttonStyle} 
                      key={i} 
                      className={styles.linkBtn}
                      onClick={() => handleLinkClick(link.url, selectedBtn, link.isActive)}
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
              
              {/* Grid Layout for Links */}
              {selectedBtn === 'link' && Layout === 'Grid' && (
                <div className={styles.linksGridLayout}>
                  {[...links].reverse().map((link, i) => (
                    <button 
                      style={buttonStyle} 
                      key={i} 
                      className={styles.linkGridBtn}
                      onClick={() => handleLinkClick(link.url, selectedBtn, link.isActive)}
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
              
              {/* Carousel Layout for Links */}
              {selectedBtn === 'link' && Layout === 'Carousel' && (
                <div className={styles.carouselContainer}>
                  <Slider {...sliderSettings}>
                    {[...links].reverse().map((link, i) => (
                      <div key={i} className={styles.carouselSlide}>
                        <button 
                          style={buttonStyle} 
                          className={styles.linkCarouselItem}
                          onClick={() => handleLinkClick(link.url, selectedBtn, link.isActive)}
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
              
              {/* Shop Items - Stack */}
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
                        onClick={() => handleShopClick(shop.url, selectedBtn, shop.isActive)}
                      >
                        <span className={styles.cartIcon}><BiCart /></span>
                        <span>Buy Now</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Grid Layout for Shop Items */}
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
                        onClick={() => handleShopClick(shop.url, selectedBtn, shop.isActive)}
                      >
                        <span className={styles.cartIcon}><BiCart /></span>
                        <span>Buy</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Carousel Layout for Shop Items */}
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
                            onClick={() => handleShopClick(shop.url, selectedBtn, shop.isActive)}
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
            </>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Link to="/" className={styles.connectBtn}>Get Connected</Link>
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

export default Mobile;