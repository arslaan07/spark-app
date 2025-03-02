import React, { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import styles from "./Logout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { logout } from "../../store/slices/authSlice";
import MyToast from '../../Components/MyToast/MyToast';
import api from "../../../api";
import { setLinkCount } from "../../store/slices/linkSlice";
import { setShopCount } from "../../store/slices/shopSlice";

const Logout = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [profileImage, setProfileImage] = useState(
    "/images/Iphone/default.png"
  );
  const [showModal, setShowModal] = useState(false);
  
  // Toggle modal without the complex outside click handling
  const toggleModal = (e) => {
    e.stopPropagation();
    setShowModal(!showModal);
  };
  const handleModalClose = (e) => {
    if(!e.target.classList.contains(`.${styles.logoutContainer}`)) {
        setShowModal(false);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleModalClose);
    return () => {
      document.removeEventListener("click", handleModalClose);
    };
  }, [showModal])

  const handleLogout = async () => {
    setShowModal(false);
    try {
        const response = await api.get('/api/auth/logout', { withCredentials: true })
        console.log(response.data)
        dispatch(logout())
        dispatch(setLinkCount(0))
        dispatch(setShopCount(0))
        navigate('/')
        MyToast(`${response.data.message}`, "success");
    } catch (error) {
        console.log(error)
        MyToast(`${error.response?.data?.message || "Something went wrong"}`, "error");
    }
  };
  return (
    <>
      <button
        style={{ position: "relative" }}
        onClick={toggleModal}
        className={styles.logoutContainer}
      >
        <div className={styles.profileImagePreview}>
          <img
            src={profileImage}
            alt="Profile"
            className={styles.profileImage}
          />
        </div>
        <span className={styles.logoutText}>{user.firstName + " " + user.lastName}</span>
      </button>
      
      {showModal && (
        <div 
          className={styles.modal}
        >
          <button onClick={handleLogout} className={styles.confirmButton}>
            <span><CiLogout size={20} /></span>Sign out
          </button>
        </div>
      )}
    </>
  );
};

export default Logout;