import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";

import Home from './pages/Home/Home'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import UserInfo from './pages/UserInfo/UserInfo'
import Profile from './pages/Profile/Profile'
import Layout from './Components/Layout/Layout'
import Settings from './pages/Settings/Settings'
import Appearance from './pages/Appearance/Appearance'
import Analytics from './pages/Analytics/Analytics'
import Logout from './Components/Logout/Logout'
import PublicProfile from './pages/PublicProfile/PublicProfile/PublicProfile'
import Mobile from './Components/Mobile/Mobile'
import MouseParticles from "react-mouse-particles";
import CustomCursor from './Components/CustomCursor/CustomCursor';
import { Toaster } from 'sonner';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  // Redirect new users with null username to getting-to-know page
  if (user && user.username === null && window.location.pathname !== '/getting-to-know') {
    return <Navigate to="/getting-to-know" />;
  }
  
  return children;
};
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Navigate to="/profile" /> : children;
};
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Public Routes */}
        <Route path="/sign-in" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="/profile/:username" element={<PublicRoute><PublicProfile /></PublicRoute>} />

        {/* Private Routes */}
        <Route path="/getting-to-know" element={<PrivateRoute><UserInfo /></PrivateRoute>} />
        <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
        <Route path="/mobile" element={<PrivateRoute><Mobile /></PrivateRoute>} />

        {/* Profile Layout with Protected Routes */}
        <Route path="/profile" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Profile />} /> 
          <Route path="settings" element={<Settings />} /> 
          <Route path="appearance" element={<Appearance />} /> 
          <Route path="analytics" element={<Analytics />} /> 
        </Route>
      </Routes>

      <MouseParticles g={1} color="white" cull="col,image-wrapper"/>
      <CustomCursor />
      <Toaster position="top-right" />
    </>
  )
}

export default App;
