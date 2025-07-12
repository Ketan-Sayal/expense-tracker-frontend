import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import {LoginPage, SignupPage} from './auth/forms';
import {Analytics, ContactSupport, Home, ProfilePage, ReportsPage} from "./root/pages"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/index.jsx';
import AuthLayout from './auth/AuthLayout.jsx';
import RootLayout from './root/RootLayout.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { config } from './config/index.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AuthProvider><App/></AuthProvider>}>
      <Route path='/' element={<AuthLayout/>}>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
      </Route>
      
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/contact' element={<ContactSupport/>}/>
        <Route path='/profile/:id' element={<ProfilePage/>}/>
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='/reports' element={<ReportsPage/>}/>
      </Route>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={config.googleCilentId}>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>,
)
