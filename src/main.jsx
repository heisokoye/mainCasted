import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Removed StrictMode to reduce TBT (causes double rendering)
// Only use StrictMode in development if needed for debugging
createRoot(document.getElementById('root')).render(
  <App />
)
