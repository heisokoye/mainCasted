// Import Firebase scripts
self.importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js");
self.importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js");

// Initialize Firebase
self.firebase.initializeApp({
  apiKey: "AIzaSyBBNDnlZZqR9Nnv9EqKCTtKWAX6U079eME",
  authDomain: "castedwebsite.firebaseapp.com",
  projectId: "castedwebsite",
  storageBucket: "castedwebsite.firebasestorage.app",
  messagingSenderId: "409699688675",
  appId: "1:409699688675:web:fc4ecb269e1d1b6dc9e5d6",
  measurementId: "G-P7LPS5CSLP"
});

const messaging = self.firebase.messaging();

// ONLY handle data messages (background)
messaging.onBackgroundMessage(function(payload) {
  console.log('Background message received:', payload);

  const data = payload.data || {};

  const notificationTitle = data.title || 'Casted Update';
  const notificationOptions = {
    body: data.body || 'Open the app to learn more.',
    icon: data.icon || '/castedicon.png',
    badge: data.badge || '/castedicon.png',
    image: data.image || 'https://castedpub.vercel.app/matchday.jpg',
    data: { url: data.url || '/' },
    tag: 'casted-update' // Add this tag to prevent duplicate notifications
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const destinationUrl = event.notification?.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === destinationUrl && 'focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(destinationUrl);
      return null;
    })
  );
});
