const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

exports.handler = async function(event, context) {
  try {
    const snapshot = await db.collection('matches').get();
    const matches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return {
      statusCode: 200,
      body: JSON.stringify(matches),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};