import React from 'react';
import styles from './Dashboard.module.css';
import StatCard from '../../Components/StatCard/StatCard';
import LineChart from '../../Components/LineChart/LineChart';
import BarChart from '../../Components/BarChart/BarChart';
import PieChart from '../../Components/PieChart/PieChart';

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Overview</h1>
      
      <div className={styles.statsContainer}>
        <StatCard title="Clicks on Links" value="2,318" color="#22D679" fontColor="#fff" />
        <StatCard title="Clicks on Shop" value="7,265" color="#DCFFEB" />
        <StatCard title="CTR" value="156" color="#DCFFEB" />
      </div>

      <div className={styles.chartContainer}>
        <LineChart />
      </div>

      <div className={styles.lowerSection}>
        <div className={styles.barChartContainer}>
          <h2>Traffic by Device</h2>
          <BarChart 
            data={[
              { label: 'iPhone', value: 15 },
              { label: 'Mac', value: 20 },
              { label: 'iOS', value: 30 },
              { label: 'Windows', value: 50 },
              { label: 'Android', value: 70 },
              { label: 'Other', value: 22 }
            ]} 
          />
        </div>
        
        <div className={styles.pieChartContainer}>
          <h2>Sites</h2>
          <PieChart
            data={[
              { label: 'Total Site', value: 328 },
              { label: 'Facebook', value: 202 },
              { label: 'Instagram', value: 50 },
              { label: 'Twitter', value: 60 }
            ]} 
          />
        </div>
      </div>

      <div className={styles.linkChartContainer}>
        <h2>Traffic by Links</h2>
        <BarChart
          data={[
            { label: 'Link 1', value: 15 },
            { label: 'Link 2', value: 30 },
            { label: 'Link 3', value: 25 },
            { label: 'Link 4', value: 40 },
            { label: 'Link 5', value: 12 },
            { label: 'Link 6', value: 28 }
          ]} 
          horizontal={false}
        />
      </div>
    </div>
  );
}

export default Dashboard;