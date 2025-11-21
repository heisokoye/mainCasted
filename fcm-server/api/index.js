import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import { loadJSON } from './load-json.js'; // Import the helper

const app = express();
app.use(express.json());
app.use(cors());

// Load Firebase service account credentials
// In production, use environment variable; fallback to JSON file for local dev
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // If service account is provided as environment variable (JSON string)
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Fallback to JSON file (for local development)
  serviceAccount = loadJSON('./castedwebsite-firebase-adminsdk-fbsvc-18163fe0f1.json');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Add a root route to confirm the server is running
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

    const message = {
      notification: { title, body },
      tokens: tokens,
    };

    try {
      // firebase-admin v13 uses `sendEachForMulticast` for multicast sends
      const response = await admin.messaging().sendEachForMulticast(message);
      console.log(`${response.successCount} messages were sent successfully`);
      if (response.failureCount && response.failureCount > 0) {
        const failed = response.responses
          .map((r, i) => (r.success ? null : { token: tokens[i], error: r.error && r.error.message }))
          .filter(Boolean);
        console.warn('Some messages failed to send:', failed);
        // Optionally remove permanently invalid tokens from the set
        failed.forEach(f => {
          // basic heuristic: remove tokens with errors that indicate invalid/unregistered
          const msg = (f.error || '').toLowerCase();
          if (msg.includes('not registered') || msg.includes('invalid-registration-token') || msg.includes('registration token is not registered')) {
            registrationTokens.delete(f.token);
            console.log('Removed invalid token:', f.token);
          }
        });
        return res.status(207).send({ message: 'Some notifications failed', summary: { successCount: response.successCount, failureCount: response.failureCount }, failed });
      }

      res.status(200).send({ message: 'Notifications sent to all tokens', summary: { successCount: response.successCount, failureCount: response.failureCount } });
    } catch (error) {
      console.error('--- DETAILED FCM ERROR ---');
      console.error(error);
      const details = error && error.message ? error.message : String(error);
      res.status(500).send({ error: 'Failed to send notifications.', details });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`FCM server running on port ${PORT}`);
});
