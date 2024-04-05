import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Toaster } from 'react-hot-toast'
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster position="top-right" />
    <Analytics/>
    <App />
  </React.StrictMode>
)
