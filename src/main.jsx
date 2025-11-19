import ReactGA from "react-ga4";
// Import the createRoot function from react-dom/client
import { createRoot } from 'react-dom/client'
// Import the main stylesheet
import './index.css'
// Import the root component of the application
import App from './App.jsx'

ReactGA.initialize("G-P7LPS5CSLP");

// Removed StrictMode to reduce TBT (causes double rendering)
// Only use StrictMode in development if needed for debugging
// Create a root element and render the App component into it
createRoot(document.getElementById('root')).render(
  <App />
)