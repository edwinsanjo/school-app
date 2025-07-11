import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './Router'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./context/authContext";


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </AuthProvider>,
)
