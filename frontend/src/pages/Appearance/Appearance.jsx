// pages/Appearance/Appearance.jsx
import { useState } from "react";
import styles from "./Appearance.module.css";
import Iphone from "../../Components/Iphone/Iphone";
import SpecialButton from "../../Components/SpecialButton/SpecialButton";
import ThemeButtons from "../../Components/ThemeButtons/ThemeButtons";

const layouts = [
  { id: 1, name: "Stack", icon: "☰" },
  { id: 2, name: "Grid", icon: "⊞" },
  { id: 3, name: "Carousel", icon: "⊟" }
];

const buttonStyles = [
  { id: 1, name: "Fill" },
  { id: 2, name: "Outline" },
  { id: 3, name: "Hard shadow" },
  { id: 4, name: "Soft shadow" },
];
const specialButtonStyles = [
    { id: 1, name: "Torn Edge", type: "tornButton" },
    { id: 2, name: "Wavy Edge", type: "wavyButton" },
    { id: 3, name: "Rounded", type: "rounded" },
    { id: 4, name: "Half-Rounded", type: "halfRounded" },
]
const themes = [
  { id: 1, name: "Air Snow", backgroundColor: "E0E2D9", buttonColor: "#2A3235", border: "none" },
  { id: 2, name: "Air Gray", backgroundColor: "#EBEEF1", buttonColor: "#FFF", border: "none" },
  { id: 3, name: "Air Smoke", backgroundColor: "#2A3235", buttonColor: "#FFF", border: "none" },
  { id: 4, name: "Air Black", backgroundColor: "#000", buttonColor: "#1C1C1C", border: "none" },
  { id: 5, name: "Mineral Blue", backgroundColor: "#E0F6FF", buttonColor: "#E0F6FF", border: "1px solid #333" },
  { id: 6, name: "Mineral Green", backgroundColor: "#E0FAEE", buttonColor: "#E0FAEE", border: "1px solid #333" },
  { id: 7, name: "Mineral Orange", backgroundColor: "#FFEEE2", buttonColor: "#FFEEE2", border: "1px solid #333" }
];
const backgroundColor = ["#000", "rgb(156, 108, 108)", "#28A263"];
const links = [
    {
      id: 1,
      title: "Instagram",
      url: "https://www.instagram.com/opopo_08//opopo_08/",
      clicks: 0,
    },
    {
      id: 2,
      title: "Twitter",
      url: "https://twitter.com/opopo_08/www.iom/opopo_08/",
      clicks: 0,
    },
    {
      id: 3,
      title: "Facebook",
      url: "https://www.facebook.com/opopo_08",
      clicks: 0,
    },
    {
        id: 4,
        title: "Facebook",
        url: "https://www.facebook.com/opopo_08",
        clicks: 0,
      },
      {
        id: 5,
        title: "Facebook",
        url: "https://www.facebook.com/opopo_08",
        clicks: 0,
      },
      {
        id: 6,
        title: "Facebook",
        url: "https://www.facebook.com/opopo_08",
        clicks: 0,
      },
  ];
  
  const shops = [
    {
      id: 1,
      title: "Amazon Shop",
      url: "https://www.amazon.com/rechargeable-magnetic-charger/ww_08/",
      clicks: 0,
    },
    {
      id: 2,
      title: "Etsy Shop",
      url: "https://www.etsy.com/shop/opopo_08www.instagram.ram.com/opopo_08/",
      clicks: 0,
    },
    {
      id: 3,
      title: "eBay Shop",
      url: "https://www.ebay.com/usr/opopo_08",
      clicks: 0,
    },
    {
        id: 4,
        title: "eBay Shop",
        url: "https://www.ebay.com/usr/opopo_08",
        clicks: 0,
      },
      {
        id: 5,
        title: "eBay Shop",
        url: "https://www.ebay.com/usr/opopo_08",
        clicks: 0,
      },
  ];
function Appearance() {
  const [profileImage, setProfileImage] = useState("/images/Iphone/default.png");
  const [bannerBackground, setBannerBackground] = useState("#000");
  const [username, setUsername] = useState('@pepeoye');
  const [Layout, setLayout] = useState('Stack');
  const [selectedButtonStyle, setSelectedButtonStyle] = useState('Fill');
  const [buttonColor, setButtonColor] = useState('#28A263');
  const [buttonFontColor, setButtonFontColor] = useState('#fff');
  const [selectedFont, setSelectedFont] = useState('Poppins');
  const [fontColor, setFontColor] = useState('#000');
  const [selectedTheme, setSelectedTheme] = useState(-1);

  return (
    <div className={styles.appearanceContainer}>
      <section className={styles.leftSection}>
        <Iphone 
          backgroundColor={bannerBackground} 
          username={username}
          profileImage={profileImage} 
          links={links}
          shops={shops}
          Layout={Layout}
          themes={themes}
          selectedTheme={selectedTheme}
          buttonColor={buttonColor}
          buttonFontColor={buttonFontColor}
          selectedFont={selectedFont}
          fontColor={fontColor}
          selectedButtonStyle={selectedButtonStyle}
        />
      </section>

      <section className={styles.rightSection}>

        {/* Layout Section */}
        <h3>Layout</h3>
        <div className={styles.section}>
          
          <div className={styles.layoutGrid}>
            {layouts.map((layout) => (
                
              <button
                key={layout.id}
                className={`${styles.layoutCard} ${
                  Layout === layout.name ? styles.selected : ""
                }`}
                onClick={() => setLayout(layout.name)}
              >
                <div style={{ transform: layout.id === 3 ? "rotate(90deg)" : "none" }} className={styles.layoutIcon}>{layout.icon}</div>
                <span>{layout.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Buttons Section */}
        <h3>Buttons</h3>
        <div className={styles.section}>
          <div className={styles.buttonStyles}>
          {buttonStyles.map((style) => (
  <div key={style.id} className={styles.buttonStyleGroup}>
    <span className={styles.buttonStyleLabel}>{style.name}</span>
    <div className={styles.buttonExamples}>
      {["0px", "10px", "30px"].map((radius) => (
        <button 
          key={radius}
          style={{ borderRadius: radius }} 
          className={`${styles.buttonExample} ${styles[style.name.toLowerCase().replace(' ', '')]}`}
          onClick={() => setSelectedButtonStyle(style.name)} // Add this line
        ></button>
      ))}
    </div>
  </div>
))}
            <span className={styles.buttonStyleLabel}>Special</span>
            <div className={styles.specialStyles}>
                {specialButtonStyles.map((style) => (
                    <SpecialButton key={style.id} name={style.name} type={style.type} />
                ))}
            </div>
            
     
          </div>

          {/* Button Colors */}
          <div className={styles.buttonLabel}>Button color</div>
          <div className={styles.colorPicker}>
            <button
                            className={styles.customColorOption}
                            style={{ backgroundColor: buttonColor }}
                          ></button>
            <div className={styles.buttonInputContainer}>
                <label>Button color</label>
                <input 
                  type="text" 
                  value={buttonColor}
                  onChange={(e) => setButtonColor(e.target.value)}
                  
                />
            </div>
          </div>
          <div className={styles.buttonLabel}>Button font color</div>
          <div className={styles.colorPicker}>
            <button
                            className={styles.customColorOption}
                            style={{ backgroundColor: buttonFontColor }}
                          ></button>
            <div className={styles.buttonInputContainer}>
                <label >Button font color</label>
                <input 
                  type="text" 
                  value={buttonFontColor}
                  onChange={(e) => setButtonFontColor(e.target.value)}
                />
            </div>
          </div>
        </div>

        {/* Fonts Section */}
          <h3>Fonts</h3>
        <div className={styles.section}>
            <div className={styles.buttonLabel}>Font</div>
          <div className={styles.fontSelector}>
            <div className={styles.fontPreview}>
              <span className={styles.fontIcon}>
              <button
                            className={styles.customColorOption}
                            style={{ backgroundColor: "#f3f3f1", fontSize: "18px", fontFamily: selectedFont }}
                          >
                            Aa
                          </button>
              </span>
              <input 
                  type="text" 
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  style={{ border: "none", fontSize: "18px", outline: "none"}}
                />
            </div>
          </div>
          <div className={styles.buttonLabel}>Color</div>
            <div className={styles.colorPicker}>
            <button
                            className={styles.customColorOption}
                            style={{ backgroundColor: fontColor }}
                          ></button>
            <div className={styles.buttonInputContainer}>
                <label>Color</label>
                <input 
                  type="text" 
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                />
            </div>
          </div>
        </div>

        {/* Themes Section */}
          <h3>Themes</h3>
        <div className={styles.section}>
          <div className={styles.themeGrid}>
            {themes.map((theme) => (
                <div className={styles.themeCardContainer}>
              <div
                key={theme.id}
                className={`${styles.themeCard} ${
                  selectedTheme === theme.id ? styles.selected : ""
                }`}
                onClick={() => setSelectedTheme(theme.id - 1)}
              >
                <div style={{ backgroundColor: theme.backgroundColor}} className={styles.themePreview}>
                  <ThemeButtons buttonColor={theme.buttonColor} buttonBorder={theme.border} />
                </div>
              </div>
              <span className={styles.themeName}>{theme.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.saveButtonContainer}>
          <button className={styles.saveButton}>Save</button>
        </div>
      </section>
    </div>
  );
}

export default Appearance;