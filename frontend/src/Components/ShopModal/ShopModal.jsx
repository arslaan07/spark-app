import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiCopy } from "react-icons/fi";
import styles from './ShopModal.module.css'
const ShopModal = ({ isOpen, onClose }) => {
    const [isChecked, setIsChecked] = useState(true)
    
    const handleModalClose = (e) => {
        // Only close if clicking outside the modal
        if (isOpen && e.target.className === styles.modalOverlay) {
          onClose();
        }
      };
    useEffect(() => {
        document.addEventListener('mousedown', handleModalClose);
        return () => {
            document.removeEventListener('mousedown', handleModalClose);
        };
    }, [isOpen, onClose])
    if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          {/* Title row with "Enter URL" and Add URL button */}
          <div className={styles.modalHeader}>
            <h3 className={styles.enterUrl}>Enter URL</h3>
            <button className={styles.addUrlButton}>Add URL</button>
          </div>

          {/* Link title input with switch */}
          <div className={styles.inputGroup}>
            <input 
              type="text" 
              placeholder="Link title" 
              className={styles.linkInput}
            />
            <label className={styles.switch}>
  <input 
    type="checkbox" 
    checked={isChecked} // Add state for this
    onChange={(e) => setIsChecked(e.target.checked)} // Add state handler
  />
  <span className={styles.slider}></span>
</label>
          </div>

          {/* Link URL input with copy and delete icons */}
          <div className={styles.inputGroup}>
            <input 
              type="text" 
              placeholder="Link URL" 
              className={styles.linkInput}
            />
            <div className={styles.inputActions}>
              <button className={styles.iconButton}>
              <FiCopy className={styles.copyIcon} />
              </button>
              <button className={styles.iconButton}>
              <RiDeleteBin6Line className={styles.deleteIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopModal
