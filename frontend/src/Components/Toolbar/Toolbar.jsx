import React, { useState } from 'react'
import styles from './Toolbar.module.css'
import { Link } from 'react-router-dom'
import ProfileNavbar from '../ProfileNavbar/ProfileNavbar'
import MobileNavbar from '../MobileNavbar/MobileNavbar'
import Profile from '../../pages/Profile/Profile'
import Settings from '../../pages/Settings/Settings'
import Appearance from '../../pages/Appearance/Appearance'
const navItems = [
    {
        label: "Links",
        icon: (
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path  d="M26 2.25H0V0.625H26V2.25ZM0 7.9375L0.8125 7.125H25.1875L26 7.9375V16.0625L25.1875 16.875H0.8125L0 16.0625V7.9375ZM1.625 8.75V15.25H24.375V8.75H1.625ZM0 23.375H26V21.75H0V23.375Z" fill="#28A263"/>
          </svg>
    ),
  },
  {
    label: "Appearance",
    icon: (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path  d="M9.01294 1.77991C7.02036 1.77991 5.10939 2.5726 3.70042 3.9836C2.29146 5.3946 1.49991 7.30833 1.49991 9.30379C1.49991 11.2992 2.29146 13.213 3.70042 14.624C5.10939 16.035 7.02036 16.8277 9.01294 16.8277V18.3297C6.62256 18.3297 4.33008 17.3788 2.63983 15.6861C0.949575 13.9934 0 11.6976 0 9.30379C0 6.90996 0.949575 4.61417 2.63983 2.92147C4.33008 1.22878 6.62256 0.277832 9.01294 0.277832V1.77991ZM16.5275 9.30379C16.5275 8.31561 16.3331 7.33711 15.9554 6.42418C15.5778 5.51124 15.0242 4.68174 14.3264 3.98307C13.6286 3.28439 12.8002 2.73022 11.8885 2.3522C10.9768 1.97417 9.99969 1.77971 9.01294 1.77991V0.277832C10.1967 0.277635 11.3688 0.510953 12.4625 0.964461C13.5562 1.41797 14.5499 2.08279 15.387 2.92094C16.2241 3.7591 16.8881 4.75418 17.3412 5.84936C17.7942 6.94453 18.0274 8.11836 18.0274 9.30379H16.5275ZM10.5128 10.0548L9.76289 10.8059V23.56L10.5128 24.311H23.25L24 23.56V10.8044L23.25 10.0533H10.5113L10.5128 10.0548ZM11.2628 22.8104V11.5554H22.5001V22.8104H11.2628Z" fill="#676767"/>
                </svg>
),
},
{
    label: "Analytics",
    icon: (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path  d="M9.35851 5.09915C9.8559 5.48198 10.1419 6.05285 10.1419 6.66537C10.1419 11.6027 10.3119 12.9314 11.0069 13.4369C11.4629 13.7669 12.0878 13.7635 14.1934 13.7061C15.1721 13.6779 16.4254 13.6419 18.0669 13.6419C18.7216 13.6419 19.3385 13.9166 19.7566 14.3951C20.1449 14.8399 20.3149 15.4209 20.2253 15.9929C19.4579 20.8627 15.2307 24.3994 10.1741 24.3994C4.56381 24.3994 0 19.9259 0 14.4278C0 10.0681 3.36341 5.7083 7.49761 4.71069C8.14318 4.55644 8.837 4.70056 9.35851 5.09915ZM8.02027 6.33772C7.98351 6.33772 7.94675 6.34222 7.90999 6.35123C4.49833 7.17431 1.72306 10.7977 1.72306 14.4278C1.72306 18.9947 5.51379 22.7104 10.1741 22.7104C14.3749 22.7104 17.8854 19.7773 18.5217 15.7351C18.5263 15.7013 18.5424 15.6033 18.4482 15.4941C18.3586 15.3916 18.2162 15.3308 18.0669 15.3308C16.446 15.3308 15.2089 15.3669 14.2428 15.3939C11.904 15.4626 10.9368 15.4885 9.98111 14.7937C8.6145 13.8014 8.43483 12.133 8.41999 7.45135L8.41887 6.66537C8.41887 6.57079 8.37752 6.49198 8.29481 6.42892C8.21785 6.36924 8.1202 6.33772 8.02027 6.33772ZM20.7346 3.44432C22.754 5.42264 24.036 8.02251 23.9992 10.0684C23.9854 10.8667 23.3939 11.5333 22.5944 11.6515C21.0344 11.8823 19.208 11.9521 17.5917 11.9521C16.0869 11.9521 14.7625 11.8925 14.0009 11.8497C13.0429 11.7945 12.2801 11.0457 12.225 10.1067C12.1354 8.61814 11.9413 4.83601 12.0791 1.91075C12.117 1.06064 12.8177 0.383935 13.6747 0.369298C16.1294 0.299488 18.6623 1.41645 20.7346 3.44432ZM13.8217 2.05712H13.7964C13.6701 4.89344 13.8573 8.55734 13.9446 10.0087C13.9492 10.0954 14.0135 10.1585 14.1008 10.163C15.2817 10.2294 19.3504 10.4141 22.2762 9.99182C22.2831 8.41096 21.1792 6.26712 19.517 4.63897C17.8123 2.97028 15.7952 2.05712 13.8217 2.05712Z" fill="#676767"/>
</svg>

),
},
{
    label: "Settings",
    icon: (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.7776 0.456055C13.6687 0.456055 14.5348 0.797049 15.1558 1.38973C15.7756 1.98589 16.1178 2.80358 16.0917 3.63287C16.0942 3.81961 16.1601 4.03534 16.2796 4.22439C16.4775 4.53755 16.7898 4.75792 17.1607 4.84839C17.5316 4.93422 17.9198 4.88783 18.2496 4.70573C19.8426 3.85788 21.8699 4.36589 22.7796 5.8389L23.5549 7.09037C23.5748 7.12401 23.5922 7.15648 23.6072 7.19012C24.431 8.64109 23.881 10.4678 22.3502 11.3018C22.1275 11.4212 21.947 11.5883 21.8226 11.7901C21.6297 12.1021 21.5762 12.4732 21.6732 12.8142C21.7728 13.1622 22.0105 13.451 22.3453 13.6296C23.1007 14.0344 23.6644 14.7164 23.8897 15.5039C24.1149 16.2903 23.9917 17.1439 23.5524 17.8479L22.7261 19.1307C21.8163 20.5875 19.7891 21.092 18.2123 20.243C18.002 20.1305 17.7593 20.069 17.5179 20.0632H17.5104C17.1507 20.0632 16.7811 20.2059 16.5123 20.4553C16.2398 20.7093 16.0904 21.048 16.0929 21.4075C16.0842 23.1113 14.5971 24.4892 12.7776 24.4892H11.2183C9.39009 24.4892 7.90292 23.1044 7.90292 21.4005C7.90044 21.1906 7.83572 20.9726 7.71501 20.7835C7.51962 20.4657 7.20352 20.2384 6.83888 20.1479C6.47674 20.0574 6.07974 20.1073 5.75369 20.2836C4.97214 20.6896 4.05246 20.7882 3.21119 20.5678C2.37116 20.3463 1.64562 19.8081 1.22 19.0948L0.442193 17.8456C-0.467531 16.3749 0.073823 14.4902 1.64935 13.6412C2.09612 13.4011 2.37364 12.9534 2.37364 12.4732C2.37364 11.993 2.09612 11.5442 1.64935 11.3041C0.0725785 10.4504 -0.467531 8.56106 0.440948 7.09037L1.28471 5.79946C2.18199 4.34502 4.21052 3.83237 5.79227 4.67905C6.00756 4.79852 6.24153 4.85883 6.47923 4.86115C7.25454 4.86115 7.90292 4.26499 7.91537 3.53197C7.91039 2.72355 8.25263 1.94762 8.87612 1.36189C9.5021 0.777332 10.3334 0.456055 11.2183 0.456055H12.7776ZM12.7776 2.19582H11.2183C10.8325 2.19582 10.4716 2.33616 10.199 2.58901C9.92771 2.84302 9.77962 3.18053 9.78211 3.54008C9.75597 5.23578 8.2688 6.60092 6.46802 6.60092C5.89058 6.59512 5.33429 6.45014 4.85143 6.18105C4.17318 5.8215 3.2871 6.04303 2.89011 6.68675L2.04759 7.97765C1.6618 8.60165 1.89825 9.4263 2.58521 9.79861C3.60445 10.3484 4.24038 11.3737 4.24038 12.4732C4.24038 13.5728 3.60445 14.5969 2.58272 15.1478C1.89949 15.5167 1.66304 16.3367 2.05879 16.9746L2.84406 18.2365C3.0382 18.5624 3.35555 18.7979 3.72267 18.8941C4.08856 18.9892 4.49177 18.9486 4.82778 18.7747C5.32185 18.5044 5.8968 18.3641 6.47425 18.3641C6.75924 18.3641 7.04422 18.3977 7.32299 18.4673C8.16427 18.6784 8.89478 19.2026 9.32787 19.9067C9.60912 20.3486 9.76469 20.8647 9.76966 21.3913C9.76966 22.1452 10.4193 22.7495 11.2183 22.7495H12.7776C13.5728 22.7495 14.2225 22.1487 14.2262 21.4075C14.2212 20.5887 14.5647 19.8104 15.1932 19.2247C15.8129 18.6471 16.6791 18.3003 17.5453 18.3235C18.1127 18.3362 18.6591 18.4789 19.1407 18.7341C19.8339 19.1041 20.7187 18.8837 21.1194 18.2458L21.9458 16.9618C22.13 16.6661 22.1835 16.2949 22.0852 15.9528C21.9881 15.6106 21.7442 15.3137 21.4156 15.1385C20.6465 14.7256 20.0977 14.0599 19.87 13.2619C19.6447 12.479 19.7679 11.6242 20.2072 10.9202C20.4935 10.4562 20.9128 10.0654 21.4156 9.79629C22.0901 9.42862 22.3266 8.60629 21.9346 7.96606C21.9184 7.94054 21.9035 7.91386 21.891 7.88603L21.1617 6.70762C20.7648 6.06391 19.8812 5.84238 19.188 6.21005C18.4388 6.62296 17.5477 6.74126 16.6915 6.53133C15.8366 6.32487 15.1197 5.82034 14.673 5.1082C14.3867 4.66281 14.2312 4.14436 14.2262 3.61663C14.2374 3.21997 14.0881 2.86389 13.8168 2.60293C13.5467 2.34312 13.1671 2.19582 12.7776 2.19582ZM12.0034 8.54494C14.3269 8.54494 16.2173 10.3079 16.2173 12.4733C16.2173 14.6388 14.3269 16.3994 12.0034 16.3994C9.67993 16.3994 7.78955 14.6388 7.78955 12.4733C7.78955 10.3079 9.67993 8.54494 12.0034 8.54494ZM12.0034 10.2847C10.7091 10.2847 9.65629 11.2671 9.65629 12.4733C9.65629 13.6796 10.7091 14.6596 12.0034 14.6596C13.2977 14.6596 14.3505 13.6796 14.3505 12.4733C14.3505 11.2671 13.2977 10.2847 12.0034 10.2847Z" fill="#676767"/>
                </svg>
),
},
]
const Toolbar = () => {
    const [selected, setSelected] = useState('Links')
    
  return (
    <>
    <MobileNavbar />
    {/* <Profile /> */}
    {/* <Settings /> */}
    <Appearance />
    <div className={styles.toolbar}>
      <nav className={styles.nav}>
        <ul>
      {navItems.map((item, i) => (
        
            <li key={i} className={`${styles.navItem} ${selected === item.label ? styles.active : ''}`} onClick={() => setSelected(item.label)}>
                <span className={styles.icon}>{item.icon}</span>
                <Link to={''} className={styles.label}>{item.label}</Link>
            </li>
        ))}
        </ul>
      </nav>
    </div>
    </>
  )
}

export default Toolbar
