import React from 'react'
import styles from './Home.module.css'
import Navbar from '../../Components/Navbar/Navbar'
import Hero from '../../Components/Hero/Hero'
import Analytics from '../../Components/Analytics/Analytics'
import ContentSharing from '../../Components/ContentSharing/ContentSharing'
import Testimonials from '../../Components/Testimonials/Testimonials'
import Integrations from '../../Components/Integrations/Integrations'
import Footer from '../../Components/Footer/Footer'

const Home = () => {
  return (
    <div className={styles.home}>
      <Navbar />
      <Hero />
      <Analytics />
      <ContentSharing />
      <Testimonials />
      <Integrations />
      <Footer />
    </div>
  )
}

export default Home
