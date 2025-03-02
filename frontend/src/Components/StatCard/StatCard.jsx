import React from 'react';
import styles from './StatCard.module.css';
import { MdStayPrimaryLandscape } from 'react-icons/md';

function StatCard({ title, value, color, fontColor, active = 1 }) {
  return (
    <div style={{ backgroundColor: color, color: fontColor }} className={active ? styles.active : '' `${styles.statCard} `}>
      <h3 className={styles.statTitle}>{title}</h3>
      <p className={styles.statValue}>{value}</p>
    </div>
  );
}

export default StatCard;