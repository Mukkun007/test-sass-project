# 📋 PLAN D'ACTION POUR VALIDER LE TEST TECHNIQUE

## 🎯 Vue d'ensemble

Ce document détaille **toutes les étapes obligatoires** pour valider le test technique Agentova.

---

## 📚 PHASE 1 : PRÉPARATION (AVANT L'ENREGISTREMENT)

### ✅ Étape 1.1 : Installation des outils

- [ ] **Cursor** : Installer et configurer
- [ ] **Node.js 18+** : Vérifier la version (`node --version`)
- [ ] **Firebase CLI** : Installer (`npm install -g firebase-tools`)
- [ ] **Git** : Configuré et fonctionnel

### ✅ Étape 1.2 : Formation et documentation

- [ ] **Vidéo de formation** : Regarder [Formation Cursor](https://www.youtube.com/watch?v=6fBHvKTYMCM)
- [ ] **Lire `CURSOR_LEARN.md`** : Maîtriser les automatismes essentiels
- [ ] **Lire `CONSIGNES_TEST_CANDIDAT.md`** : Comprendre tous les objectifs
- [ ] **Lire `.cursor/rules/*.mdc`** : Comprendre les règles du projet
- [ ] **Lire `docs/ARCHITECTURE.md`** : Comprendre l'architecture

### ✅ Étape 1.3 : Setup du projet

- [ ] **Fork GitHub** : Forker le repository sur votre profil personnel
- [ ] **Clone** : Cloner VOTRE fork (pas le projet original)
- [ ] **Installation dépendances client** : `cd client && npm install`
- [ ] **Installation dépendances serveur** : `cd server && npm install`
- [ ] **Test outil d'enregistrement** : Tester Screen Capture ou logiciel natif

### ✅ Étape 1.4 : Familiarisation

- [ ] **Pratiquer Cursor** : Sur un petit projet test
- [ ] **Tester modes Ask/Agent** : Comprendre la différence
- [ ] **Analyser le projet** : Explorer la structure, comprendre les patterns
- [ ] **Ne pas être en découverte** : Vous devez être prêt avant l'enregistrement

---

## 🎥 PHASE 2 : ENREGISTREMENT VIDÉO (OBLIGATOIRE)

### ⚠️ IMPORTANT : L'enregistrement est CRITIQUE

- [ ] **Démarrer l'enregistrement** : AVANT le premier clic
- [ ] **Enregistrement continu** : Pas de coupure, pas de montage
- [ ] **Qualité 1080p minimum** : Pour la lisibilité
- [ ] **Segments de 30 min max** : Créer plusieurs vidéos si nécessaire
- [ ] **Numéroter les segments** : "Partie 1/3", "Partie 2/3", etc.
- [ ] **Audio optionnel** : Vous pouvez couper le micro

### 📹 Ce qui doit être filmé

- [ ] **Tout le processus** : Du premier clic à la démonstration finale
- [ ] **Workflow Cursor** : Drag & drop, modes Ask/Agent
- [ ] **Débogage** : Méthodologie de résolution des erreurs
- [ ] **Modifications** : Chaque changement de code
- [ ] **Tests** : Démonstrations de fonctionnement

---

## 🚀 PHASE 3 : PARTIE 1 - FAIRE FONCTIONNER LE PROJET

### 🎯 Objectif
Avoir un projet entièrement fonctionnel où le client et le serveur communiquent correctement.

### ✅ Étape 3.1 : Setup initial dans Cursor

- [ ] **Drag & Drop** : `.cursor/rules/` dans Cursor
- [ ] **Drag & Drop** : `docs/` dans Cursor
- [ ] **Drag & Drop** : Fichiers clés (README, CONSIGNES, etc.)
- [ ] **Demander à Cursor** : "Analyse complète du projet et de son architecture"

### ✅ Étape 3.2 : Faire démarrer le client

- [ ] **Démarrer le client** : `cd client && npm run dev`
- [ ] **Vérifier les erreurs** : Analyser les erreurs de compilation
- [ ] **Corriger les erreurs** : Utiliser Cursor (mode Agent)
- [ ] **Vérifier l'accès** : `http://localhost:3000` accessible

### ✅ Étape 3.3 : Faire démarrer le serveur

- [ ] **Démarrer le serveur** : `cd server && npm run dev`
- [ ] **Vérifier les erreurs** : Analyser les erreurs de compilation
- [ ] **Corriger les erreurs** : Utiliser Cursor (mode Agent)
- [ ] **Vérifier Firebase** : Configuration Firebase correcte

### ✅ Étape 3.4 : Corriger textService côté CLIENT

**Objectif** : Respecter les règles `.cursor/rules/`

- [ ] **Analyser textService.ts client** : Identifier les non-conformités
- [ ] **Corriger les méthodes** : Passer en méthodes statiques
- [ ] **Utiliser callSecuredFunction** : Remplacer la simulation
- [ ] **Utiliser shared/types.ts** : Supprimer les types dupliqués
- [ ] **Respecter le pattern** : `workspaceId` premier paramètre

**Vérifications** :
- ✅ Méthodes statiques uniquement
- ✅ Utilisation de `callSecuredFunction()`
- ✅ Types depuis `shared/types.ts`
- ✅ Pas de simulation, vrais appels API

### ✅ Étape 3.5 : Corriger textService côté SERVEUR (si nécessaire)

- [ ] **Vérifier la conformité** : Le service serveur doit respecter les règles
- [ ] **Validation cascade** : 7 étapes respectées
- [ ] **Isolation workspace** : Toutes les requêtes isolées
- [ ] **Réponses standardisées** : `createResponseWithTokens()`

### ✅ Étape 3.6 : Connecter client et serveur

- [ ] **Tester la communication** : Vérifier que les appels fonctionnent
- [ ] **Tester createText** : Créer un texte depuis le client
- [ ] **Tester getTexts** : Récupérer les textes depuis le client
- [ ] **Vérifier les tokens** : Workspace tokens correctement gérés
- [ ] **Vérifier les erreurs** : Gestion d'erreurs fonctionnelle

### ✅ Étape 3.7 : Créer l'interface textService

- [ ] **Créer la vue** : Page/component pour gérer les textes
- [ ] **Intégrer dans dashboard** : Ajouter la vue au dashboard
- [ ] **Fonctionnalités** : 
  - [ ] Afficher la liste des textes
  - [ ] Créer un nouveau texte
  - [ ] Supprimer un texte (optionnel)
- [ ] **Utiliser React Query** : Hooks pour les données
- [ ] **Respecter les patterns** : Hooks, services, composants

### ✅ Étape 3.8 : Vérifier le build

- [ ] **Build client** : `cd client && npm run build`
- [ ] **Build serveur** : `cd server && npm run build`
- [ ] **Corriger les erreurs** : Si des erreurs de build
- [ ] **Vérifier les warnings** : Corriger si nécessaire

### ✅ Étape 3.9 : Tests finaux PARTIE 1

- [ ] **Client démarre** : Sans erreur
- [ ] **Serveur démarre** : Sans erreur
- [ ] **Application accessible** : `http://localhost:3000`
- [ ] **Communication fonctionnelle** : Client ↔ Serveur
- [ ] **Interface textService** : Vue fonctionnelle
- [ ] **Build réussi** : Client ET serveur
- [ ] **Architecture respectée** : Règles `.cursor/rules/` respectées

---

## 🚀 PHASE 4 : PARTIE 2 - CRÉER UN SERVICE DE COMMENTAIRES

### 🎯 Objectif
Développer un système complet de gestion des commentaires en respectant l'architecture existante.

### ✅ Étape 4.1 : Planification avec Cursor

- [ ] **Mode Ask** : Demander à Cursor de planifier la création du service
- [ ] **Comprendre les patterns** : Analyser textService comme référence
- [ ] **Identifier les fichiers** : Quels fichiers créer/modifier
- [ ] **Valider le plan** : S'assurer que tout est couvert

### ✅ Étape 4.2 : Créer les types partagés

- [ ] **Ajouter dans shared/types.ts** :
  - [ ] `CommentType` interface
  - [ ] `CreateCommentType` interface
  - [ ] Enum `CommentStatus` si nécessaire (obligatoire si valeurs fixes)
- [ ] **Respecter les règles** : Enums pour valeurs fixes, types partagés

### ✅ Étape 4.3 : Créer le Repository (Backend)

- [ ] **Créer `commentRepository.ts`** : Dans `server/db/repositories/`
- [ ] **Pattern singleton** : Lazy initialization
- [ ] **Isolation workspace** : Toutes les requêtes avec `workspace_id`
- [ ] **Méthodes CRUD** :
  - [ ] `create(workspaceId, data)`
  - [ ] `getByWorkspace(workspaceId)`
  - [ ] `getById(id, workspaceId)`
  - [ ] `delete(id, workspaceId)`
  - [ ] Optionnel : `update(id, workspaceId, data)`
- [ ] **Exporter dans index.ts** : `getCommentRepository()`

### ✅ Étape 4.4 : Créer le Service Backend (Firebase Functions)

- [ ] **Créer `commentService.ts`** : Dans `server/src/services/`
- [ ] **Fonctions Firebase** :
  - [ ] `createComment` (onCall)
  - [ ] `getComments` (onCall)
  - [ ] `deleteComment` (onCall)
  - [ ] Optionnel : `updateComment` (onCall)
- [ ] **Validation cascade** : 7 étapes obligatoires
  - [ ] 1️⃣ Validation auth
  - [ ] 2️⃣ Validation params
  - [ ] 3️⃣ Validation workspace + rôles
  - [ ] 4️⃣ Validation métier (si nécessaire)
  - [ ] 5️⃣ Logique métier (repository)
  - [ ] 6️⃣ Logging succès
  - [ ] 7️⃣ Réponse standardisée
- [ ] **Créer validation métier** : Fichier séparé si nécessaire
- [ ] **Exporter dans main.ts** : Exporter les fonctions

### ✅ Étape 4.5 : Créer le Service Frontend

- [ ] **Créer `commentService.ts`** : Dans `client/services/api/`
- [ ] **Méthodes statiques** : Toutes les méthodes statiques
- [ ] **Pattern obligatoire** :
  - [ ] `workspaceId` premier paramètre
  - [ ] Utilisation de `callSecuredFunction()`
  - [ ] Types depuis `shared/types.ts`
- [ ] **Méthodes CRUD** :
  - [ ] `static createComment(workspaceId, data)`
  - [ ] `static getComments(workspaceId)`
  - [ ] `static deleteComment(workspaceId, commentId)`
  - [ ] Optionnel : `static updateComment(workspaceId, commentId, data)`

### ✅ Étape 4.6 : Créer le Hook React Query

- [ ] **Créer `useComments.ts`** : Dans `client/hooks/`
- [ ] **React Query obligatoire** : Pas de useState/useEffect manuels
- [ ] **Pattern hook** :
  - [ ] `useWorkspaceContext()` pour workspaceId
  - [ ] `useQuery` pour récupérer les commentaires
  - [ ] `useMutation` pour créer/supprimer
  - [ ] `useCallback` pour handlers
  - [ ] Return organisé : Data / Loading / Actions / Utils
- [ ] **Query keys** : Utiliser `queryKeys.comments(workspaceId)`
- [ ] **Cache management** : Invalidation après mutations

### ✅ Étape 4.7 : Créer les Composants UI

- [ ] **Créer composant liste** : `CommentList.tsx`
- [ ] **Créer composant création** : `CommentForm.tsx` (optionnel)
- [ ] **Créer composant item** : `CommentItem.tsx` (optionnel)
- [ ] **Props typées** : Interfaces explicites
- [ ] **Utiliser React Icons** : Jamais de SVG en dur
- [ ] **Responsive** : Mobile-first design

### ✅ Étape 4.8 : Intégrer dans le Dashboard

- [ ] **Créer la page/vue** : Page pour gérer les commentaires
- [ ] **Intégrer dans dashboard** : Ajouter au menu/routes
- [ ] **Utiliser le hook** : `useComments()` dans la page
- [ ] **Fonctionnalités** :
  - [ ] Afficher la liste des commentaires
  - [ ] Créer un nouveau commentaire
  - [ ] Supprimer un commentaire
- [ ] **Gestion d'erreurs** : Afficher les erreurs correctement
- [ ] **Loading states** : Afficher les états de chargement

### ✅ Étape 4.9 : Tests finaux PARTIE 2

- [ ] **Service backend fonctionnel** : Toutes les fonctions Firebase
- [ ] **Service frontend fonctionnel** : Toutes les méthodes statiques
- [ ] **Repository fonctionnel** : Toutes les méthodes CRUD
- [ ] **Hook fonctionnel** : React Query fonctionnel
- [ ] **Interface utilisateur** : Page fonctionnelle
- [ ] **Architecture respectée** : Patterns Agentova respectés
- [ ] **Types partagés** : Dans `shared/types.ts`
- [ ] **Validation cascade** : 7 étapes respectées
- [ ] **Isolation workspace** : Toutes les requêtes isolées

---

## ⚡ PHASE 5 : AUTOMATISMES OBLIGATOIRES

### 🔥 Critères éliminatoires (à respecter absolument)

- [ ] **Drag & Drop** : Documentation + règles au début (déjà fait)
- [ ] **Communication globale** : Demandes complètes à Cursor (pas micro-étapes)
- [ ] **Review systématique** : Examiner chaque modification avant validation
- [ ] **Privilégier l'IA** : 90%+ du code généré par Cursor

### 🎯 Workflow attendu

- [ ] **Setup** : Drag & drop règles + docs ✅
- [ ] **Compréhension** : Analyser le projet avec Cursor ✅
- [ ] **Planification** : Mode Ask pour comprendre les problèmes ✅
- [ ] **Exécution** : Mode Agent pour générer les solutions ✅
- [ ] **Validation** : Review modification par modification ✅

---

## 📤 PHASE 6 : LIVRABLE FINAL

### 🔄 Repository GitHub

- [ ] **Fork créé** : Sur votre profil GitHub personnel
- [ ] **Toutes les modifications** : Sur votre fork
- [ ] **❌ PAS DE PULL REQUEST** : Vers le projet original
- [ ] **Repository public** : Accessible publiquement
- [ ] **Lien GitHub** : Prêt à être partagé

### 🎥 Enregistrement vidéo

- [ ] **Vidéos compressées** : 1080p minimum
- [ ] **Format MP4** : Préférence
- [ ] **WeTransfer** : Lien de téléchargement créé
- [ ] **Segments numérotés** : Si plusieurs vidéos
- [ ] **Processus complet** : Du début à la fin

### ⏰ Priorités

- [ ] **Priorité 1** : Enregistrement vidéo (plus important)
- [ ] **Priorité 2** : Repository GitHub avec code fonctionnel

---

## ✅ CHECKLIST FINALE DE VALIDATION

### Partie 1 : Faire fonctionner le projet

- [ ] Client démarre sans erreur
- [ ] Serveur démarre sans erreur
- [ ] Application accessible sur `http://localhost:3000`
- [ ] Communication client-serveur fonctionnelle
- [ ] Interface textService fonctionnelle
- [ ] Build réussi (client ET serveur)
- [ ] Architecture respectée (règles `.cursor/rules/`)

### Partie 2 : Service de commentaires

- [ ] Service complet (client ET serveur)
- [ ] Fonctionnalités CRUD (Créer, Lister, Supprimer)
- [ ] Types et validation (patterns Agentova)
- [ ] Interface utilisateur intégrée
- [ ] Architecture cohérente (mêmes patterns que textService)

### Automatismes

- [ ] Drag & drop documentation au début
- [ ] Communication globale avec Cursor
- [ ] Review systématique des modifications
- [ ] 90%+ du code généré par Cursor

### Livrable

- [ ] Fork GitHub avec code corrigé
- [ ] Enregistrement vidéo complet
- [ ] Lien WeTransfer avec vidéos
- [ ] Repository public et accessible

---

## 🚨 ERREURS ÉLIMINATOIRES (À ÉVITER ABSOLUMENT)

- ❌ **Coder manuellement** au lieu d'utiliser Cursor
- ❌ **Ne pas drag & drop** la documentation au début
- ❌ **Valider en bloc** sans examiner les modifications
- ❌ **Ne pas respecter** l'architecture et les patterns Agentova
- ❌ **Pas d'enregistrement vidéo** = test non validé

---

## 📊 RÉSUMÉ DES ÉTAPES

1. **PRÉPARATION** : Installation, formation, setup
2. **ENREGISTREMENT** : Démarrer avant le premier clic
3. **PARTIE 1** : Faire fonctionner le projet (textService)
4. **PARTIE 2** : Créer commentService
5. **AUTOMATISMES** : Respecter le workflow Cursor
6. **LIVRABLE** : Fork GitHub + vidéos

---

**Bonne chance ! 🚀**

*Suivez ce plan étape par étape pour maximiser vos chances de réussite.*

