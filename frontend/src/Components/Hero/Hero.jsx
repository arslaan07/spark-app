import styles from './Hero.module.css'

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.leftContent}>
        <h1 className={styles.title}>
          The easiest place to update and share your Connection
        </h1>
        <p className={styles.description}>
          Help your followers discover everything you're sharing all over the internet, in one simple place. They'll thank you for it!
        </p>
        <button className={styles.getStartedBtn}>Get your free Spark</button>
      </div>
      
      <div className={styles.rightContent}>
        <div className={styles.dashboardImage}>
          <img src="/images/Hero/dashboard.png" alt="Analytics Dashboard" />
        </div>
      </div>
    </section>
  )
}

export default Hero