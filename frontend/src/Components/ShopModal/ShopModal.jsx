import React, { useEffect, useState, useRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiCopy } from "react-icons/fi";
import styles from "./ShopModal.module.css";
import { useDispatch } from "react-redux";
import api from "../../../api";
import { incrementShopCount } from "../../store/slices/shopSlice";

const ShopModal = ({ isOpen, onClose }) => {
  const [isChecked, setIsChecked] = useState(true);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    application: "",
    isActive: true,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setFormData((prev) => ({ ...prev, isActive: e.target.checked }));
  };

  // Handle form submission
  const handleSubmitForm = async () => {
    onClose()
    if (formData.title.trim() === "") {
      alert("Shop title is required"); // Replace with a toast
      return;
    }
    if (formData.url.trim() === "") {
      alert("Shop URL is required"); // Replace with a toast
      return;
    }

    console.log("Form Submitted:", formData);
    try {
      const response = await api.post("/api/shops", formData, { withCredentials: true });
      console.log(response);
      dispatch(incrementShopCount());
      setFormData({
        title: "",
        url: "",
        application: "",
        isActive: true,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleModalClose = (e) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleModalClose);
    return () => {
      document.removeEventListener("mousedown", handleModalClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalContent}>
          {/* Title row with "Enter URL" and Add URL button */}
          <div className={styles.modalHeader}>
            <h3 className={styles.enterUrl}>Enter URL</h3>
            <button className={styles.addUrlButton} onClick={handleSubmitForm}>
              Add URL
            </button>
          </div>

          {/* Link title input with switch */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="title" // Added name attribute
              placeholder="Shop title"
              className={styles.linkInput}
              value={formData.title}
              onChange={handleChange}
            />
            <label className={styles.switch}>
              <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
              <span className={styles.slider}></span>
            </label>
          </div>

          {/* Link URL input with copy and delete icons */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="url" // Added name attribute
              placeholder="Shop URL"
              className={styles.linkInput}
              value={formData.url}
              onChange={handleChange}
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
  );
};

export default ShopModal;
