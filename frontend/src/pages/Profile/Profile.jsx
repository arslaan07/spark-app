// pages/Profile/Profile.jsx
import { useEffect, useRef, useState } from "react";
import Iphone from "../../Components/Iphone/Iphone";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDragIndicator } from "react-icons/md";
import styles from "./Profile.module.css";
import LinkModal from "../../Components/LinkModal/LinkModal";
import ShopModal from "../../Components/ShopModal/ShopModal";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import MyToast from "../../Components/MyToast/MyToast";
import { updateUser } from "../../store/slices/authSlice";
import { decrementLinkCount, setLinkCount } from "../../store/slices/linkSlice";
import { decrementShopCount, setShopCount } from "../../store/slices/shopSlice";
import Preview from "../../Components/Preview/Preview";
import Spinner from "../../Components/Spinner/Spinner";

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
//   ];
  
  // const shops = [
  //   {
  //     id: 1,
  //     title: "Amazon Shop",
  //     url: "https://www.amazon.com/rechargeable-magnetic-charger/ww_08/",
  //     clicks: 0,
  //   },
  //   {
  //     id: 2,
  //     title: "Etsy Shop",
  //     url: "https://www.etsy.com/shop/opopo_08www.instagram.ram.com/opopo_08/",
  //     clicks: 0,
  //   },
  //   {
  //     id: 3,
  //     title: "eBay Shop",
  //     url: "https://www.ebay.com/usr/opopo_08",
  //     clicks: 0,
  //   },
  // ];
  const applications = [
    { name: "Instagram", imgSrc: "/images/LinkModal/instagram.png" },
    { name: "Facebook", imgSrc: "/images/LinkModal/facebook.png" },
    { name: "Youtube", imgSrc: "/images/LinkModal/youtube.png" },
    { name: "X", imgSrc: "/images/LinkModal/x.png" },
    { name: "Others", imgSrc: "/images/LinkModal/others.png" },
  ];
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
    { id: 7, name: "Mineral Orange", backgroundColor: "#FFEEE2", buttonColor: "#FFEEE2", border: "1px solid #333" },
    { id: 8, name: "Default", backgroundColor: "#fff", buttonColor: "#28A263", border: "none" }
  ];
