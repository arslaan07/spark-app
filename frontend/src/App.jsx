import React, { Suspense, lazy } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./Components/Layout/Layout";
import Logout from "./Components/Logout/Logout";
import Mobile from "./Components/Mobile/Mobile";
import MouseParticles from "react-mouse-particles";
import CustomCursor from "./Components/CustomCursor/CustomCursor";
import { Toaster } from "sonner";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { logout } from "./store/slices/authSlice";
import MyToast from "./Components/MyToast/MyToast";

// Lazy load pages
const Home = lazy(() => import("./pages/Home/Home"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const UserInfo = lazy(() => import("./pages/UserInfo/UserInfo"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Appearance = lazy(() => import("./pages/Appearance/Appearance"));
const Analytics = lazy(() => import("./pages/Analytics/Analytics"));
const PublicProfile = lazy(() =>
  import("./pages/PublicProfile/PublicProfile/PublicProfile")
);


const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return isAuthenticated ? (user.username !== null ? <Navigate to="/profile" /> : <Navigate to="/getting-to-know" />) : children ;
}
  
  
const App = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  if(Date.now() > user?.refreshToken) {
    dispatch(logout())
    MyToast('Session expired! Initiating Logout ...', 'error')
  }
  return (
    <>
    {/* <Suspense fallback={<div className="loading-screen">Loading...</div>}> */}
      <Routes>
        
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/sign-in" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/reset-password/:resetToken" element={<PublicRoute><ResetPassword /></PublicRoute>} />
        <Route path="/:username" element={<PublicProfile />} />

        <Route path="/getting-to-know" element={<PrivateRoute><UserInfo /></PrivateRoute>} />

        {/* Profile Layout with Protected Routes */}
        <Route path="/profile" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Profile />} /> 
          <Route path="settings" element={<Settings />} /> 
          <Route path="appearance" element={<Appearance />} /> 
          <Route path="analytics" element={<Analytics />} /> 
        </Route>
      </Routes>
      {/* </Suspense> */}
      <MouseParticles g={1} color="white" cull="col,image-wrapper"/>
      <CustomCursor />
      <Toaster position="top-right" />
    </>
  )
}

export default App;
