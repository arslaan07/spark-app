import React, { lazy } from 'react'
import styles from './Home.module.css'
const Navbar = lazy(() => import("../../Components/Navbar/Navbar"));
const Hero = lazy(() => import("../../Components/Hero/Hero"));
const Analytics = lazy(() => import("../../Components/Analytics/Analytics"));
const ContentSharing = lazy(() => import("../../Components/ContentSharing/ContentSharing"));
const Testimonials = lazy(() => import("../../Components/Testimonials/Testimonials"));
const Integrations = lazy(() => import("../../Components/Integrations/Integrations"));
const Footer = lazy(() => import("../../Components/Footer/Footer"));

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
