const admin = require('firebase-admin');

// Cette initialisation est conçue pour ne s'exécuter qu'une seule fois.
// Vos variables d'environnement configurées dans Netlify seront utilisées ici.
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Remplace les caractères d'échappement \\n par de vrais sauts de ligne
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error("Erreur d'initialisation de Firebase Admin SDK:", error);
    // En cas d'échec d'initialisation, on ne peut rien faire d'autre.
  }
}

const db = admin.firestore();

exports.handler = async function(event, context) {
  // On s'assure que la requête est de type POST
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Méthode non autorisée' }) 
    };
  }

  try {
    const data = JSON.parse(event.body);
    // On utilise "matchId" comme dans votre code original
    const { matchId, composition, scoreHome, scoreAway } = data;

    if (!matchId) {
      return { 
        statusCode: 400, // Bad Request
        body: JSON.stringify({ error: "L'ID du match est manquant dans la requête." }) 
      };
    }

    const matchRef = db.collection('matches').doc(matchId);
    const updateData = {}; // On prépare un objet vide pour la mise à jour

    // Logique pour la mise à jour de la composition (VOTRE FONCTIONNALITÉ ORIGINALE)
    if (composition) {
        updateData.composition = composition;
    }

    // NOUVELLE logique pour la mise à jour du score
    if (scoreHome !== undefined && scoreAway !== undefined) {
      const home = parseInt(scoreHome, 10);
      const away = parseInt(scoreAway, 10);

      // Validation simple des scores
      if (isNaN(home) || isNaN(away) || home < 0 || away < 0) {
        return { 
          statusCode: 400, 
          body: JSON.stringify({ error: 'Les scores fournis sont invalides.' }) 
        };
      }
      
      updateData.scoreHome = home;
      updateData.scoreAway = away;
      updateData.status = 'terminé'; // Le match est automatiquement marqué comme terminé
    }

    // On vérifie qu'il y a bien quelque chose à mettre à jour
    if (Object.keys(updateData).length === 0) {
        return { 
          statusCode: 400, 
          body: JSON.stringify({ error: 'Aucune donnée valide à mettre à jour n\'a été fournie.' }) 
        };
    }
    
    // On exécute la mise à jour sur Firestore avec les données collectées
    await matchRef.update(updateData);

    return {
      statusCode: 200, // OK
      body: JSON.stringify({ message: `Le match ${matchId} a été mis à jour avec succès.` }),
    };

  } catch (error) {
    console.error("Erreur lors de la mise à jour du match:", error);
    return {
      statusCode: 500, // Internal Server Error
      body: JSON.stringify({ error: "Une erreur interne est survenue sur le serveur." }),
    };
  }
};