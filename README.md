# Calendrier PWA - Alsatia Unitas Schiltigheim 3 (Saison 2025-2026)

[![Statut du Déploiement Netlify](https://api.netlify.com/api/v1/badges/VOTRE_API_ID_NETLIFY/deploy-status)](https://app.netlify.com/sites/calendrier-asuschilti3-2025/deploys)

Cette Progressive Web App (PWA) a été conçue pour afficher et consulter facilement le calendrier des matchs de l'équipe de tennis de table **Alsatia Unitas Schiltigheim 3** pour la saison 2025-2026.

Le site est accessible à l'adresse : **[https://calendrier-asuschilti3-2025.netlify.app/](https://calendrier-asuschilti3-2025.netlify.app/)**

---

### Aperçu de l'application

![Aperçu du calendrier des matchs](https://i.imgur.com/w8Q8sYl.png)
*(Remplacez cette URL par un lien vers votre propre capture d'écran si vous le souhaitez)*

---

## ✨ Fonctionnalités

*   **Consultation du calendrier complet** des matchs de la saison.
*   **Filtrage rapide** par lieu (Domicile / Extérieur) et par mois.
*   **Recherche dynamique** pour trouver un match, une équipe ou un joueur.
*   **Affichage des informations clés** de la saison (Division, Poule, Secteur).
*   **Compteur** du nombre total de matchs.
*   **Mode sombre** pour un meilleur confort visuel.
*   **Installable (PWA)** : l'application peut être ajoutée à l'écran d'accueil d'un smartphone pour un accès rapide.

---

## 🛠️ Stack Technique

*   **Frontend :** HTML5, CSS3, JavaScript (Vanilla JS)
*   **Backend :** Netlify Functions (Node.js) pour la logique côté serveur.
*   **Base de données :** Google Firestore pour le stockage des données des matchs.
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
    ```bash
    cd calendrier-pwa/Calendrier PWA
    ```

3.  **Installez les dépendances :**
    Cette commande va lire le `package.json` et installer les paquets nécessaires (comme `firebase-admin`) dans un dossier `node_modules`.
    ```bash
    npm install
    ```

4.  **Configurez les variables d'environnement :**
    Vous devez fournir les clés secrètes pour que l'application puisse se connecter à Firebase. La Netlify CLI les lira automatiquement.
    ```bash
    # Remplacez les valeurs par les vôtres
    netlify env:set FIREBASE_PROJECT_ID "votre-project-id"
    netlify env:set FIREBASE_CLIENT_EMAIL "votre-client-email"
    netlify env:set FIREBASE_PRIVATE_KEY "votre-----clé-----privée"
    ```

5.  **Lancez le serveur de développement local :**
    Cette commande démarre un serveur sur votre machine qui simule l'environnement Netlify, y compris les fonctions.
    ```bash
    netlify dev
    ```
    Votre site sera accessible à l'adresse `http://localhost:8888`.

### Remplir la base de données (si nécessaire)

Si votre base de données est vide, vous pouvez la remplir avec les données initiales en utilisant la fonction `seedDatabase`.

1.  Assurez-vous que le serveur `netlify dev` est en cours d'exécution dans un premier terminal.
2.  Ouvrez un **second terminal** et lancez la commande suivante :
    ```bash
    netlify functions:invoke seedDatabase --no-identity
    ```
    Cette action n'est à faire qu'une seule fois.

---

## 🌐 Déploiement

Le site est déployé automatiquement par Netlify. Chaque `git push` sur la branche `main` déclenche un nouveau déploiement.

La configuration du build se trouve dans le fichier `netlify.toml` et dans les paramètres du site sur Netlify :
*   **Base directory :** `Calendrier PWA`
*   **Build command :** (vide)
*   **Publish directory :** (vide)

---
*Note : Pour trouver votre `VOTRE_API_ID_NETLIFY` pour le badge, allez dans `Site settings > General > Site details > API ID` sur votre tableau de bord Netlify.*
*   **Publish directory :** (vide)

---
*Note : Pour trouver votre `VOTRE_API_ID_NETLIFY` pour le badge, allez dans `Site settings > General > Site details > API ID` sur votre tableau de bord Netlify.*
