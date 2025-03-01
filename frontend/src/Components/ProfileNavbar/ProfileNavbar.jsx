// components/ProfileNavbar/ProfileNavbar.jsx
import { MdOutlineShare } from "react-icons/md";
import styles from './ProfileNavbar.module.css';
import { useSelector } from "react-redux";
import api from "../../../api";
import MyToast from "../MyToast/MyToast";

function ProfileNavbar() {
  const { user } = useSelector((state) => state.auth)
  const handleShareProfile = async (username) => {
    try {
      const shareableLink = `${window.location.origin}/profile/${username}`;
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareableLink);
      MyToast('Profile link copied to clipboard!', 'success')
    } catch (err) {
      console.error('Failed to copy link:', err);
      MyToast('Failed to copy profile link to clipboard!', 'error')
    }
  };
  
  return (
    <div className={styles.navbar}>
      <div className={styles.userInfo}>
        <h1 className={styles.greeting}>Hi, <span className={styles.name}>{user.firstName + " " + user.lastName}</span>!</h1>
        <p className={styles.subtext}>Organize and manage your smart pages in one click</p>
      </div>
      <div className={styles.actionButtons}>
        <button onClick={() => handleShareProfile(user?.username)} className={styles.shareButton}><MdOutlineShare />Share</button>    
      </div>
      
    </div>
  )
}

export default ProfileNavbar