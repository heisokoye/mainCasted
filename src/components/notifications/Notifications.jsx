import { useEffect } from 'react';
import { messaging } from '../../Firebase';
import { getToken, onMessage } from 'firebase/messaging';

/**
 * This component handles Firebase Cloud Messaging (FCM) for notifications.
 * It requests permission for notifications, retrieves the device token,
 * and listens for incoming messages when the app is in the foreground.
 */
const Notifications = () => {
  useEffect(() => {
    // This function requests permission from the user to show notifications.
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          // If permission is granted, retrieve the FCM token.
          const token = await getToken(messaging, { vapidKey: 'BD6SbBGtRR7mcFlY3Mtii9yB5Uwx6WItxBZ1Hv5ICv_5VNBe2EybOkhMA-jhSICSnJuWPixevY1zxl7hiVrr5PU' }); //the Vapid Key from firebase
          console.log('Token:', token);
          // You would typically send this token to your server to store it.
          // This allows you to send notifications to this specific device.
        } else {
          console.log('Permission not granted');
        }
      } catch (error) {
        console.error('Error getting permission:', error);
      }
    };

    // Call the function to request permission when the component mounts.
    requestPermission();

    // Set up a listener for incoming messages when the app is in the foreground.
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // When a message is received, display a new notification.
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon || '/castedicon.png',
      });
    });

    // This is a cleanup function that runs when the component unmounts.
    // It unsubscribes from the message listener to prevent memory leaks.
    return () => {
      unsubscribe();
    };
  }, []); // The empty dependency array ensures this effect runs only once.

  // This component does not render any UI elements.
  return null;
};

export default Notifications;
