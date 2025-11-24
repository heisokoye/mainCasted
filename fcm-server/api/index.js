import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import { loadJSON } from '../load-json.js';

const app = express();

// Enable JSON parsing
app.use(express.json());

// CORS — only allow your website
app.use(cors({
  origin: "https://castedpub.blog"
}));

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

const db = admin.firestore();
const tokensCollection = db.collection('fcmTokens');

// GET endpoint for testing
app.get('/', (req, res) => {
  res.send('FCM Server is running!');
});

// STORE TOKEN endpoint
app.post('/store-token', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).send({ error: 'No token provided.' });

  try {
    await tokensCollection.doc(token).set({
      token,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`Token stored: ${token}`);
    res.status(200).send({ message: 'Token stored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to store token.' });
  }
});

// SEND TO ALL endpoint — fully server-driven
app.post('/send-to-all', async (req, res) => {
  const { title, body, image, icon, badge, url } = req.body || {};

  const tokensSnapshot = await tokensCollection.get();
  const tokens = tokensSnapshot.docs.map(doc => doc.id);

  if (!tokens.length) return res.status(400).send({ error: 'No registered tokens.' });

  const message = { data: {}, tokens };

  if (title) message.data.title = title;
  if (body) message.data.body = body;
  if (image) message.data.image = image;
  if (icon) message.data.icon = icon;
  if (badge) message.data.badge = badge;
  if (url) message.data.url = url;

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(`${response.successCount} messages sent successfully`);

    const failed = response.responses
      .map((r, i) => (!r.success ? { token: tokens[i], error: r.error?.message } : null))
      .filter(Boolean);

    // Remove invalid tokens
    for (const failure of failed) {
      const msg = failure.error || '';
      if (
        /not registered/i.test(msg) ||
        /invalid-registration-token/i.test(msg) ||
        /requested entity was not found/i.test(msg)
      ) {
        await tokensCollection.doc(failure.token).delete();
        console.log('Removed invalid token:', failure.token);
      }
    }

    res.status(207).send({
      message: failed.length ? 'Some notifications failed' : 'Notifications sent successfully',
      summary: { successCount: response.successCount, failureCount: response.failureCount },
      failed
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to send notifications', details: error.message || String(error) });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`FCM server running on port ${PORT}`));
