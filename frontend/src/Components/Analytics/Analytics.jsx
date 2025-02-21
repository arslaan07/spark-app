
import styles from './Analytics.module.css'

const Analytics = () => {
  return (
    <section className={styles.analyticsSection}>
      <div className={`${styles.analyticsContent} ${styles.mobileAnalyticsContent}`}>
      <h2 className={styles.title}>
          The best in the class product for you today!
        </h2>
        <p className={styles.description}>
        Discover excellence redefined with our best-in-class product, designed to elevate your experience and meet your needs like never before.
        </p>
      </div>
      <div className={styles.metricsDisplay}>    
        <div className={styles.analyticsImage}>
          <img src="/images/Analytics/analytics.png" alt="Analytics" />
        </div>
        <p className={styles.metricsCaption}>
          Sell products and collect payments. It's monetization made simple.
        </p>
      </div>
        
      <div className={styles.analyticsContent}>
        <h2 className={styles.title}>
          Analyze your audience and keep your followers engaged
        </h2>
        <p className={styles.description}>
          Track your engagement over time, monitor revenue and learn what's converting your audience. Make informed updates on the fly to keep them coming back.
        </p>
      </div>
    </section>
  )
}
 
export default Analytics