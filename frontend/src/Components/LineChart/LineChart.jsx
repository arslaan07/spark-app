import React, { useEffect, useRef, useState } from 'react';
import styles from './LineChart.module.css';

function LineChart({ links, shops }) {
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
          height: 200
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = dimensions.width * pixelRatio;
    canvas.height = dimensions.height * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    const width = dimensions.width;
    const height = dimensions.height;

    // Process click data for links
    const linkClicks = links.flatMap(link => link.clickData || []).map(click => new Date(click.timestamp));

    // Process click data for shops
    const shopClicks = shops.flatMap(shop => shop.clickData || []).map(click => new Date(click.timestamp));

    // Combine and aggregate clicks by day
    const allClicks = [...linkClicks, ...shopClicks];

    if (allClicks.length === 0) return;

    const clickCounts = {};
    allClicks.forEach(date => {
      const dayKey = date.toISOString().split('T')[0];
      clickCounts[dayKey] = (clickCounts[dayKey] || 0) + 1;
    });

    const sortedDates = Object.keys(clickCounts).sort();
    const values = sortedDates.map(date => clickCounts[date]);
    const labels = sortedDates.map(date => {
      const d = new Date(date);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    });

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (values.length === 0) return;

    // Calculate y-axis labels
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const numYLabels = 5; // Number of y-axis labels
    const yStep = (maxValue - minValue) / (numYLabels - 1);

    // Draw y-axis labels
    ctx.fillStyle = '#999';
    const fontSize = width < 500 ? 12 : 10;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < numYLabels; i++) {
      const yValue = minValue + i * yStep;
      const yPosition = height - (yValue / maxValue) * (height - 20); // Subtract 20 for padding
      ctx.fillText(yValue.toFixed(0), 10, yPosition);
    }

    // Draw x-axis labels
    const labelInterval = Math.max(1, Math.floor(values.length / (width < 500 ? 4 : 6)));
    labels.forEach((label, index) => {
      if (index % labelInterval === 0 || index === labels.length - 1) {
        const x = index * (width / (values.length - 1));
        ctx.fillText(label, x, height - 5);
      }
    });

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 2;

    const stepX = width / (values.length - 1);
    const stepY = height / (maxValue * 1.2); // Add 20% padding above max value

    values.forEach((value, index) => {
      const x = index * stepX;
      const y = height - (value * stepY);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw dots at each data point
    values.forEach((value, index) => {
      const x = index * stepX;
      const y = height - (value * stepY);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#2ecc71';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.stroke();
    });

  }, [dimensions, links, shops]);

  return (
    <div className={styles.lineChartContainer} ref={containerRef}>
      <canvas ref={canvasRef} className={styles.lineChart}></canvas>
    </div>
  );
}

export default LineChart;