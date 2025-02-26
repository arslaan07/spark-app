import React, { useEffect, useRef, useState } from 'react';
import styles from './LineChart.module.css';

function LineChart() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width,
          height: 200 // Fixed height
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions based on container size
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * pixelRatio;
    canvas.height = dimensions.height * pixelRatio;
    
    // Scale the context
    ctx.scale(pixelRatio, pixelRatio);
    
    // Set CSS dimensions
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    
    const width = dimensions.width;
    const height = dimensions.height;
    
    // Sample data - replace with actual data
    const data = [10, 15, 20, 25, 30, 35, 30, 32, 25, 28, 30];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 2;
    
    const stepX = width / (data.length - 1);
    const stepY = height / 40; // Scale for y-axis
    
    data.forEach((value, index) => {
      const x = index * stepX;
      const y = height - (value * stepY);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Determine which labels to show based on screen width
    let labelInterval = 1;
    if (width < 500) labelInterval = 2;
    if (width < 350) labelInterval = 3;
    
    // Draw axis labels
    ctx.fillStyle = '#999';
    
    // Responsive font size (slightly larger on small screens)
    const fontSize = width < 500 ? 12 : 10;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    
    months.forEach((month, index) => {
      // Only show some labels on smaller screens
      if (index % labelInterval === 0 || index === months.length - 1) {
        const x = (index * width / (months.length - 1));
        ctx.fillText(month, x, height - 5);
      }
    });
  }, [dimensions]);

  return (
    <div className={styles.lineChartContainer} ref={containerRef}>
      <canvas ref={canvasRef} className={styles.lineChart}></canvas>
    </div>
  );
}

export default LineChart;