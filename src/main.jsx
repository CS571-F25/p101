import { StrictMode, useContext, createContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/pages/Home'
import { HashRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavBar from './components/TopNavBar'
import SteamIDContext from './contexts/SteamIDContext'
import ProfileDisplay from './components/pages/ProfileDisplay'
import ProfileCompare from './components/pages/ProfileCompare'
import App from './App.jsx';

const steamIDContext = createContext(SteamIDContext);


createRoot(document.getElementById('root')).render(
  <App />
)
