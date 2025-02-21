import React, { useState } from "react";
import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { IoMdEyeOff } from "react-icons/io";

const SignIn = () => {
  const [continueWithEmail, setContinueWithEmail] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (name === "email") {
      if (!value.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = "Invalid email address";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newErrors = {};
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email address";
      }
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      } 

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        console.log("Form submitted successfully:", formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <h1 className={styles.heading}>Sign in to your Spark</h1>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
              {/* <label  className={` ${errors.email ? styles.errorLabel : ''}`} htmlFor="email">Email</label> */}
                <input
                  style={
                    errors.email
                      ? { border: "2px solid red", outline: "none" }
                      : {}
                  }
                  type="email"
                  id="email"
                  placeholder="spark email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.email && (
                  <div style={{ height: "5px" }} className={styles.error}>
                    {errors.email}
                  </div>
                )}
              </div>
              <div
                style={{ marginBottom: "2.5rem", position: "relative" }}
                className={styles.formGroup}
              >
                {/* <label  className={` ${errors.password ? styles.errorLabel : ''}`} htmlFor="password">Password</label> */}
                <input
                  style={
                    errors.password
                      ? { border: "2px solid red", outline: "none" }
                      : {}
                  }
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="spark password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.password}
                  required
                />
                <span onClick={togglePasswordVisibility} className={styles.eye}>
                  {showPassword ? (
                    <FiEye className={styles.eye} />
                  ) : (
                    <IoMdEyeOff className={styles.eye} />
                  )}
                </span>
                {errors.password && (
                  <div style={{ height: "5px" }} className={styles.error}>
                    {errors.password}
                  </div>
                )}
              </div>
              <button type="submit" className={styles.btn}>
                Login
              </button>
            </form>
            <p className={styles.registerLink}>
              <a href="#">Forgot password?</a>
            </p>
            <p className={styles.registerLink}>
              Don't have an account? <a href="/sign-up">Sign Up</a>
            </p>
          </div>
        }
        {
            !continueWithEmail && <>
            <h1 className={`${styles.heading} ${styles.headingMobile}`}>Sign In to your Spark</h1>
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
              Don't have an account? <a href="/sign-up">Sign Up</a>
            </p>
            </div>
            </>
        }
        
        <p className={styles.tnc}>
          This site is protected by reCAPTCHA and the{" "}
          <a href="#"> Google Privacy Policy</a> and{" "}
          <a href="#">Terms of Service apply</a>.
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

export default SignIn;