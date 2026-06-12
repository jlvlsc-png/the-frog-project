/**
 * Firebase Cloud Functions (token minting for admin password)
 *
 * This file MUST be deployed to Firebase Functions for the secure flow to work.
 *
 * Flow:
 * 1) Client calls: POST https://<region>-<project>.cloudfunctions.net/mintAdminToken
 * 2) Cloud Function checks password (N215832458r)
 * 3) If correct: returns { token, expiresAt }
 * 4) Firestore rules accept writes/deletes only when client presents token
 *
 * Note: For true security, we use a server-generated JWT signed with
 * functions config secret. Firestore rules need a way to validate it.
 *
 * Implementation below uses JWT custom claims approach is not possible directly
 * from a password endpoint without Admin SDK auth.
 *
 * So this function returns a token that can be verified by Firestore rules only
 * if you set up a token validation strategy.
 *
 * Practical option:
 * - Use Firebase Authentication custom tokens.
 * - Password endpoint mints a Firebase Auth custom token for an admin UID.
 * - Client signs in with custom token.
 * - Firestore rules enforce admin via request.auth.uid.
 *
 * This repo currently has no auth setup, so you still need to enable
 * Firebase Auth in your Firebase project.
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');

admin.initializeApp();

// If using Firebase Auth custom tokens, store an admin UID constant.
// You can keep it fixed.
const ADMIN_UID = 'updates-admin';

const PASSWORD = 'N215832458r';

const corsHandler = cors({ origin: true });

/**
 * mintAdminToken
 *
 * HTTP endpoint that accepts JSON body: { password: string }
 * Returns: { customToken: string }
 */
exports.mintAdminToken = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
      }

      const password = req.body && req.body.password;
      if (!password || typeof password !== 'string') {
        res.status(400).json({ error: 'Missing password' });
        return;
      }

      // Password check (server-side)
      if (password !== PASSWORD) {
        res.status(403).json({ error: 'Invalid password' });
        return;
      }

      // Create a Firebase custom token for the fixed admin UID
      const customToken = await admin.auth().createCustomToken(ADMIN_UID, {
        role: 'admin',
        issuedAt: Date.now(),
      });

      res.status(200).json({
        customToken,
      });
    } catch (err) {
      console.error('mintAdminToken error:', err);
      res.status(500).json({ error: 'Internal error' });
    }
  });
});

