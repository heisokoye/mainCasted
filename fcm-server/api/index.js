import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import { loadJSON } from './load-json.js';

const app = express();
app.use(express.json());
app.use(cors());

// Load Firebase service account
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  serviceAccount = loadJSON('./castedwebsite-firebase-adminsdk-fbsvc-18163fe0f1.json');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Routes
app.get('/', (req, res) => {
  res.send('FCM Server is running! Ready to receive tokens and send notifications.');
});

let registrationTokens = new Set();

app.post('/store-token', (req, res) => {
  const { token } = req.body;
  if (token) {
    registrationTokens.add(token);
    console.log(`Token stored. Total tokens: ${registrationTokens.size}`);
    res.status(200).send({ message: 'Token stored successfully' });
  } else {
    res.status(400).send({ error: 'No token provided.' });
  }
});

app.post('/send-to-all', async (req, res) => {
  const { title, body } = req.body || {};
  const tokens = Array.from(registrationTokens);

  if (!title || !body) {
    return res.status(400).send({ error: 'Request must include `title` and `body` in JSON.' });
  }
  if (tokens.length === 0) {
    return res.status(400).send({ error: 'No registered tokens to send to.' });
  }

  const message = { notification: { title, body }, tokens };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(`${response.successCount} messages sent successfully`);
    res.status(200).send({ message: 'Notifications sent', summary: { successCount: response.successCount, failureCount: response.failureCount } });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to send notifications.', details: error.message });
  }
});

// **Export the app for Vercel**
export default app;
