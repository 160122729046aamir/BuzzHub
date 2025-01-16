import React, { useEffect } from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from 'lucide-react';
import { useThemeStore } from './store/useThemeStore'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore()
  useEffect(()=>{
    console.log("hi I'm useEffect for checkAuth")
    checkAuth()
  },[checkAuth]);

  // It is same as useEffect(()=>{
  //   console.log("hi I'm useEffect for checkAuth")
  //   checkAuth()
  // },[]); since the function can't be readed directly by useEffect hook we need to pass it as dependency......

  const {theme}=useThemeStore();
  if (isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div data-theme={theme}>
      <NavBar/>
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
        <Toaster />
    </div>
  )
}

export default App