import React from 'react'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import MouseParticles from "react-mouse-particles";
import CustomCursor from './Components/CustomCursor/CustomCursor';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import UserInfo from './pages/UserInfo/UserInfo';
import Profile from './pages/Profile/Profile';
import Layout from './Components/Layout/Layout';
import Iphone from './Components/Iphone/Iphone';
import Toolbar from './Components/ToolBar/Toolbar';
import Settings from './pages/Settings/Settings';
import Appearance from './pages/Appearance/Appearance';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/profile" element={<Layout />}>
    <Route index element={<Profile />} /> {/* Default child route */}
    <Route path="settings" element={<Settings />} /> {/* Nested route */}
    <Route path="appearance" element={<Appearance />} /> {/* Nested route */}
    <Route path="dash" element={<Dashboard />} /> {/* Nested route */}
    {/* Add other nested routes here */}
  </Route>
        <Route path="/iphone" element={<Iphone />} />
        <Route path="/toolbar" element={<Toolbar />} />
      </Routes>
      <MouseParticles g={1} color="white" cull="col,image-wrapper"/>
      <CustomCursor />
      </>
  )
}

export default App
