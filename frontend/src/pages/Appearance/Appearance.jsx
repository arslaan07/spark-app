// pages/Appearance/Appearance.jsx
import { useEffect, useState } from "react";
import styles from "./Appearance.module.css";
import Iphone from "../../Components/Iphone/Iphone";
import SpecialButton from "../../Components/SpecialButton/SpecialButton";
import ThemeButtons from "../../Components/ThemeButtons/ThemeButtons";
import api from "../../../api";
import { setLinkCount } from "../../store/slices/linkSlice";
import { setShopCount } from "../../store/slices/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/slices/authSlice";
import themes from "../../utils/themes"
import MyToast from "../../Components/MyToast/MyToast";
import Preview from "../../Components/Preview/Preview";
import Spinner from "../../Components/Spinner/Spinner";


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
// const themes = [
//   { id: 1, name: "Air Snow", backgroundColor: "E0E2D9", buttonColor: "#2A3235", border: "none" },
//   { id: 2, name: "Air Gray", backgroundColor: "#EBEEF1", buttonColor: "#FFF", border: "none" },
//   { id: 3, name: "Air Smoke", backgroundColor: "#2A3235", buttonColor: "#FFF", border: "none" },
//   { id: 4, name: "Air Black", backgroundColor: "#000", buttonColor: "#1C1C1C", border: "none" },
//   { id: 5, name: "Mineral Blue", backgroundColor: "#E0F6FF", buttonColor: "#E0F6FF", border: "1px solid #333" },
//   { id: 6, name: "Mineral Green", backgroundColor: "#E0FAEE", buttonColor: "#E0FAEE", border: "1px solid #333" },
//   { id: 7, name: "Mineral Orange", backgroundColor: "#FFEEE2", buttonColor: "#FFEEE2", border: "1px solid #333" },
//   { id: 8, name: "Default", backgroundColor: "#fff", buttonColor: "#28A263", border: "none" }
// ];
const backgroundColor = ["#000", "rgb(156, 108, 108)", "#28A263"];
// const links = [
//     {
//       id: 1,
//       title: "Instagram",
//       url: "https://www.instagram.com/opopo_08//opopo_08/",
//       clicks: 0,
//     },
//     {
//       id: 2,
//       title: "Twitter",
//       url: "https://twitter.com/opopo_08/www.iom/opopo_08/",
//       clicks: 0,
//     },
//     {
//       id: 3,
//       title: "Facebook",
//       url: "https://www.facebook.com/opopo_08",
//       clicks: 0,
//     },
//     {
//         id: 4,
//         title: "Facebook",
//         url: "https://www.facebook.com/opopo_08",
//         clicks: 0,
//       },
//       {
//         id: 5,
//         title: "Facebook",
//         url: "https://www.facebook.com/opopo_08",
//         clicks: 0,
//       },
//       {
//         id: 6,
//         title: "Facebook",
//         url: "https://www.facebook.com/opopo_08",
//         clicks: 0,
//       },
//   ];
  
