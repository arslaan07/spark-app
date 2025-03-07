import React, { useEffect, useState } from "react";
import styles from "./ResetPassword.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { IoMdEyeOff } from "react-icons/io";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import MyToast from '../../Components/MyToast/MyToast';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = useParams()
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  // Form data state
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // Errors state
  const [errors, setErrors] = useState({});
  
  // Validate individual fields
  const validateField = (name, value) => {
    let newErrors = { ...errors };
    
    switch (name) {
      case "password":
        if (!value.trim()) {
          newErrors.password = "Password is required";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters long";
        } else if (!/[A-Z]/.test(value)) {
          newErrors.password = "Password must contain at least one uppercase letter";
        } else if (!/[a-z]/.test(value)) {
          newErrors.password = "Password must contain at least one lowercase letter";
        } else if (!/[0-9]/.test(value)) {
          newErrors.password = "Password must contain at least one number";
        } else if (!/[^A-Za-z0-9]/.test(value)) {
          newErrors.password = "Password must contain at least one special character";
        } else {
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (!value.trim()) {
          newErrors.confirmPassword = "Confirm password is required";
        } else if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
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
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Handle blur events for validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });

    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      try {
        setIsLoading(true);
        const response = await api.post('api/auth/set-newpassword', formData, { 
            params: {
                resetToken: params.resetToken
            },
            withCredentials: true     
        });
        console.log(response);
        navigate("/sign-in");
        MyToast("Password changed successfully", "success");
      } catch (error) {
        console.log(error);
        MyToast(`${error.response?.data?.message || "Something went wrong"}`, "error");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Form has errors:", errors);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.logo}>
          <div className={styles.logoImg}>
            <img src="/images/spark-logo.png" alt="Spark" />
            <div className={styles.dot}></div>
          </div>
          <span className={styles.textWrapper}>
            <span className={styles.sparktext}>
              SPARK<sup>TM</sup>
            </span>
          </span>
        </div>

        <div className={styles.form}>
          <h1 className={styles.heading}>Reset your Spark password</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              {isLoading ? (
                <div className={`${styles.skeleton} ${styles.skeletonInput}`}></div>
              ) : (
                <div style={{ position: "relative" }} className={styles.formGroup}>
                  <input
                    style={errors.password ? { border: "2px solid red", outline: "none" } : {}}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <span onClick={togglePasswordVisibility} className={styles.eye}>
                    {showPassword ? <FiEye /> : <IoMdEyeOff />}
                  </span>
                  {errors.password && <div className={styles.error}>{errors.password}</div>}
                </div>
              )}
            </div>

            <div className={styles.formGroup} style={{ position: "relative" }}>
              {isLoading ? (
                <div className={`${styles.skeleton} ${styles.skeletonInput}`}></div>
              ) : (
                <div style={{ position: "relative" }} className={styles.formGroup}>
                  <input
                    style={errors.confirmPassword ? { border: "2px solid red", outline: "none" } : {}}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <span onClick={toggleConfirmPasswordVisibility} className={styles.eye}>
                    {showConfirmPassword ? <FiEye /> : <IoMdEyeOff />}
                  </span>
                  {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              {isLoading ? (
                <div className={`${styles.skeleton} ${styles.skeletonButton}`}></div>
              ) : (
                <button type="submit" className={styles.btn}>
                  Save new password
                </button>
              )}
            </div>
          </form>
        </div>

        <p className={styles.tnc}>
          This site is protected by reCAPTCHA and the <a href="#">Google Privacy Policy</a> and{" "}
          <a href="#">Terms of Service apply</a>.
        </p>
      </div>

      <div className={styles.heroImg}>
        <img className={styles.signinImg} src="/images/SignIn/signin.png" alt="" />
      </div>
    </div>
  );
};

export default ResetPassword;
