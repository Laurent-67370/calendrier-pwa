const admin = require('firebase-admin');

// --- Les données initiales de vos matchs ---
const playersData = [ { id: 1, name: 'Philippe' }, { id: 2, name: 'Jean-Pierre THEODIN' }, { id: 3, name: 'Bernard Wolf' }, { id: 4, name: 'Julien' }, { id: 5, name: 'Laurent Husser' }, { id: 6, name: 'Christine Pontida' }];
const getDefaultComposition = () => ({ available: [], unavailable: [], noresponse: playersData.map(p => p.id), selected: [] });
const initialMatchesData = [
    { id: 'J1', journee: 1, homeTeam: 'OSTWALD ST OSWALD 5', awayTeam: 'ALSATIA UNITAS SCHILTIGHEIM 3', date: '2025-09-18', time: '20h00', venue: 'away', month: 'september', composition: { available: [1, 2, 3, 4], unavailable: [], noresponse: [5, 6], selected: [1, 2, 3, 4] }},
    { id: 'J2', journee: 2, homeTeam: 'ALSATIA UNITAS SCHILTIGHEIM 3', awayTeam: 'STBG ST JEAN 6', date: '2025-10-02', time: '20h15', venue: 'home', month: 'october', composition: getDefaultComposition() },
    { id: 'J3', journee: 3, homeTeam: 'ALSATIA UNITAS SCHILTIGHEIM 3', awayTeam: 'STBG CTS 4', date: '2025-10-16', time: '20h15', venue: 'home', month: 'october', composition: getDefaultComposition() },
    { id: 'J4', journee: 4, homeTeam: 'STBG RACING CLUB 3', awayTeam: 'ALSATIA UNITAS SCHILTIGHEIM 3', date: '2025-10-31', time: '20h15', venue: 'away', month: 'october', composition: getDefaultComposition() },
    { id: 'J5', journee: 5, homeTeam: 'ALSATIA UNITAS SCHILTIGHEIM 3', awayTeam: 'BISCHHEIM CHEMINOTS T.T. 2', date: '2025-11-20', time: '20h15', venue: 'home', month: 'november', composition: getDefaultComposition() },
    { id: 'J6', journee: 6, homeTeam: 'OSTWALD ST OSWALD 7', awayTeam: 'ALSATIA UNITAS SCHILTIGHEIM 3', date: '2025-12-05', time: '20h00', venue: 'away', month: 'december', composition: getDefaultComposition() },
    { id: 'J7', journee: 7, homeTeam: 'ALSATIA UNITAS SCHILTIGHEIM 3', awayTeam: 'VENDENHEIM ENVOLEE 6', date: '2025-12-18', time: '20h15', venue: 'home', month: 'december', composition: getDefaultComposition() }
];

// Initialisation de la connexion à Firebase
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
    const matchesCollection = db.collection('matches');
    const snapshot = await matchesCollection.get();
    if (!snapshot.empty) {
      return { statusCode: 200, body: JSON.stringify({ message: "La base de données contient déjà des données. Aucune action n'a été effectuée." }) };
    }
    const promises = initialMatchesData.map(match => matchesCollection.doc(match.id).set(match));
    await Promise.all(promises);
    return { statusCode: 200, body: JSON.stringify({ message: `Succès ! ${initialMatchesData.length} matchs ont été ajoutés à la base de données.` }) };
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base : ", error);
    return { statusCode: 500, body: error.toString() };
  }
};