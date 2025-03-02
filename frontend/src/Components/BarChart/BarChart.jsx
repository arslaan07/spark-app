import React, { useEffect, useRef, useState } from 'react';
import styles from './BarChart.module.css';

function BarChart({ data, horizontal = false }) {
  console.log(data)
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width,
          height: 300
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || !data || data.length === 0) return;

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
    const padding = 40;

    ctx.clearRect(0, 0, width, height);

    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = Math.min(30, (width - padding * 2) / data.length * 0.3); // Max 30px wide, or 30% of available space per bar
    const totalBarSpace = barWidth * data.length;
    const totalSpacing = width - padding * 2 - totalBarSpace;
    const barSpacing = data.length > 1 ? totalSpacing / (data.length - 1) : 0;

    data.forEach((item, index) => {
      const x = padding + index * (barWidth + barSpacing);
      const barHeight = (item.value / maxValue) * (height - padding * 2);
      const y = height - barHeight - padding;

      // Draw bar
      ctx.fillStyle = '#2ecc71';
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw label
      ctx.fillStyle = '#999';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, x + barWidth / 2, height - padding / 2);

      // Draw value label on top of the bar
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.value, x + barWidth / 2, y - 5); // Adjust y position to place text above the bar
    });

  }, [dimensions, data, horizontal]);

  return (
    <div className={styles.barChartContainer} ref={containerRef}>
      <canvas ref={canvasRef} className={styles.barChart}></canvas>
    </div>
  );
}

export default BarChart;