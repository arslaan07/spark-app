// components/Layout/Layout.jsx
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import styles from './Layout.module.css'
import ProfileNavbar from '../ProfileNavbar/ProfileNavbar'
import MobileNavbar from '../MobileNavbar/MobileNavbar'
import Toolbar from '../ToolBar/Toolbar'

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