//   const shops = [
//     {
//       id: 1,
//       title: "Amazon Shop",
//       url: "https://www.amazon.com/rechargeable-magnetic-charger/ww_08/",
//       clicks: 0,
//     },
//     {
//       id: 2,
//       title: "Etsy Shop",
//       url: "https://www.etsy.com/shop/opopo_08www.instagram.ram.com/opopo_08/",
//       clicks: 0,
//     },
//     {
//       id: 3,
//       title: "eBay Shop",
//       url: "https://www.ebay.com/usr/opopo_08",
//       clicks: 0,
//     },
//     {
//         id: 4,
//         title: "eBay Shop",
//         url: "https://www.ebay.com/usr/opopo_08",
//         clicks: 0,
//       },
//       {
//         id: 5,
//         title: "eBay Shop",
//         url: "https://www.ebay.com/usr/opopo_08",
//         clicks: 0,
//       },
//   ];
function Appearance() {
  const { user } = useSelector((state) => state.auth);
  const { linkCount } = useSelector((state) => state.link)
  const { shopCount } = useSelector((state) => state.shop)
  const dispatch = useDispatch()
  const [profileImage, setProfileImage] = useState(
    user?.profileImage 
      ? `${api.defaults.baseURL}${user.profileImage}` 
      : "/images/Iphone/default.png"
  );
  const [bannerBackground, setBannerBackground] = useState(
    user?.bannerBackground !== 'null' ? user?.bannerBackground : "#000"
  );
  const [username, setUsername] = useState(`@${user?.username}`);
  const [bio, setBio] = useState({ content: user?.bio !== 'null' ? user?.bio : '' });
  const [Layout, setLayout] = useState(
    user?.layout && user.layout !== 'null' 
      ? user.layout 
      : 'Stack'
  );
  const [selectedButtonStyle, setSelectedButtonStyle] = useState(
    user?.buttonStyle && user.buttonStyle !== 'null' 
      ? user.buttonStyle 
      : 'Fill'
  );
  const [buttonColor, setButtonColor] = useState(
    user?.buttonColor && user.buttonColor !== 'null' 
      ? user.buttonColor 
      : '#28A263'
  );
  const [buttonFontColor, setButtonFontColor] = useState(
    user?.buttonFontColor && user.buttonFontColor !== 'null' 
      ? user.buttonFontColor 
      : '#fff'
  );
  const [selectedFont, setSelectedFont] = useState(
    user?.font && user.font !== 'null' 
      ? user.font 
      : 'Poppins'
  );
  const [fontColor, setFontColor] = useState(
    user?.fontColor && user.fontColor !== 'null' 
      ? user.fontColor 
      : '#000'
  );
  const [selectedTheme, setSelectedTheme] = useState(
    user?.theme && user.theme !== 'null' 
      ? user.theme 
      : -1
  );
  const [selectedButtonRadius, setSelectedButtonRadius] = useState(
    user?.buttonRadius && user.buttonRadius !== 'null' 
      ? user.buttonRadius 
      : '30px'
  );
  const [links, setLinks] = useState([])
  const [shops, setShops] = useState([])
  const [manualColorChange, setManualColorChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/api/links', { withCredentials: true })
        setLinks(response.data.links)
        dispatch(setLinkCount())
        console.log(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetch()
  }, [linkCount])

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/api/shops', { withCredentials: true })
        setShops(response.data.shops)
        dispatch(setShopCount())
        console.log(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetch()
  }, [shopCount])
  const handleButtonColorChange = (e) => {
    setButtonColor(e.target.value);
    setManualColorChange(true); // Flag that user manually changed color
  };
  const handleThemeSelection = (themeId) => {
    setSelectedTheme(themeId);
    setManualColorChange(false); // Reset flag when theme changes
    
    const theme = themes[themeId];
    if (theme) {
      setBannerBackground(theme.backgroundColor !== "none" ? theme.backgroundColor : "#000");
      setButtonColor(theme.buttonColor);
      
      // Set other theme-specific properties if needed
    }
  };
  const handleButtonStyleSelect = (style, radius) => {
    setSelectedButtonStyle(style);
    setSelectedButtonRadius(radius);
  };
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('bannerBackground', bannerBackground);
      formData.append('layout', Layout);
      formData.append('buttonStyle', selectedButtonStyle);
      formData.append('buttonColor', buttonColor);
      formData.append('buttonFontColor', buttonFontColor);
      formData.append('font', selectedFont);
      formData.append('fontColor', fontColor);
      formData.append('buttonRadius', selectedButtonRadius);
      formData.append('theme', selectedTheme);

      const response = await api.put('/api/auth/update-user-card', formData, { withCredentials: true });
      console.log(response.data);
      dispatch(updateUser(response.data.user));
      MyToast('Appearance settings updated successfully', 'success');
    } catch (error) {
      console.log(error);
      MyToast('Failed to update appearance settings', 'error');
    }
  };

  if (isLoading) {
    console.log('Rendering spinner...');
    return <>
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
      fontSize: '24px'
    }}>
      <Spinner />
    </div>
    
  </>
  }
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
          setButtonColor={setButtonColor}  // Pass the setter function
          manualColorChange={manualColorChange}  // Pass the flag
          buttonFontColor={buttonFontColor}
          selectedFont={selectedFont}
          fontColor={fontColor}
          selectedButtonStyle={selectedButtonStyle}
          selectedButtonRadius={selectedButtonRadius}
          bio={bio}
        />
      </section>

      <section className={styles.rightSection}>

        {/* Layout Section */}
        <h3 className={styles.heading}>Layout</h3>
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
        <h3 className={styles.heading}>Buttons</h3>
        <div className={styles.section}>
          <div className={styles.buttonStyles}>
          {buttonStyles.map((style) => (
  <div key={style.id} className={styles.buttonStyleGroup}>
    <span className={styles.buttonStyleLabel}>{style.name}</span>
    <div className={styles.buttonExamples}>
      {["0px", "10px", "30px"].map((radius) => (
        <button 
          key={radius}
          style={{ 
            borderRadius: radius,
            // Add a subtle outline when selected (won't change existing styles much)
            outline: selectedButtonStyle === style.name && selectedButtonRadius === radius 
              ? "2px solid #28A263" 
              : "none",
            // Add some outline offset so it doesn't touch the button directly
            outlineOffset: "3px"
          }} 
          className={`${styles.buttonExample} ${styles[style.name.toLowerCase().replace(' ', '')]}`}
          onClick={() => handleButtonStyleSelect(style.name, radius)}
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
                  onChange={(e) => {
                    setButtonColor(e.target.value);
                    setManualColorChange(true);
                  }}
                  
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
          <h3 className={styles.heading}>Fonts</h3>
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
          <h3 className={styles.heading}>Themes</h3>
        <div className={styles.section}>
          <div className={styles.themeGrid}>
            {themes.map((theme) => (
                <div key={theme.id} className={styles.themeCardContainer}>
              <div
                
                className={`${styles.themeCard} ${
                  selectedTheme === theme.id - 1 && selectedTheme !== 7 ? styles.selected : ""
                }`}
                onClick={() => {
                  setSelectedTheme(theme.id - 1);
                  setManualColorChange(false);
                  setButtonColor(theme.buttonColor);
                  // Do NOT change bannerBackground here
                }}
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
          <button onClick={handleSave} className={styles.saveButton}>Save</button>
        </div>
      </section>
      <Preview />
    </div>
  );
}

export default Appearance;