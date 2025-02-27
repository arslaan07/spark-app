import React, { useState } from "react";
import styles from "./UserInfo.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../../api";
import { updateUser } from "../../store/slices/authSlice";

const categories = [
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'creative', label: 'Creative', icon: '🎨' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎭' },
  { id: 'fashion', label: 'Fashion & Beauty', icon: '💄' },
  { id: 'food', label: 'Food & Beverage', icon: '🍽' },
  { id: 'government', label: 'Government & Politics', icon: '🏛' },
  { id: 'health', label: 'Health & Wellness', icon: '🏥' },
  { id: 'nonprofit', label: 'Non-Profit', icon: '🤝' },
  { id: 'other', label: 'Other', icon: '✨' },
  { id: 'tech', label: 'Tech', icon: '💻' },
  { id: 'travel', label: 'Travel & Tourism', icon: '✈️' }
];

const UserInfo = () => {
  const [username, setUsername] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && selectedCategory) {
      console.log("Form submitted:", { username, selectedCategory });
      try {
        const response = await api.post('/api/auth/set-username', { username: username }, { withCredentials: true })
        console.log(response.data)
        dispatch(updateUser(response.data.user))
        navigate('/profile')
      } catch (error) {
        console.log(error.message)
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.logo}>
           <div className={styles.logoImg}>
                              <img src="/images/spark-logo.png" alt="Spark" />
                              <div className={styles.dot} ></div> 
                            </div>
          <span className={styles.sparktext}>
            SPARK<sup>TM</sup>
          </span>
        </div>

        <div className={styles.formContent}>
          <h1 className={styles.heading}>Tell us about yourself</h1>
          <p className={styles.subheading}>For a personalized Spark experience</p>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Tell us your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className={styles.categorySection}>
              <p className={styles.categoryLabel}>
                Select one category that best describes your Linktree:
              </p>
              <div className={styles.categoriesGrid}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`${styles.categoryButton} ${
                      selectedCategory === category.id ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className={styles.categoryIcon}>{category.icon}</span>
                    <span className={styles.categoryLabel}>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className={styles.continueButton}
              disabled={!username || !selectedCategory}
              onClick={handleSubmit}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      <div className={styles.heroImg}>
        <img src="./images/SignIn/signin.png" alt="" />
      </div>
    </div>
  );
};

export default UserInfo;