import React from "react";
import styles from "./Navbar.module.css";

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
      <button className={styles.signupButton}>Sign up free</button>
    </nav>
  );
};

export default Navbar;
