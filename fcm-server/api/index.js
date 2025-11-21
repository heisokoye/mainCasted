import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import { loadJSON } from './load-json.js'; // Import the helper

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://castedpub.vercel.app"
}));

// Load Firebase service account credentials
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  serviceAccount = loadJSON('./castedwebsite-firebase-adminsdk-fbsvc-18163fe0f1.json');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const tokensCollection = db.collection('fcmTokens');

app.get('/', (req, res) => {
  res.send('FCM Server is running! Ready to receive tokens and send notifications.');
});

app.post('/store-token', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).send({ error: 'No token provided.' });

  try {
    await tokensCollection.doc(token).set({
      token,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`Token stored successfully: ${token}`);
    res.status(200).send({ message: 'Token stored successfully' });
  } catch (error) {
    console.error('Error storing token:', error);
    res.status(500).send({ error: 'Failed to store token.' });
  }
});

app.post('/send-to-all', async (req, res) => {
  const { title, body, image, url } = req.body || {};

  if (!title || !body) {
    return res.status(400).send({ error: 'Request must include `title` and `body` in JSON.' });
  }

  const tokensSnapshot = await tokensCollection.get();
  const tokens = tokensSnapshot.docs.map(doc => doc.id);

  if (tokens.length === 0) {
    return res.status(400).send({ error: 'No registered tokens to send to.' });
  }

  // DATA-ONLY PAYLOAD
  const message = {
    data: {
      title,
      body,
      image: image || 'https://castedpub.vercel.app/slider1.webp',
      url: url || '/'
    },
    tokens
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(`${response.successCount} messages were sent successfully`);

    if (response.failureCount > 0) {
      const failed = response.responses
        .map((r, i) => (r.success ? null : { token: tokens[i], error: r.error?.message }))
        .filter(Boolean);

      console.warn('Some messages failed to send:', failed);

      // Remove invalid tokens
      for (const failure of failed) {
        const msg = (failure.error || '').toLowerCase();
        if (msg.includes('not registered') || msg.includes('invalid-registration-token')) {
          await tokensCollection.doc(failure.token).delete();
          console.log('Removed invalid token:', failure.token);
        }
      }

      return res.status(207).send({
        message: 'Some notifications failed',
        summary: { successCount: response.successCount, failureCount: response.failureCount },
        failed
      });
    }

    res.status(200).send({
      message: 'Notifications sent to all tokens',
      summary: { successCount: response.successCount, failureCount: response.failureCount }
    });
  } catch (error) {
    console.error('--- DETAILED FCM ERROR ---');
    console.error(error);
    res.status(500).send({ error: 'Failed to send notifications.', details: error.message || String(error) });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`FCM server running on port ${PORT}`));
