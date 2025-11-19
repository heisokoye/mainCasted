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

// Register the service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Add this code to handle the PWA install prompt
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default mini-infobar from appearing
  event.preventDefault();

  // Save the event for triggering later
  let deferredPrompt = event;

  // Create a pop-up element
  const installPopup = document.createElement('div');
  installPopup.style.position = 'fixed';
  installPopup.style.bottom = '20px';
  installPopup.style.right = '20px';
  installPopup.style.padding = '10px 20px';
  installPopup.style.backgroundColor = 'brown';
  installPopup.style.color = '#fff';
  installPopup.style.borderRadius = '5px';
  installPopup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  installPopup.style.cursor = 'pointer';
  installPopup.textContent = 'Install this app';

  // Append the pop-up to the body
  document.body.appendChild(installPopup);

  // Handle click on the pop-up
  installPopup.addEventListener('click', () => {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      // Clear the deferred prompt
      deferredPrompt = null;
    });

    // Remove the pop-up after interaction
    document.body.removeChild(installPopup);
  });
});

// Safari detection for PWA installation instructions
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

if (isSafari()) {
  // Create a Safari instruction pop-up
  const safariPopup = document.createElement('div');
  safariPopup.style.position = 'fixed';
  safariPopup.style.bottom = '20px';
  safariPopup.style.right = '20px';
  safariPopup.style.padding = '10px 20px';
  safariPopup.style.backgroundColor = 'brown';
  safariPopup.style.color = '#fff';
  safariPopup.style.borderRadius = '5px';
  safariPopup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  safariPopup.style.cursor = 'default';
  safariPopup.textContent = 'To install this app, tap Share → Add to Home Screen';

  // Append the pop-up to the body
  document.body.appendChild(safariPopup);

  // Optionally, remove it after 10 seconds
  setTimeout(() => {
    document.body.removeChild(safariPopup);
  }, 10000);
}

