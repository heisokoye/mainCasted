// Scripts for firebase and firebase messaging
self.importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
self.importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker
// "Default" Firebase app (important for initialization)
self.firebase.initializeApp({
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
const messaging = self.firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const data = payload.data || {};
  const notification = payload.notification || {};

  const notificationTitle = notification.title || data.title || 'Casted Update';
  const notificationOptions = {
    body: notification.body || data.body || 'Open the app to learn more.',
    icon: notification.icon || data.icon || '/castedicon.png',
    badge: notification.badge || data.badge || '/castedicon.png',
    data: {
      url: data.url || '/',
      ...data,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const destinationUrl = event.notification?.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === destinationUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(destinationUrl);
      }
      return null;
    })
  );
});
