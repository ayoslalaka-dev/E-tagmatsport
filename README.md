# E-Tagmat - Smart Logistics & Groupage Platform

E-Tagmat is a premium digital solution for managing groupage tenders in the logistics sector. It connects Shippers with Carriers through an automated dispatching system and a high-end mobile experience.

## 🚀 Architecture Technique

- **Mobile Client**: React Native (Expo Go)
- **API Backend**: Node.js / Express.js (Architecture MVC)
- **Persistance**: Sequelize & PostgreSQL (UML Class Diagram Perspective)
- **Gestionnaire de Tâches**: BullMQ & Redis (Dispatching intelligent)
- **Communication Temps Réel**: Socket.io
- **Design**: Dark Premium UI / Lucide Icons

## 📂 Structure du Projet

- `/backend`: Serveur API, Modèles Sequelize, Files d'attente BullMQ.
- `/frontend/web`: Application Web Next.js 14 (Landing & Dashboard).
- `/frontend/mobile`: Application React Native Expo (Utilise Expo Go).

## 🛠️ Installation & Démarrage

### 1. Prérequis
- Node.js (v18+)
- Docker (pour PostgreSQL & Redis)
- Application **Expo Go** installée sur votre smartphone.

### 2. Lancement Rapide (Concurrent)
Depuis la racine du projet :
```bash
npm install
npm run dev
```

### 3. Lancement Individuel

#### Backend
```bash
cd backend
npm.cmd install
# Configurez votre .env avec DB_HOST, DB_USER, DB_PASSWORD, REDIS_HOST, etc.
npm.cmd run dev
```

#### Web (Next.js)
```bash
cd frontend/web
npm.cmd install
npm.cmd run dev
```

#### Mobile (Expo Go)
```bash
cd frontend/mobile
npm.cmd install
npx.cmd expo start
```
Une fois lancé, scannez le QR code avec l'application **Expo Go** (Android) ou l'appareil photo (iOS).

## 🧠 Fonctionnalités Avancées

- **Matching Automatique** : Utilisation de BullMQ et Redis pour dispatcher les tenders aux transporteurs disponibles.
- **Splash Screen Premium** : Écran d'accueil animé avec le logo Groupage.
- **Marketplace en temps réel** : Liste des appels d'offres avec mises à jour via WebSockets.
- **Gestion du Vide** : Algorithme (en cours) pour optimiser le chargement des camions.

## 🗄️ Administration BDD
Utilisez **DBeaver** pour vous connecter à la base PostgreSQL exposée via Docker.
