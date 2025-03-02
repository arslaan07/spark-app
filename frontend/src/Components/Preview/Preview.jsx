import React from 'react'
import { IoEyeOutline } from "react-icons/io5";
import styles from './Preview.module.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Preview = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const handleProfileView = async (username) => {
    try {
      navigate(`/profile/${username}`)
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.previewContainer}>
      <button onClick={() => handleProfileView(user?.username)} className={styles.previewBtn}>
        <span className={styles.eyeIcon}><IoEyeOutline size={20} /></span>
        <span className={styles.previewText}>preview</span>
      </button>
    </div>
  )
}

export default Preview
