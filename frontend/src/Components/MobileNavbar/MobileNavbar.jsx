import React, { useState } from 'react'
import styles from './MobileNavbar.module.css'
const MobileNavbar = () => {
    const [profileImage, setProfileImage] = useState(
        "/images/Iphone/default.png"
      );
  return (
    <div className={styles.mobileNavbar}>
      <div className={styles.logo}>
                <div className={styles.logoImg}>
                          <img src="/images/spark-logo.png" alt="Spark" />
                          <div className={styles.dot} ></div> 
                        </div>
                <span className={styles.textWrapper}>
                  <span className={styles.sparktext}>
                    SPARK<sup>TM</sup>
                  </span>
                </span>
              </div>
        <div className={styles.profilePic}>
            <div className={styles.profileImagePreview}>
                         <img
                           src={profileImage}
                           alt="Profile"
                           className={styles.profileImage}
                         />
                       </div>
        </div>
    </div>
  )
}

export default MobileNavbar
