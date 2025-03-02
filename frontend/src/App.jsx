import React from 'react'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import MouseParticles from "react-mouse-particles";
import CustomCursor from './Components/CustomCursor/CustomCursor';
import { Toaster, toast } from 'sonner';

import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import UserInfo from './pages/UserInfo/UserInfo';
import Profile from './pages/Profile/Profile';
import Layout from './Components/Layout/Layout';
import Iphone from './Components/Iphone/Iphone';
import Toolbar from './Components/ToolBar/Toolbar';
import Settings from './pages/Settings/Settings';
import Appearance from './pages/Appearance/Appearance';
import Analytics from './pages/Analytics/Analytics';
import Logout from './Components/Logout/Logout';
import PublicProfile from './pages/PublicProfile/PublicProfile/PublicProfile';
import Mobile from './Components/Mobile/Mobile';
import Preview from './Components/Preview/Preview';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/getting-to-know" element={<UserInfo />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile/:username" element={<PublicProfile />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/profile" element={<Layout />}>
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

export default App