function Profile() {
  const { user } = useSelector((state) => state.auth)
  const { linkCount } = useSelector((state) => state.link)
  const { shopCount } = useSelector((state) => state.shop)
  const dispatch = useDispatch()
  const [profileImage, setProfileImage] = useState(user?.profileImage ? `${api.defaults.baseURL}${user.profileImage}` : 
    "/images/Iphone/default.png"
  );
  const [bio, setBio] = useState({ content :  user?.bio !== 'null' ? user?.bio : '' });
  const [bannerBackground, setBannerBackground] = useState(user?.bannerBackground !== 'null' ? user?.bannerBackground : "#000");
  const [selectedBtn, setSelectedBtn] = useState("link");
  const [selectedColor, setSelectedColor] = useState(0);
  const [username, setUsername] = useState(`@${user?.username}`);
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
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [linkEnabled, setLinkEnabled] = useState(true);
  const fileInputRef = useRef(null);
  const [links, setLinks] = useState([])
  const [shops, setShops] = useState([])
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [editedLinkData, setEditedLinkData] = useState({
  title: "",
  url: "",
  isActive: true
});
const [editingShopId, setEditingShopId] = useState(null);
  const [editedShopData, setEditedShopData] = useState({
  title: "",
  url: "",
  isActive: true
});
const [isLoading, setIsLoading] = useState(false)
// In Profile.jsx, add a console log
useEffect(() => {
  console.log('Loading state changed:', isLoading);
}, [isLoading]);
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/api/links', { withCredentials: true })
        setLinks(response.data.links)
        dispatch(setLinkCount(response.data.links.length))
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
        dispatch(setShopCount(response.data.shops.length))
        console.log(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetch()
  }, [shopCount])
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePickImage = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = async () => {
    setProfileImage("/images/Iphone/default.png");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    try {
      setIsLoading(true)
      const response = await api.put('/api/auth/update-user-card', {profileImage: 'default'}, { withCredentials: true })
      console.log(response.data)
      dispatch(updateUser(response.data.user))
      MyToast('profile picture deleted successfully', 'success')
    } catch (error) {
      console.log(error)
      MyToast('failed to delete profile picture', 'error')
    } finally {
      setIsLoading(false)
    }
  };
  const handleBioChange = (e) => {
    setBio({ content: e.target.value });
  };
  const handleBackgroundChange = (color, i) => {
    setBannerBackground(color);
    setSelectedColor(i);
  };
  const handleCustomColorChange = (e) => {
    setBannerBackground(e.target.value);
    setSelectedColor(-1);
  };
  const handleLinkModalOpen = (e) => {
    setIsLinkModalOpen(true)
  }
  const handleShopModalOpen = (e) => {
    setIsShopModalOpen(true)
  }
  const handleModalOpen = () => {
    if(selectedBtn == 'link') {
        setIsLinkModalOpen(true)
    } else {
        setIsShopModalOpen(true)
    }
  }

  const handleProfileView = async () => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('bio', bio.content)
      formData.append('bannerBackground', bannerBackground)
      formData.append('username', username.slice(1))
      // handling profile image, checking whether it is file or string 
      if(profileImage instanceof File) {
        formData.append('profileImage', profileImage)
      } else if(profileImage && typeof profileImage === 'string' && profileImage.startsWith('data:')) {
        // if its base 64, convert it to file and append 
        const response = await fetch(profileImage)
        const blob = await response.blob()
        const file = new File([blob], 'profile.jpg', {type: blob.type})

        formData.append('profileImage', file)
      }
      const response = await api.put('./api/auth/update-user-card', formData, {
         withCredentials: true,
         headers: {
          'Content-Type': 'multipart/form-data'
         }
         })
      console.log(response.data)
      dispatch(updateUser(response.data.user))
      MyToast(`your profile card has been updated ${username}`, 'success')
    } catch (error) {
      console.log(error)
      MyToast(`failed to update your profile card ${username}`, 'error')
    } finally {
      setIsLoading(false)
    }
  }
  const handleDeleteLink = async (id) => {
    try {
      setIsLoading(true)
      const response = await api.delete(`/api/links/${id}`, { withCredentials: true })
      setLinks(links.filter(link => link._id !== id));
      dispatch(decrementLinkCount())
      console.log(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Add a function to handle edit mode toggle
const toggleEditMode = (link) => {
  if (editingLinkId === link._id) {
    // If already editing this link, cancel editing
    setEditingLinkId(null);
  } else {
    // Start editing this link
    setEditingLinkId(link._id);
    setEditedLinkData({
      title: link.title,
      url: link.url,
      isActive: link.isActive
    });
  }
};

// Add a function to handle changes to the link being edited
const handleEditChange = (e) => {
  const { name, value, type, checked } = e.target;
  setEditedLinkData({
    ...editedLinkData,
    [name]: type === 'checkbox' ? checked : value
  });
};

// Add a function to save changes
const saveEditedLink = async (id) => {
  try {
    setIsLoading(true);
    const response = await api.put(`/api/links/${id}`, editedLinkData, { withCredentials: true });
    // Update links in state
    const updatedLinks = links.map(link => 
      link._id === id ? { ...link, ...editedLinkData } : link
    );
    setLinks(updatedLinks);
    setEditingLinkId(null);
    MyToast('Link updated successfully', 'success');
  } catch (error) {
    console.log(error);
    MyToast('Failed to update link', 'error');
  } finally {
    setIsLoading(false);
  }
};

// Function to toggle active status
const handleToggleActive = async (linkId, currentStatus) => {
  // Optimistically update UI first
  const updatedLinks = links.map((link) =>
    link._id === linkId ? { ...link, isActive: !currentStatus } : link
  );
  setLinks(updatedLinks);

  try {
    setIsLoading(true)
    // Send update to server
    await api.put(`/api/links/${linkId}`, { isActive: !currentStatus }, { withCredentials: true });
    MyToast("Link status updated", "success");
  } catch (error) {
    // Revert UI on failure
    setLinks(links); // Revert to previous state
    console.log("Error updating link:", error);
    MyToast("Failed to update link status", "error");
  } finally {
    setIsLoading(false)
  }
};

/*      */
// Toggle edit mode for shops
const toggleEditShopMode = (shop) => {
  if (editingShopId === shop._id) {
    setEditingShopId(null);
  } else {
    setEditingShopId(shop._id);
    setEditedShopData({
      title: shop.title,
      url: shop.url,
      isActive: shop.isActive
    });
  }
};

// Handle changes to shop data during editing
const handleEditShopChange = (e) => {
  const { name, value, type, checked } = e.target;
  setEditedShopData({
    ...editedShopData,
    [name]: type === 'checkbox' ? checked : value
  });
};

// Save edited shop
const saveEditedShop = async (id) => {
  try {
    setIsLoading(true)
    const response = await api.put(`/api/shops/${id}`, editedShopData, { withCredentials: true });
    const updatedShops = shops.map(shop => 
      shop._id === id ? { ...shop, ...editedShopData } : shop
    );
    setShops(updatedShops); // Corrected to update shops, not links
    setEditingShopId(null);
    MyToast('Shop updated successfully', 'success');
  } catch (error) {
    console.log(error);
    MyToast('Failed to update shop', 'error');
  } finally {
    setIsLoading(false)
  }
};

// Toggle active status for shops
const handleToggleActiveShop = async (shopId, currentStatus) => {
  const updatedShops = shops.map((shop) =>
    shop._id === shopId ? { ...shop, isActive: !currentStatus } : shop
  );
  setShops(updatedShops); // Corrected to update shops, not links

  try {
    setIsLoading(true)
    await api.put(`/api/shops/${shopId}`, { isActive: !currentStatus }, { withCredentials: true });
    MyToast("Shop status updated", "success");
  } catch (error) {
    setShops(shops); // Revert to previous state on failure
    console.log("Error updating shop:", error);
    MyToast("Failed to update shop status", "error");
  } finally {
    setIsLoading(false)
  }
};

// Delete shop
const handleDeleteShop = async (id) => {
  try {
    setIsLoading(true)
    const response = await api.delete(`/api/shops/${id}`, { withCredentials: true });
    setShops(shops.filter(shop => shop._id !== id));
    dispatch(decrementShopCount());
    console.log(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false)
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
    <div className={styles.profileContainer}>
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
   buttonFontColor={buttonFontColor}
   selectedFont={selectedFont}
   fontColor={fontColor}
   selectedButtonStyle={selectedButtonStyle}
   selectedButtonRadius={selectedButtonRadius}
   bio={bio}
/>
      </section>

      <section className={styles.rightSection}>
        <h2 className={styles.sectionTitle}>Profile</h2>

        {/* Profile Settings Section */}
        <div className={styles.profileSettings}>
          <div className={styles.imageUpload}>
            <div className={styles.profileImagePreview}>
              <img
                src={profileImage}
                alt="Profile"
                className={styles.profileImage}
              />
            </div>
            <div className={styles.profileBtns}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
              />
              <button className={styles.uploadButton} onClick={handlePickImage}>
                Pick an image
              </button>
              <button
                className={styles.removeButton}
                onClick={handleRemoveImage}
              >
                Remove
              </button>
            </div>
          </div>

          <form className={styles.settingsForm}>
            <div className={styles.formGroup}>
              <label htmlFor="profileTitle">Profile Title</label>
              <input
                type="text"
                id="profileTitle"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter profile title"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                placeholder="Bio"
                rows="4"
                maxLength="80"
                onChange={handleBioChange}
                value={bio?.content || ''}
                onDragStart={(e) => e.preventDefault()}
              ></textarea>
              <span
                className={`${styles.charCount} ${
                  bio?.content?.length === 80 ? styles.charLimit : ""
                }`}
              >
                {bio?.content?.length} / 80
              </span>
            </div>
          </form>
        </div>

        {/* Add Link & Shop Section */}
        <div className={styles.addSection}>
          <div className={styles.buttons}>
            <span
              className={`${styles.button} ${
                selectedBtn === "link" ? styles.active : ""
              }`}
              onClick={() => setSelectedBtn("link")}
            >
              <span className={`${styles.homeIcon} ${
                selectedBtn === "link" ? styles.active : ""
              }`}><svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 8.5V17.5C2 18.0304 2.21071 18.5391 2.58579 18.9142C2.96086 19.2893 3.46957 19.5 4 19.5H18C18.5304 19.5 19.0391 19.2893 19.4142 18.9142C19.7893 18.5391 20 18.0304 20 17.5V8.5" stroke="#6C6C6C" strokeWidth="1.5"/>
<path d="M13.833 19.5V13.5C13.833 12.9696 13.6223 12.4609 13.2472 12.0858C12.8721 11.7107 12.3634 11.5 11.833 11.5H9.83301C9.30257 11.5 8.79387 11.7107 8.41879 12.0858C8.04372 12.4609 7.83301 12.9696 7.83301 13.5V19.5" stroke="#6C6C6C" strokeWidth="1.5" strokeMiterlimit="16"/>
<path d="M20.818 7.864L19.124 1.935C19.0881 1.80965 19.0124 1.69939 18.9083 1.6209C18.8042 1.54241 18.6774 1.49997 18.547 1.5H14.5L14.975 7.204C14.9823 7.29568 15.0114 7.38429 15.0597 7.46254C15.1081 7.54078 15.1743 7.60641 15.253 7.654C15.643 7.887 16.405 8.317 17 8.5C18.016 8.813 19.5 8.7 20.346 8.596C20.4282 8.58537 20.5072 8.55692 20.5773 8.51263C20.6474 8.46835 20.707 8.40929 20.752 8.3396C20.7969 8.2699 20.8261 8.19123 20.8375 8.10909C20.8489 8.02695 20.8423 7.94331 20.818 7.864Z" stroke="#6C6C6C" strokeWidth="1.5"/>
<path d="M12.9999 8.5C13.5679 8.325 14.2879 7.926 14.6899 7.688C14.7835 7.63205 14.8594 7.55087 14.9089 7.45377C14.9584 7.35667 14.9796 7.24757 14.9699 7.139L14.4999 1.5H7.49994L7.02994 7.139C7.02012 7.24774 7.04118 7.35704 7.09071 7.45433C7.14025 7.55163 7.21624 7.63297 7.30994 7.689C7.71194 7.926 8.43194 8.325 8.99994 8.5C10.4929 8.96 11.5069 8.96 12.9999 8.5Z" stroke="#6C6C6C" strokeWidth="1.5"/>
<path d="M2.87605 1.935L1.18205 7.865C1.15814 7.94418 1.15175 8.02762 1.16332 8.10951C1.17489 8.19141 1.20414 8.26981 1.24905 8.33927C1.29396 8.40873 1.35345 8.46758 1.42339 8.51174C1.49332 8.5559 1.57203 8.58431 1.65405 8.595C2.49905 8.7 3.98405 8.812 5.00005 8.5C5.59505 8.317 6.35805 7.887 6.74705 7.655C6.82588 7.60731 6.89221 7.54153 6.94056 7.4631C6.9889 7.38467 7.01786 7.29585 7.02505 7.204L7.50005 1.5H3.45305C3.32267 1.49997 3.19583 1.54241 3.09172 1.6209C2.98762 1.69939 2.91191 1.80965 2.87605 1.935Z" stroke="#6C6C6C" strokeWidth="1.5"/>
</svg></span>  

             Add Link
            </span>
            <span
              className={`${styles.button} ${
                selectedBtn === "shop" ? styles.active : ""
              }`}
              onClick={() => setSelectedBtn("shop")}
            >
                <span className={styles.homeIcon}><svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 8.5V17.5C2 18.0304 2.21071 18.5391 2.58579 18.9142C2.96086 19.2893 3.46957 19.5 4 19.5H18C18.5304 19.5 19.0391 19.2893 19.4142 18.9142C19.7893 18.5391 20 18.0304 20 17.5V8.5" stroke="#6C6C6C" strokeWidth="1.5"/>
<path d="M13.833 19.5V13.5C13.833 12.9696 13.6223 12.4609 13.2472 12.0858C12.8721 11.7107 12.3634 11.5 11.833 11.5H9.83301C9.30257 11.5 8.79387 11.7107 8.41879 12.0858C8.04372 12.4609 7.83301 12.9696 7.83301 13.5V19.5" stroke="#6C6C6C" strokeWidth="1.5" strokeMiterlimit="16"/>
<path d="M20.818 7.864L19.124 1.935C19.0881 1.80965 19.0124 1.69939 18.9083 1.6209C18.8042 1.54241 18.6774 1.49997 18.547 1.5H14.5L14.975 7.204C14.9823 7.29568 15.0114 7.38429 15.0597 7.46254C15.1081 7.54078 15.1743 7.60641 15.253 7.654C15.643 7.887 16.405 8.317 17 8.5C18.016 8.813 19.5 8.7 20.346 8.596C20.4282 8.58537 20.5072 8.55692 20.5773 8.51263C20.6474 8.46835 20.707 8.40929 20.752 8.3396C20.7969 8.2699 20.8261 8.19123 20.8375 8.10909C20.8489 8.02695 20.8423 7.94331 20.818 7.864Z" stroke="#6C6C6C" strokeWidth="1.5"/>
<path d="M12.9999 8.5C13.5679 8.325 14.2879 7.926 14.6899 7.688C14.7835 7.63205 14.8594 7.55087 14.9089 7.45377C14.9584 7.35667 14.9796 7.24757 14.9699 7.139L14.4999 1.5H7.49994L7.02994 7.139C7.02012 7.24774 7.04118 7.35704 7.09071 7.45433C7.14025 7.55163 7.21624 7.63297 7.30994 7.689C7.71194 7.926 8.43194 8.325 8.99994 8.5C10.4929 8.96 11.5069 8.96 12.9999 8.5Z" stroke="#6C6C6C" strokeWidth="1.5"/>
<path d="M2.87605 1.935L1.18205 7.865C1.15814 7.94418 1.15175 8.02762 1.16332 8.10951C1.17489 8.19141 1.20414 8.26981 1.24905 8.33927C1.29396 8.40873 1.35345 8.46758 1.42339 8.51174C1.49332 8.5559 1.57203 8.58431 1.65405 8.595C2.49905 8.7 3.98405 8.812 5.00005 8.5C5.59505 8.317 6.35805 7.887 6.74705 7.655C6.82588 7.60731 6.89221 7.54153 6.94056 7.4631C6.9889 7.38467 7.01786 7.29585 7.02505 7.204L7.50005 1.5H3.45305C3.32267 1.49997 3.19583 1.54241 3.09172 1.6209C2.98762 1.69939 2.91191 1.80965 2.87605 1.935Z" stroke="#6C6C6C" strokeWidth="1.5"/>
</svg></span> 
             Add Shop
            </span>
          </div>

          <button onClick={handleModalOpen} className={styles.addButton}>
            <span className={styles.plus}>+</span> Add
          </button>

          <div className={styles.socialLinks}>
          {selectedBtn === "link" && links && links.length > 0 && 
    [...links].reverse().map((link) => (
      <div key={link._id} className={styles.socialLink}>
        <span className={styles.dragIcon}>
          <MdOutlineDragIndicator />
        </span>
        <div className={styles.linkInfo}>
          <div className={styles.titleContainer}>
            {editingLinkId === link._id ? (
              <input
                type="text"
                name="title"
                value={editedLinkData.title}
                onChange={handleEditChange}
                className={styles.editInput}
              />
            ) : (
              <span 
                className={styles.linkTitle}
                onClick={() => toggleEditMode(link)}
              >
                {link.title}
              </span>
            )}
            <span 
              onClick={() => toggleEditMode(link)} 
              className={styles.editIcon}
            >
              <FiEdit3 />
            </span>
          </div>
          <div className={styles.linkContainer}>
            {editingLinkId === link._id ? (
              <input
                type="text"
                name="url"
                value={editedLinkData.url}
                onChange={handleEditChange}
                className={styles.editInput}
              />
            ) : (
              <span 
                className={styles.userLink}
                onClick={() => toggleEditMode(link)}
              >
                {link.url}
              </span>
            )}
            <span 
              onClick={() => toggleEditMode(link)} 
              className={styles.editIcon}
            >
              <FiEdit3 />
            </span>
          </div>
          <div className={styles.clickStats}>
            <span className={styles.icon}>
              <img src="/images/Profile/click.png" alt="" />
              <span className={styles.clickCount}>{link.clicks} clicks</span>
            </span>
          </div>
        </div>
        <div className={styles.rightLinkContainer}>
          {editingLinkId === link._id ? (
            <>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={editedLinkData.isActive}
                  onChange={handleEditChange} // Only updates editedLinkData during edit mode
                />
                <span className={styles.slider}></span>
              </label>
              <button 
                onClick={() => saveEditedLink(link._id)} 
                className={styles.updateButton}
              >
                Update
              </button>
            </>
          ) : (
            <>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={link.isActive}
                  onChange={() => handleToggleActive(link._id, link.isActive)} // Direct toggle without edit mode
                />
                <span className={styles.slider}></span>
              </label>
              <span 
                onClick={() => handleDeleteLink(link._id)} 
                className={styles.deleteIcon}
              >
                <RiDeleteBin6Line />
              </span>
            </>
          )}
        </div>
      </div>
    ))}

{selectedBtn === 'shop' && shops && shops.length > 0 &&
  [...shops].reverse().map((shop) => (
    <div key={shop._id} className={styles.socialLink}>
      <span className={styles.dragIcon}>
        <MdOutlineDragIndicator />
      </span>
      <div className={styles.linkInfo}>
        <div className={styles.titleContainer}>
          {editingShopId === shop._id ? (
            <input
              type="text"
              name="title"
              value={editedShopData.title}
              onChange={handleEditShopChange}
              className={styles.editInput}
            />
          ) : (
            <span 
              className={styles.linkTitle}
              onClick={() => toggleEditShopMode(shop)}
            >
              {shop.title}
            </span>
          )}
          <span 
            onClick={() => toggleEditShopMode(shop)} 
            className={styles.editIcon}
          >
            <FiEdit3 />
          </span>
        </div>
        <div className={styles.linkContainer}>
          {editingShopId === shop._id ? (
            <input
              type="text"
              name="url"
              value={editedShopData.url}
              onChange={handleEditShopChange}
              className={styles.editInput}
            />
          ) : (
            <span 
              className={styles.userLink}
              onClick={() => toggleEditShopMode(shop)}
            >
              {shop.url}
            </span>
          )}
          <span 
            onClick={() => toggleEditShopMode(shop)} 
            className={styles.editIcon}
          >
            <FiEdit3 />
          </span>
        </div>
        <div className={styles.clickStats}>
          <span className={styles.icon}>
            <img src="/images/Profile/click.png" alt="" />
            <span className={styles.clickCount}>{shop.clicks} clicks</span>
          </span>
        </div>
      </div>
      <div className={styles.rightLinkContainer}>
        {editingShopId === shop._id ? (
          <>
            <label className={styles.switch}>
              <input
                type="checkbox"
                name="isActive"
                checked={editedShopData.isActive}
                onChange={handleEditShopChange}
              />
              <span className={styles.slider}></span>
            </label>
            <button 
              onClick={() => saveEditedShop(shop._id)} 
              className={styles.updateButton}
            >
              Update
            </button>
          </>
        ) : (
          <>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={shop.isActive}
                onChange={() => handleToggleActiveShop(shop._id, shop.isActive)}
              />
              <span className={styles.slider}></span>
            </label>
            <span 
              onClick={() => handleDeleteShop(shop._id)} 
              className={styles.deleteIcon}
            >
              <RiDeleteBin6Line />
            </span>
          </>
        )}
      </div>
    </div>
  ))}
  </div>
        </div>

        {/* Banner Section */}
        <h2 className={styles.sectionTitle}>Banner</h2>
        <div className={styles.bannerSection}>
          <div
            style={{ backgroundColor: bannerBackground }}
            className={styles.bannerPreview}
          >
            <div className={styles.bannerContent}>
              <div className={styles.profileImagePreview}>
                <img
                  src={profileImage}
                  alt="Profile"
                  className={styles.profileImage}
                />
              </div>
              <div className={styles.profileInfo}>
                <h3>{`@${user?.username}`}</h3>
                <p className={styles.bio}>{bio.content}</p>
              </div>
            </div>
          </div>

          <div className={styles.colorPicker}>
            <p className={styles.bgColortxt}>Custom Background Color</p>
            <div className={styles.colorOptions}>
              {backgroundColor.map((color, index) => (
                <button
                  key={index}
                  className={styles.colorOption}
                  style={{
                    backgroundColor: color,
                    border: index === selectedColor ? "4px solid #fff" : "none",
                  }}
                  onClick={() => handleBackgroundChange(color, index)}
                ></button>
              ))}
            </div>
            <div className={styles.colorInput}>
              <button
                className={styles.customColorOption}
                style={{ backgroundColor: bannerBackground }}
              ></button>
              <input
                type="text"
                placeholder="customize color"
                onChange={handleCustomColorChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.saveButtonContainer}>
          <button onClick={handleProfileView} className={styles.saveButton}>Save</button>
        </div>
      </section>
      
      <LinkModal 
      isOpen={isLinkModalOpen} 
      onClose={() => setIsLinkModalOpen(false)}
      applications={applications}
    />
    <ShopModal
      isOpen={isShopModalOpen} 
      onClose={() => setIsShopModalOpen(false)}
    />
    <Preview />
    </div>
  );
}

export default Profile;
