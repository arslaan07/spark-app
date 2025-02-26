import React from 'react';
import styles from './BarChart.module.css';

function BarChart({ data, horizontal = true }) {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className={styles.barChartContainer}>
      <div className={styles.chartArea}>
        <div className={styles.barsContainer}>
          {data.map((item, index) => (
            <div key={index} className={styles.barGroup}>
              <div 
                className={styles.bar}
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: `rgba(62, 229, 143, ${Math.max(0.4, item.value / maxValue)})`
                }}
              ></div>
              <div className={styles.barLabel}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BarChart;