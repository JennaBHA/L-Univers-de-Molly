# 🛍️ Application Web « Shop »

![Build](https://img.shields.io/github/actions/workflow/status/<TON_UTILISATEUR>/<TON_REPO>/ci.yml?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&style=for-the-badge)
![Backend](https://img.shields.io/badge/Backend-SpringBoot-6DB33F?logo=springboot&style=for-the-badge)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql&style=for-the-badge)
![DevOps](https://img.shields.io/badge/Docker-CI%2FCD-blue?logo=docker&style=for-the-badge)

---

## 📚 Sommaire

1. [📖 Description](#-description)
2. [🎯 Objectifs](#-objectifs)
3. [👥 Acteurs](#-acteurs)
4. [⚙️ Stack Technique](#️-stack-technique)
5. [🧩 Architecture](#-architecture)
6. [🗄️ Schéma de données](#️-schéma-de-données)
7. [🚀 Roadmap de Développement](#-roadmap-de-développement)
8. [🔐 Sécurité et conformité](#-sécurité-et-conformité)
9. [🧪 Tests](#-tests)
10. [☁️ Déploiement](#️-déploiement)
11. [📦 Installation (local)](#-installation-local)
12. [📬 API REST (exemples)](#-api-rest-exemples)
13. [💡 Améliorations futures](#-améliorations-futures)
14. [🤝 Contribuer](#-contribuer)
15. [🧠 Auteurs & Crédits](#-auteurs--crédits)

---

## 📖 Description

**Shop** est une application web e-commerce moderne permettant aux utilisateurs de :

- parcourir les produits d’une boutique en ligne 🛒,
- gérer leur panier et passer commande 📦,
- simuler ou effectuer un paiement sécurisé 💳,
- enregistrer leurs adresses de livraison 🏠.

Un **espace administrateur** offre la gestion du catalogue produits, des stocks, des commandes et des utilisateurs.

---

## 🎯 Objectifs

Développer une solution **e-commerce complète, modulaire et sécurisée**, intégrant :

- 🔐 Authentification JWT (Spring Security)
- 🧱 Rôles et permissions (USER / ADMIN)
- 🛍️ Panier et commandes connectés à la BDD
- 🖥️ Back-office administrateur complet
- 🚀 Pipeline CI/CD et conteneurisation Docker

---

## 👥 Acteurs

| Acteur                | Description                                              |
| --------------------- | -------------------------------------------------------- |
| 👤 **Visiteur**       | Consulte le catalogue produits                           |
| 🧑‍💻 **Utilisateur**    | Gère son panier, ses commandes et adresses               |
| 🛠️ **Administrateur** | Gère les produits, catégories, utilisateurs et commandes |

---

## ⚙️ Stack Technique

### 🧠 Backend — _Spring Boot_

- Spring Web, Spring Data JPA, Spring Security
- PostgreSQL + Flyway (migrations)
- Lombok, Validation API
- JWT Authentication
- Docker & CI/CD

### 🎨 Frontend — _React (Vite)_

- React Router
- Redux Toolkit / Context API
- Tailwind CSS
- Axios
- Jest / Cypress pour les tests

---

## 🧩 Architecture

# 🛍️ Application Web « Shop »

![Build](https://img.shields.io/github/actions/workflow/status/<TON_UTILISATEUR>/<TON_REPO>/ci.yml?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&style=for-the-badge)
![Backend](https://img.shields.io/badge/Backend-SpringBoot-6DB33F?logo=springboot&style=for-the-badge)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql&style=for-the-badge)
![DevOps](https://img.shields.io/badge/Docker-CI%2FCD-blue?logo=docker&style=for-the-badge)

---

## 📚 Sommaire

1. [📖 Description](#-description)
2. [🎯 Objectifs](#-objectifs)
3. [👥 Acteurs](#-acteurs)
4. [⚙️ Stack Technique](#️-stack-technique)
5. [🧩 Architecture](#-architecture)
6. [🗄️ Schéma de données](#️-schéma-de-données)
7. [🚀 Roadmap de Développement](#-roadmap-de-développement)
8. [🔐 Sécurité et conformité](#-sécurité-et-conformité)
9. [🧪 Tests](#-tests)
10. [☁️ Déploiement](#️-déploiement)
11. [📦 Installation (local)](#-installation-local)
12. [📬 API REST (exemples)](#-api-rest-exemples)
13. [💡 Améliorations futures](#-améliorations-futures)
14. [🤝 Contribuer](#-contribuer)
15. [🧠 Auteurs & Crédits](#-auteurs--crédits)

---

## 📖 Description

**Shop** est une application web e-commerce moderne permettant aux utilisateurs de :

- parcourir les produits d’une boutique en ligne 🛒,
- gérer leur panier et passer commande 📦,
- simuler ou effectuer un paiement sécurisé 💳,
- enregistrer leurs adresses de livraison 🏠.

Un **espace administrateur** offre la gestion du catalogue produits, des stocks, des commandes et des utilisateurs.

---

## 🎯 Objectifs

Développer une solution **e-commerce complète, modulaire et sécurisée**, intégrant :

- 🔐 Authentification JWT (Spring Security)
- 🧱 Rôles et permissions (USER / ADMIN)
- 🛍️ Panier et commandes connectés à la BDD
- 🖥️ Back-office administrateur complet
- 🚀 Pipeline CI/CD et conteneurisation Docker

---

## 👥 Acteurs

| Acteur                | Description                                              |
| --------------------- | -------------------------------------------------------- |
| 👤 **Visiteur**       | Consulte le catalogue produits                           |
| 🧑‍💻 **Utilisateur**    | Gère son panier, ses commandes et adresses               |
| 🛠️ **Administrateur** | Gère les produits, catégories, utilisateurs et commandes |

---

## ⚙️ Stack Technique

### 🧠 Backend — _Spring Boot_

- Spring Web, Spring Data JPA, Spring Security
- PostgreSQL + Flyway (migrations)
- Lombok, Validation API
- JWT Authentication
- Docker & CI/CD

### 🎨 Frontend — _React (Vite)_

- React Router
- Redux Toolkit / Context API
- Tailwind CSS
- Axios
- Jest / Cypress pour les tests

---

## 🧩 Architecture

/shop-backend
┣ src/main/java/com/shop
┃ ┣ entity/
┃ ┣ repository/
┃ ┣ service/
┃ ┣ controller/
┃ ┣ dto/
┃ ┣ config/
┃ ┗ security/
┣ src/test/
┗ application.properties

/shop-frontend
┣ src/
┃ ┣ components/
┃ ┣ pages/
┃ ┣ services/
┃ ┣ store/
┃ ┗ utils/
┣ public/
┗ vite.config.js

---

## 🗄️ Schéma de données

| Table           | Champs principaux                                           |
| --------------- | ----------------------------------------------------------- |
| **users**       | id, email, password_hash, role, name                        |
| **categories**  | id, name                                                    |
| **products**    | id, name, description, price, stock, image_url, category_id |
| **orders**      | id, user_id, total_price, status, created_at, address_id    |
| **order_items** | id, order_id, product_id, quantity, price                   |
| **addresses**   | id, user_id, line1, city, postal_code, country              |

---

## 🚀 Roadmap de Développement

| Étape                       | Description                            | Technologies            |
| --------------------------- | -------------------------------------- | ----------------------- |
| **1. Initialisation**       | Création du projet, Docker, Git        | Vite, Spring Initializr |
| **2. Authentification**     | JWT, entités, migrations               | Spring Security         |
| **3. Catalogue produits**   | Filtres, pagination, recherche         | React, Axios            |
| **4. Panier d’achat**       | Gestion des articles et totaux         | Redux Toolkit           |
| **5. Commandes & adresses** | CRUD adresses, validation panier       | REST API                |
| **6. Back-office admin**    | CRUD produits, utilisateurs, commandes | React Admin             |
| **7. UI/UX Responsive**     | Palette, animations, responsive design | Tailwind CSS            |
| **8. Tests**                | JUnit, Jest, Cypress                   | CI                      |
| **9. CI/CD & Déploiement**  | Pipeline GitHub Actions                | Docker Compose          |
| **10. Améliorations**       | Stripe, SEO, Analytics                 | Stripe API              |

---

## 🔐 Sécurité et conformité

- Authentification **JWT**
- Hachage des mots de passe avec **bcrypt**
- Rôles **USER / ADMIN**
- Conformité **RGPD** (suppression des comptes)
- HTTPS obligatoire en production
- Logs & audit pour les actions d’administration

---

## 🧪 Tests

| Type                     | Outils                       |
| ------------------------ | ---------------------------- |
| **Unitaires (Backend)**  | JUnit + Mockito              |
| **Unitaires (Frontend)** | Jest + React Testing Library |
| **Intégration API**      | MockMvc                      |
| **E2E (front)**          | Cypress                      |

---

## ☁️ Déploiement

- **Docker Compose** : front + back + PostgreSQL
- **CI/CD** : GitHub Actions ou GitLab CI
- **Environnements** :
  - Backend → Railway / DigitalOcean / Render
  - Frontend → Vercel / Netlify
  - DB → PostgreSQL managée
- **Variables d’environnement** : JWT_SECRET, DB_URL, API_BASE_URL, etc.

---

## 📦 Installation (local)

### 🧩 Backend

```bash
cd shop-backend
mvn spring-boot:run
```

### ⚛️ Frontend

```bash
cd shop-frontend
npm install
npm run dev
```

### 🐳 Docker

```bash
docker-compose up -d
```

📍 Frontend → http://localhost:5173
📍 Backend → http://localhost:8080/api

## 💡 Améliorations futures

#### 💳 Paiement réel via Stripe / PayPal

#### 🔍 Recherche avancée via Elasticsearch

#### ✉️ Emails transactionnels & notifications push

#### 📊 Tableau de bord analytics

#### 🧭 SEO & sitemap automatique

## 🧠 Auteurs & Crédits

#### 📆 Planning & conception : 9 semaines — “L’Univers de Molly” & “Application Web Shop”

#### 📘 Technos : Spring Boot • React • PostgreSQL • Tailwind • Docker
