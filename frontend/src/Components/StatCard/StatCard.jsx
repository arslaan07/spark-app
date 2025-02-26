import React from 'react';
import styles from './StatCard.module.css';

function StatCard({ title, value, color, fontColor }) {
  return (
    <div style={{ backgroundColor: color, color: fontColor }} className={`${styles.statCard} `}>
      <h3 className={styles.statTitle}>{title}</h3>
      <p className={styles.statValue}>{value}</p>
    </div>
  );
}

export default StatCard;