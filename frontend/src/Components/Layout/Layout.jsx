// components/Layout/Layout.jsx
import { Outlet } from 'react-router-dom'
import { lazy } from 'react'
import styles from './Layout.module.css'
const Sidebar = lazy(() => import('../Sidebar/Sidebar'));
const ProfileNavbar = lazy(() => import('../ProfileNavbar/ProfileNavbar'));
const MobileNavbar = lazy(() => import('../MobileNavbar/MobileNavbar'));
const Toolbar = lazy(() => import('../Toolbar/Toolbar'));
function Layout() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <MobileNavbar />
      <div className={styles.mainContent}>
        <ProfileNavbar />
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
      <Toolbar />
    </div>
  )
}

export default Layout;