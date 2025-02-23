import React, { useState } from "react";
import styles from "./Settings.module.css";
import { FiEye } from "react-icons/fi";
import { IoMdEyeOff } from "react-icons/io";

const Settings = () => {
  // Password visibility states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Initial form data state with original user data
  const [formData, setFormData] = useState({
    fname: "Jenny",
    lname: "Wilson",
    email: "JennyWilson08@gmail.com",
    oldPassword: "",
    newPassword: "",
    password: "", // For email change verification
  });

  // Track which fields have been modified
  const [modifiedFields, setModifiedFields] = useState({
    email: false,
    password: false,
  });

  // Errors state
  const [errors, setErrors] = useState({});

  // Validate individual fields
  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "fname":
        if (!value.trim()) {
          newErrors.fname = "First name is required";
        } else {
          delete newErrors.fname;
        }
        break;
      case "lname":
        if (!value.trim()) {
          newErrors.lname = "Last name is required";
        } else {
          delete newErrors.lname;
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Invalid email address";
        } else if (value !== formData.email && !formData.password) {
          newErrors.password = "Please enter your password to change email";
        } else {
          delete newErrors.email;
        }
        break;
      case "oldPassword":
        if (modifiedFields.password && !value.trim()) {
          newErrors.oldPassword = "Current password is required to change password";
        } else {
          delete newErrors.oldPassword;
        }
        break;
      case "newPassword":
        if (value.trim()) {
          if (value.length < 8) {
            newErrors.newPassword = "Password must be at least 8 characters long";
          } else if (!/[A-Z]/.test(value)) {
            newErrors.newPassword = "Password must contain at least one uppercase letter";
          } else if (!/[a-z]/.test(value)) {
            newErrors.newPassword = "Password must contain at least one lowercase letter";
          } else if (!/[0-9]/.test(value)) {
            newErrors.newPassword = "Password must contain at least one number";
          } else if (!/[^A-Za-z0-9]/.test(value)) {
            newErrors.newPassword = "Password must contain at least one special character";
          } else {
            delete newErrors.newPassword;
          }
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email' && value !== formData.email) {
      setModifiedFields(prev => ({ ...prev, email: true }));
    } else if ((name === 'oldPassword' || name === 'newPassword') && value) {
      setModifiedFields(prev => ({ ...prev, password: true }));
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });

    if (Object.keys(errors).length === 0) {
      console.log("Profile updated successfully:", formData);
    } else {
      console.log("Form has errors:", errors);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.editProfileHeader}>
          <h1 className={styles.heading}>Edit Profile</h1>
          <div className={styles.dividerContainer}>
          <div className={styles.greenDivider}></div>
          <div className={styles.grayDivider}></div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="fname">First name</label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              className={errors.fname ? styles.errorInput : ''}
            />
            {errors.fname && <div className={styles.error}>{errors.fname}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lname">Last name</label>
            <input
              type="text"
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              className={errors.lname ? styles.errorInput : ''}
            />
            {errors.lname && <div className={styles.error}>{errors.lname}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.errorInput : ''}
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>

          {modifiedFields.email && (
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type={showOldPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? styles.errorInput : ''}
              />
              {errors.password && <div className={styles.error}>{errors.password}</div>}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className={errors.oldPassword ? styles.errorInput : ''}
            />
            <span onClick={() => setShowOldPassword(!showOldPassword)} className={styles.eye}>
              {showOldPassword ? <FiEye /> : <IoMdEyeOff />}
            </span>
            {errors.oldPassword && <div className={styles.error}>{errors.oldPassword}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={errors.newPassword ? styles.errorInput : ''}
            />
            <span onClick={() => setShowNewPassword(!showNewPassword)} className={styles.eye}>
              {showNewPassword ? <FiEye /> : <IoMdEyeOff />}
            </span>
            {errors.newPassword && <div className={styles.error}>{errors.newPassword}</div>}
          </div>
          <div className={styles.saveBtnContainer}>
          <button type="submit" className={styles.btn}>
            Save
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;