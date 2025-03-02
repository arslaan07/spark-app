import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { FiEye } from "react-icons/fi";
import { IoMdEyeOff } from "react-icons/io";
import api from "../../../api";
import { useNavigate } from "react-router-dom";
import MyToast from '../../Components/MyToast/MyToast';
import Spinner from "../../Components/Spinner/Spinner";


const SignUp = () => {
  // Separate states for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [continueWithEmail, setContinueWithEmail] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
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
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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
        } else {
          delete newErrors.email;
        }
        break;
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
      case "agreeToTerms":
        if (!value) {
          newErrors.agreeToTerms = "You must agree to the terms and conditions";
        } else {
          delete newErrors.agreeToTerms;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
    validateField(name, fieldValue);
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

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully:", formData);
      try {
        setIsLoading(true)
        const response = await api.post('api/auth/signup', formData, { withCredentials: true })
        console.log(response)
        navigate('/getting-to-know')
        MyToast("You are welcome in Spark", "success");
      } catch (error) {
        console.log(error)
        MyToast(`${error.response?.data?.message || "Something went wrong"}`, "error");
      } finally {
        setIsLoading(false)
      }
    } else {
      console.log("Form has errors:", errors);
    }
  };

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
    <div className={styles.container}>
      <div className={styles.heroSection}>
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
        {
          continueWithEmail && <div className={styles.form}>
          <h1 className={styles.heading}>Sign up to your Spark</h1>
          <div className={styles.createHeading}>
            <h3 className={styles.createText}>Create an account</h3>
            <a href="/sign-in">Sign in instead</a>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                style={
                  errors.fname
                    ? { border: "2px solid red", outline: "none" }
                    : {}
                }
                type="text"
                id="fname"
                placeholder="First name"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.fname && (
                <div className={styles.error}>{errors.fname}</div>
              )}
            </div>
            <div className={styles.formGroup}>
              <input
                style={
                  errors.lname
                    ? { border: "2px solid red", outline: "none" }
                    : {}
                }
                type="text"
                id="lname"
                placeholder="Last name"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.lname && (
                <div className={styles.error}>{errors.lname}</div>
              )}
            </div>
            <div className={styles.formGroup}>
              <input
                style={
                  errors.email
                    ? { border: "2px solid red", outline: "none" }
                    : {}
                }
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.email && (
                <div className={styles.error}>{errors.email}</div>
              )}
            </div>
            <div style={{ position: "relative"}} className={styles.formGroup}>
              <input
                style={
                  errors.password
                    ? { border: "2px solid red", outline: "none" }
                    : {}
                }
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
              {errors.password && (
                <div className={styles.error}>{errors.password}</div>
              )}
            </div>
            <div style={{ position: "relative"}} className={styles.formGroup}>
              <input
                style={
                  errors.confirmPassword
                    ? { border: "2px solid red", outline: "none" }
                    : {}
                }
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className={styles.eye}
              >
                {showConfirmPassword ? <FiEye /> : <IoMdEyeOff />}
              </span>
              {errors.confirmPassword && (
                <div className={styles.error}>{errors.confirmPassword}</div>
              )}
            </div>
            <div className={`${styles.formGroup} ${styles.checkboxContainer}`}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <label htmlFor="agreeToTerms">
                  By creating an account, I agree to your&nbsp;
                  <a href="#">Terms of Use</a>&nbsp;and&nbsp;
                  <a href="#">Privacy Policy</a>.
                </label>
              </div>
              {errors.agreeToTerms && (
                <div className={styles.error}>{errors.agreeToTerms}</div>
              )}
            </div>
            <button type="submit" className={styles.btn} disabled={!formData.agreeToTerms}>
              Create an account
            </button>
          </form>
        </div>
        }

        {
                    !continueWithEmail && <>
                    <h1 className={`${styles.heading} ${styles.headingMobile}`}>Sign up to your Spark</h1>
                    <div className={styles.continueWith}>
                        
                        <h1 className={styles.welcome}>Welcome to Spark</h1>
                    <button type="submit" className={`${styles.btn} ${styles.googleBtn}`}>
                        <img src="/images/SignIn/google.png" alt="" />
                      Continue with Google
                    </button>
                    <button type="submit" className={`${styles.btn} ${styles.emailBtn}`} onClick={() => setContinueWithEmail(true)}>
                      <div className={styles.gap}></div>
                      Continue with Email
                    </button>
                    <p className={styles.registerLink}>
                      Already have an account? <a href="/sign-in">Sign In</a>
                    </p>
                    </div>
                    </>
                }
        <p className={styles.tnc}>
          This site is protected by reCAPTCHA and the &nbsp;<a href="#">Google Privacy Policy</a> and &nbsp;<a href="#">Terms of Service</a> apply.
        </p>
      </div>
      <div className={styles.heroImg}>
        <img
          className={styles.signinImg}
          src="./images/SignIn/signin.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default SignUp;