// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker
// "Default" Firebase app (important for initialization)
firebase.initializeApp({
    apiKey: "AIzaSyBBNDnlZZqR9Nnv9EqKCTtKWAX6U079eME",
    authDomain: "castedwebsite.firebaseapp.com",
    projectId: "castedwebsite",
    storageBucket: "castedwebsite.firebasestorage.app",
    messagingSenderId: "409699688675",
    appId: "1:409699688675:web:fc4ecb269e1d1b6dc9e5d6",
    measurementId: "G-P7LPS5CSLP"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/castedicon.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
