import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiCopy } from "react-icons/fi";
import styles from "./LinkModal.module.css";
import MyToast from "../MyToast/MyToast";
import api from "../../../api";
import { useDispatch } from "react-redux";
import { incrementLinkCount } from "../../store/slices/linkSlice";
import Spinner from '../Spinner/Spinner'


const LinkModal = ({ isOpen, onClose, applications }) => {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const [selectedApp, setSelectedApp] = useState(-1);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    application: "",
    isActive: true,
  });
  // console.log(formData)
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

  // Handle application selection
  const handleAppSelect = (index) => {
    setSelectedApp(index);
    setFormData((prev) => ({
      ...prev,
      application: applications[index].name,
    }));
  };

  // Handle form submission
  const handleSubmitForm = async () => {
    onClose()
    if(formData.title.trim() === '') {
      MyToast('link title is required', 'error')
      return;
    }
    if(formData.url.trim() === '') {
      MyToast('link url is required', 'error')
      return;
    }
    console.log("Form Submitted:", formData);
    try {
      setIsLoading(true)
      const response = await api.post('/api/links', formData, { withCredentials: true })
      console.log(response.data.links)
      dispatch(incrementLinkCount())
      setFormData({
        title: "",
        url: "",
        application: "",
        isActive: true,
      })
      MyToast('link created successfully', 'success')
    } catch (error) {
      console.log(error)
      MyToast('link creation failed', 'error')
    } finally {
      setIsLoading(false)
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleModalClose = (e) => {
      if (isOpen && e.target.classList.contains(styles.modalOverlay)) {
        onClose();
      }
    };
  
    document.addEventListener("mousedown", handleModalClose);
    return () => {
      document.removeEventListener("mousedown", handleModalClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          {/* Title row with "Enter URL" and Add URL button */}
          <div className={styles.modalHeader}>
            <h3>Enter URL</h3>
            <button onClick={handleSubmitForm} className={styles.addUrlButton}>
              Add URL
            </button>
          </div>

          {/* Link title input with switch */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="title"
              placeholder="Link title"
              className={styles.linkInput}
              value={formData.title}
              onChange={handleChange}
            />
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          {/* Link URL input with copy and delete icons */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="url"
              placeholder="Link URL"
              className={styles.linkInput}
              value={formData.url}
              onChange={handleChange}
            />
            <div className={styles.inputActions}>
              <button className={styles.iconButton} onClick={() => navigator.clipboard.writeText(formData.url)}>
                <FiCopy className={styles.copyIcon} />
              </button>
              <button className={styles.iconButton} onClick={() => setFormData({ ...formData, url: "" })}>
                <RiDeleteBin6Line className={styles.deleteIcon} />
              </button>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Applications section */}
          <div className={styles.applications}>
            <p className={styles.applicationTitle}>Applications</p>
            <div className={styles.socialIcons}>
              {applications.map((app, index) => (
                <div
                  key={index}
                  onClick={() => handleAppSelect(index)}
                  className={styles.socialBtnContainer}
                >
                  <button
                    className={`${styles.socialBtn} ${
                      selectedApp === index ? styles.active : ""
                    }`}
                  >
                    <img src={app.imgSrc} alt={app.name} />
                  </button>
                  <span className={styles.platform}>{app.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
