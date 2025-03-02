import React, { useEffect, useRef, useState } from 'react';
import styles from './PieChart.module.css';

function PieChart({ data }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || data.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions based on container size
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * pixelRatio;
    canvas.height = canvas.offsetHeight * pixelRatio;
    
    // Scale the context to ensure correct drawing operations
    ctx.scale(pixelRatio, pixelRatio);
    
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const radius = Math.min(width, height) / 2 * 0.8;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Colors for different segments
    const colors = ['#2ecc71', '#333', '#3498db', '#f1c40f', '#e74c3c', '#9b59b6', '#e67e22', '#1abc9c', '#95a5a6', '#34495e'];
    
    // Calculate total value for percentage
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw pie chart
    let startAngle = 0;
    
    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      
      startAngle += sliceAngle;
    });
    
    // Draw center circle (donut hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }, [data, dimensions]);

  return (
    <div className={styles.pieChartContainer} ref={containerRef}>
      <div className={styles.canvasWrapper}>
        <canvas ref={canvasRef} className={styles.pieChart}></canvas>
      </div>
      <div className={styles.legend}>
        {data.map((item, index) => (
          <div key={index} className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: ['#2ecc71', '#333', '#3498db', '#f1c40f', '#e74c3c', '#9b59b6', '#e67e22', '#1abc9c', '#95a5a6', '#34495e'][index % 10] }}
            ></div>
            <div className={styles.legendLabel}>{item.label}</div>
            <div className={styles.legendValue}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PieChart;