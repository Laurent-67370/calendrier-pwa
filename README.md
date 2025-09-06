# Calendrier PWA - Alsatia Unitas Schiltigheim 3 (Saison 2025-2026)

[![Statut du Déploiement Netlify](https://api.netlify.com/api/v1/badges/VOTRE_API_ID_NETLIFY/deploy-status)](https://app.netlify.com/sites/calendrier-asuschilti3-2025/deploys)

Cette Progressive Web App (PWA) a été conçue pour afficher, consulter et gérer facilement le calendrier des matchs de l'équipe de tennis de table **Alsatia Unitas Schiltigheim 3** pour la saison 2025-2026.

Le site est accessible à l'adresse : **[https://calendrier-asuschilti3-2025.netlify.app/](https://calendrier-asuschilti3-2025.netlify.app/)**

---

### Aperçu de l'application

![Aperçu du calendrier des matchs](https://i.imgur.com/w8Q8sYl.png)
*(N'hésitez pas à remplacer ce lien par une capture d'écran plus récente de votre application)*

---

## ✨ Fonctionnalités

*   **Consultation du calendrier complet** des matchs de la saison.
*   **Saisie et modification des scores** pour les matchs terminés.
*   **Gestion de la composition d'équipe** pour chaque match (disponibilité et sélection des joueurs).
*   **Filtrage rapide** par lieu (Domicile / Extérieur) et par mois.
*   **Recherche dynamique** pour trouver un match par équipe, journée ou joueur sélectionné.
*   **Affichage des informations clés** de la saison (Division, Poule, Secteur).
*   **Boutons d'action utiles** : Partager les infos du match et ajouter au calendrier Google.
*   **Mode sombre** pour un meilleur confort visuel.
*   **Installable (PWA)** : l'application peut être ajoutée à l'écran d'accueil d'un smartphone pour un accès rapide et une utilisation hors ligne.

---

## 🛠️ Stack Technique

*   **Frontend :** HTML5, CSS3, JavaScript (Vanilla JS)
*   **Backend :** Netlify Functions (Node.js) pour la logique côté serveur.
*   **Base de données :** Google Firestore pour le stockage persistant des données (scores, compositions).
*   **Hébergement & Déploiement :** Netlify, avec déploiement continu depuis GitHub.

---

## 🚀 Démarrage en Local

Pour lancer ce projet sur votre machine, suivez les étapes ci-dessous.

### Prérequis

*   [Node.js](https://nodejs.org/) (version 18 ou supérieure)
*   [Netlify CLI](https://docs.netlify.com/cli/get-started/)

### Installation

1.  **Clonez le dépôt :**
    ```bash
    git clone https://github.com/Laurent-67370/calendrier-pwa.git
    ```

2.  **Naviguez dans le dossier du projet :**
    *Attention, le code se trouve dans un sous-dossier.*
    ```bash
    cd calendrier-pwa/Calendrier PWA
    ```

3.  **Installez les dépendances :**
    Cette commande va lire le `package.json` et installer `firebase-admin` dans un dossier `node_modules`.
    ```bash
    npm install
    ```

4.  **Configurez les variables d'environnement :**
    Connectez votre CLI au bon compte et définissez les clés secrètes pour Firebase.
    ```bash
    netlify login
    netlify link
    # Remplacez les valeurs par les vôtres
    netlify env:set FIREBASE_PROJECT_ID "votre-project-id"
    netlify env:set FIREBASE_CLIENT_EMAIL "votre-client-email"
    netlify env:set FIREBASE_PRIVATE_KEY "votre-----clé-----privée"
    ```

5.  **Lancez le serveur de développement local :**
    ```bash
    netlify dev
    ```
    Votre site sera accessible à l'adresse `http://localhost:8888`.

### Remplir la base de données (si nécessaire)

Si votre base de données Firestore est vide, vous pouvez la remplir avec les données initiales des 7 matchs.

1.  Assurez-vous que le serveur `netlify dev` est en cours d'exécution dans un premier terminal.
2.  Ouvrez un **second terminal** (dans le même dossier) et lancez la commande suivante :
    ```bash
    netlify functions:invoke seedDatabase --no-identity
    ```
    Cette action n'est à faire qu'une seule fois. La fonction est conçue pour ne rien faire si la base de données contient déjà des matchs.

---

## 🌐 Déploiement

Le site est configuré pour un **déploiement continu** depuis la branche `main` du dépôt GitHub. Chaque `git push` sur cette branche déclenche automatiquement un nouveau déploiement sur Netlify.

La configuration du build est définie à la fois dans `netlify.toml` et dans l'interface de Netlify :
*   **Base directory :** `Calendrier PWA` (Configuré dans les "Build settings" de Netlify)
*   **Functions directory :** `netlify/functions` (Configuré dans le fichier `netlify.toml`)
*   **Build command & Publish directory :** Laissés vides.
