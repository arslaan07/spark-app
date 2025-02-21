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

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/profile" element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          {/* Add other routes here */}
        </Route>
        <Route path="/iphone" element={<Iphone />} />
      </Routes>
      <MouseParticles g={1} color="white" cull="col,image-wrapper"/>
      <CustomCursor />
      </>
  )
}

export default App
