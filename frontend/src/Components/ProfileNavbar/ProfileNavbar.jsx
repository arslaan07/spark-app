// components/ProfileNavbar/ProfileNavbar.jsx
import { MdOutlineShare } from "react-icons/md";
import styles from './ProfileNavbar.module.css';

function ProfileNavbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.userInfo}>
        <h1 className={styles.greeting}>Hi, <span className={styles.name}>Jenny Wilson</span>!</h1>
        <p className={styles.subtext}>Organize and manage your smart pages in one click</p>
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.shareButton}><MdOutlineShare />Share</button>    
      </div>
      
    </div>
  )
}

export default ProfileNavbar