import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <div className={styles.logoImg}>
          <img src="/images/spark-logo.png" alt="Spark" />
          <div className={styles.dot} ></div> 
        </div>
        <span className={styles.textWrapper}>
          <span className={styles.sparktext}>SPARK<sup>TM</sup></span>
          <span className={styles.divider}></span>
          <span>Marketplace</span>
        </span>
      </div>
      <Link to={'/sign-up'} className={styles.signupButton}>Sign up free</Link>
    </nav>
  );
};

export default Navbar;
