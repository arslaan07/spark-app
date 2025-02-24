import React from 'react'
import styles from './ThemeButtons.module.css'
const ThemeButtons = ({ buttonColor, buttonBorder }) => {
  return (
    <div className={styles.themeButtonContainer}>
      <div style={{ backgroundColor: buttonColor, border: buttonBorder}} className={styles.button}></div>
      <div style={{ backgroundColor: buttonColor, border: buttonBorder}} className={styles.button}></div>
      <div style={{ backgroundColor: buttonColor, border: buttonBorder}} className={styles.button}></div>
    </div>
  )
}

export default ThemeButtons
