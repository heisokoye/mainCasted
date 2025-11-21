 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken} from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBNDnlZZqR9Nnv9EqKCTtKWAX6U079eME",
  authDomain: "castedwebsite.firebaseapp.com",
  projectId: "castedwebsite",
  storageBucket: "castedwebsite.firebasestorage.app",
  messagingSenderId: "409699688675",
  appId: "1:409699688675:web:fc4ecb269e1d1b6dc9e5d6",
  measurementId: "G-P7LPS5CSLP"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);



export { app, db, storage, messaging };

export const generateToken = async()=>{
  const permission = await Notification.requestPermission();
  console.log('Notification permission status:', permission);

  if(permission==='granted'){
    try {
      const token = await getToken(messaging, {vapidKey: 'BO6gTLciyTn4U3v9h5Z7RIcRcFjMjkMNZhSfMBRNhhps8_ELBbnzrug9rGaIbBVfbMDbmtN_0Ha5Bm5kcuR9Pfw'});
      console.log('Token generated: ', token);
    } catch (err) {
      console.error('An error occurred while retrieving token. ', err);
    }
  } else {
    console.log('Unable to get permission to show notifications.');
  }
}




// Then in your App.jsx's useEffect, you'd call this new function
// useEffect(() => {
//   generateTokenAndSendToServer();
//   // ... onMessage listener
// }, []);
