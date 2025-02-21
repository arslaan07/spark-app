// components/Layout/Layout.jsx
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import styles from './Layout.module.css'
import ProfileNavbar from '../ProfileNavbar/ProfileNavbar'

function Layout() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <ProfileNavbar />
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout;