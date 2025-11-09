# 📊 ANALYSE COMPLÈTE DU PROJET AGENTOVA

## 🎯 Vue d'ensemble du projet

**Agentova** est un projet SaaS multi-tenant de gestion d'agents IA conversationnels avec intégrations sociales (Facebook, Instagram, WhatsApp). Le projet suit une architecture moderne full-stack avec séparation stricte client/serveur et patterns de développement très structurés.

### 🏗️ Architecture générale

```
test-sass-project/
├── client/          # Frontend Next.js 15 + React 19
├── server/          # Backend Firebase Functions + PostgreSQL
├── shared/          # Types partagés entre client et serveur
├── .cursor/         # Règles et documentation Cursor (CRITIQUE)
└── docs/            # Documentation architecture
```

---

## 📁 STRUCTURE DÉTAILLÉE

### 1️⃣ **CLIENT** (`client/`)

#### Technologies principales
- **Next.js 15.3** (App Router)
- **React 19.1** 
- **TypeScript 5.8**
- **React Query** (TanStack Query) pour gestion d'état
- **Tailwind CSS** pour le styling
- **Firebase SDK** pour l'authentification

#### Structure des dossiers

```
client/
├── app/                    # Routes Next.js (App Router)
│   └── dashboard/          # Pages du tableau de bord
│       ├── brain-ai/
│       ├── onboarding/
│       ├── power-ups/
│       ├── roadmap/
│       └── settings/
├── modules/                # 🎯 Mini-apps complètes (architecture modulaire)
│   ├── core/
│   │   ├── BaseModule.tsx      # Interface de base
│   │   └── ModuleRegistry.ts   # Registre centralisé
│   └── ChatModule.tsx          # Module Chat IA
├── components/             # Composants réutilisables par domaine
├── services/               # Services API et locaux
│   ├── api/                # Services connectés aux APIs
│   │   ├── firebase/       # Configuration Firebase
│   │   └── textService.ts  # Service textes (demo)
│   └── local/              # Services utilitaires locaux
│       └── authenticationService.ts
├── contexts/               # Contexts React
│   ├── AuthContext.tsx     # Authentification
│   └── WorkspaceContext.tsx # Workspace courant
├── hooks/                  # Hooks React Query personnalisés
├── query/                  # Clés de cache React Query
│   └── queryKeys.ts
└── data/                   # Données statiques
    └── ai-employees.ts
```

#### Patterns frontend obligatoires

1. **Services** : Classes avec méthodes statiques uniquement
   - `workspaceId` toujours en premier paramètre
   - Utilisation de `callSecuredFunction()` pour appels API

2. **Hooks** : React Query obligatoire (pas de useState/useEffect manuels)
   - Return organisé : Data / Loading states / Actions / Utils
   - `useCallback` pour tous les handlers
   - Clés de cache via `queryKeys.*`

3. **Contexts** : 
   - Setters stabilisés avec `useCallback`
   - Valeurs stabilisées avec `useMemo`

4. **Modules** : Architecture modulaire
   - Chaque module = mini-app complète
   - Registry centralisé des modules
   - Routes dynamiques : `/dashboard/employees/[name]/[module]`

---

### 2️⃣ **SERVER** (`server/`)

#### Technologies principales
- **Firebase Functions v2** (onCall)
- **PostgreSQL** via `pg` (pool de connexions)
- **TypeScript 5.8**
- **Prisma** (mentionné dans l'architecture mais pas encore configuré)

#### Structure des dossiers

```
server/
├── src/
│   ├── services/           # Firebase Functions
│   │   └── textService.ts  # Service textes (demo)
│   ├── utils/              # Utilitaires transversaux
│   │   ├── authWorkspace.ts    # Validation workspace tokens
│   │   └── validation.ts       # Validation centralisée
│   ├── routes/             # Routes HTTP et webhooks (non présent)
│   ├── triggers/           # Triggers Firebase (non présent)
│   └── main.ts             # Configuration principale
├── db/
│   ├── repositories/       # Pattern Repository
│   │   ├── index.ts        # Export centralisé
│   │   └── textRepository.ts
│   └── config.ts           # Configuration PostgreSQL
├── shared/                 # Types backend spécifiques
│   ├── responses.ts        # Réponses standardisées
│   └── types/
│       └── errors.ts       # Gestion d'erreurs
└── index.ts                # Point d'entrée
```

#### Patterns backend obligatoires

1. **Firebase Functions** : Validation cascade (7 étapes)
   ```
   1️⃣ Validation auth (validateAuth)
   2️⃣ Validation params (validateRequiredFields)
   3️⃣ Validation workspace (verifyWorkspaceToken)
   4️⃣ Validation métier (spécifique)
   5️⃣ Logique métier (repository)
   6️⃣ Logging succès
   7️⃣ Réponse standardisée (createResponseWithTokens)
   ```

2. **Repositories** : Pattern singleton
   - Pool PostgreSQL partagé
   - Isolation workspace obligatoire (`WHERE workspace_id = $1`)
   - Lazy initialization
   - Paramètres préparés (protection SQL injection)

3. **Sécurité** :
   - `validateAuth()` toujours en premier
   - `verifyWorkspaceToken()` avec rôles (ADMIN/EDITOR)
   - Secrets Firebase pour clés sensibles
   - Isolation workspace dans toutes les requêtes

---

### 3️⃣ **SHARED** (`shared/`)

Types partagés entre client et serveur.

```typescript
shared/
├── types.ts        # Types communs (TextType, Workspace, Message, etc.)
└── colors.ts       # Constantes de couleurs
```

#### Règles strictes
- ✅ **TOUS les types partagés** dans `shared/types.ts`
- ✅ **Enums obligatoires** (jamais de string unions)
- ❌ **JAMAIS de types** dans les repositories
- ✅ **Types services** seulement si spécifiques au service

---

## 🔥 RÈGLES CRITIQUES DU PROJET

### 📋 Fichiers de règles (`.cursor/rules/`)

Le projet contient **4 fichiers de règles** qui doivent être respectés à 100% :

1. **`agentova-backend.mdc`** (alwaysApply: true)
   - Patterns Firebase Functions
   - Pattern Repository
   - Validation cascade
   - Sécurité workspace-centric
   - Gestion d'erreurs

2. **`agentova-frontend.mdc`** (alwaysApply: true)
   - Patterns Services (statiques)
   - Patterns Hooks (React Query)
   - Patterns Composants
   - Patterns Contexts
   - Services spéciaux (SessionService IA, AuthenticationService)

3. **`agentova-global.mdc`** (alwaysApply: true)
   - Workspace-centric rules
   - Enums obligatoires
   - Types dans shared/types.ts
   - Services locaux à utiliser
   - Conventions de nommage

4. **`README.mdc`** (alwaysApply: false)
   - Guide d'utilisation du système de règles
   - Auto-vérification IA avec `@ai-verify`

### 🚨 Règles absolues (violations bloquantes)

#### 1. **ENUM OBLIGATOIRE - JAMAIS DE STRINGS**
```typescript
// ❌ INTERDIT
type Status = 'pending' | 'completed';

// ✅ OBLIGATOIRE
enum Status {
  PENDING = 'pending',
  COMPLETED = 'completed'
}
```

#### 2. **WORKSPACE-CENTRIC**
- `workspace_id` TOUJOURS en premier paramètre
- `WHERE workspace_id = $1` dans TOUTES les requêtes
- Token validation à chaque appel API
- Isolation complète entre workspaces

#### 3. **TYPES DANS SHARED/TYPES.TS**
- Tous les types partagés dans `shared/types.ts`
- Types services seulement si spécifiques
- JAMAIS de types dans repositories

#### 4. **SERVICES LOCAUX À UTILISER**
- `DateService` pour toutes les dates
- `FileProcessingService` pour fichiers
- `authenticationService` pour appels API
- React Icons (jamais de SVG en dur)

---

## 🎯 PATTERNS DÉTECTÉS DANS LE CODE EXISTANT

### ✅ Backend (textService.ts)

**Service conforme aux règles** :
- ✅ Validation cascade complète (7 étapes)
- ✅ Isolation workspace
- ✅ Rôles appropriés (EDITOR pour create/get, ADMIN pour delete)
- ✅ Réponses standardisées avec tokens
- ✅ Logging structuré

**Repository conforme** :
- ✅ Pattern singleton avec lazy initialization
- ✅ Isolation workspace dans toutes les requêtes
- ✅ Paramètres préparés
- ✅ Types dans shared/types.ts (import)

### ⚠️ Frontend (textService.ts)

**Service NON conforme** :
- ❌ Méthodes d'instance au lieu de statiques
- ❌ Pas d'utilisation de `callSecuredFunction()`
- ❌ Simulation au lieu d'appels API réels
- ❌ Types dupliqués au lieu d'utiliser shared/types.ts

**À corriger selon les règles** :
```typescript
// ✅ Pattern correct
export class TextService {
  static async createText(
    workspaceId: string,  // Premier paramètre
    data: CreateTextRequest
  ): Promise<TextType> {
    return await callSecuredFunction<TextResponse>(
      'createText',
      workspaceId,
      data
    );
  }
}
```

---

## 🔍 POINTS D'ATTENTION DU PROJET DE TEST

### ⚠️ État actuel

1. **Backend** : ✅ Conforme aux règles
   - Service textService bien structuré
   - Repository correctement implémenté
   - Validation cascade respectée

2. **Frontend** : ❌ Non conforme
   - Service textService en mode "fantôme" (simulation)
   - Pas d'appels API réels
   - Types dupliqués
   - Pas de hooks React Query

3. **Types** : ⚠️ Partiellement conforme
   - Types dans shared/types.ts ✅
   - Mais duplication dans textService.ts frontend ❌

### 🎯 Objectifs du test

1. **PARTIE 1** : Faire fonctionner le projet
   - Corriger textService côté client
   - Connecter client et serveur
   - Respecter l'architecture

2. **PARTIE 2** : Créer commentService
   - Service complet CRUD
   - Respect des patterns Agentova
   - Types et validation

---

## 📊 ARCHITECTURE MODULAIRE

### Concept des modules

Le frontend utilise une **architecture modulaire** où chaque module = mini-app complète :

```
modules/
├── core/
│   ├── BaseModule.tsx      # Interface standardisée
│   └── ModuleRegistry.ts   # Registry centralisé
└── ChatModule.tsx          # Module Chat IA
```

**Routes dynamiques** :
- `/dashboard/employees/[name]/[module]`
- Module chargé dynamiquement via Registry

**Modules prévus** (selon les règles) :
- `ChatModule` : Chat IA
- `SavCustomAgentModule` : Agent SAV
- `SalesCustomAgentModule` : Agent Sales
- `ImageGenerationModule` : Génération d'images
- `CampaignModule` : Campagnes marketing
- `ReplyModule` : Réponses automatiques

---

## 🔐 SÉCURITÉ WORKSPACE-CENTRIC

### Principe fondamental

**Tout est isolé par workspace** :
- Chaque utilisateur appartient à un/des workspace(s)
- Chaque workspace = tenant séparé
- Aucune fuite de données entre workspaces

### Validation cascade

1. **Auth Firebase** → Vérifier que l'utilisateur est authentifié
2. **Params** → Vérifier les champs requis
3. **Workspace Token** → Vérifier l'accès au workspace + rôles
4. **Métier** → Validation spécifique au domaine
5. **Logique** → Exécution avec isolation workspace
6. **Logging** → Journalisation des actions
7. **Réponse** → Retour standardisé avec tokens

### Rôles workspace

- **ADMIN** : Accès complet (suppression, configuration)
- **EDITOR** : Création, lecture, modification

---

## 🛠️ SERVICES SPÉCIAUX

### 1. AuthenticationService

**Rôle** : Wrapper sécurisé pour appels Firebase
- Firewall anti-spam (10 req/10s par endpoint)
- Gestion des tokens workspace
- Auto-logout sur erreurs INVALID_TOKEN
- Multi-environment (dev/staging/prod)

### 2. SessionService (IA)

**Rôle** : Service spécialisé pour l'IA
- Connexion directe FastAPI (pas Firebase)
- Streaming SSE pour réponses temps réel
- Gestion des messages partiels
- Timeout 20s + gestion erreurs

---

## 📝 CONVENTIONS DE CODE

### Nommage

- **Services** : `{domain}Service.ts` (ex: `textService.ts`)
- **Hooks** : `use{Domain}.ts` (ex: `useTexts.ts`)
- **Components** : `PascalCase.tsx` (ex: `TextList.tsx`)
- **Repositories** : `{entity}Repository.ts` (ex: `textRepository.ts`)
- **Types** : `PascalCase` pour interfaces
- **Constants** : `UPPER_SNAKE_CASE`

### TypeScript

- ✅ Props TOUJOURS typées avec interface explicite
- ✅ Pas de `any` (utiliser `unknown` si nécessaire)
- ✅ Types de retour explicites pour fonctions publiques
- ✅ Generics pour réutilisabilité

---

## 🚀 WORKFLOW DE DÉVELOPPEMENT

### 1. Setup initial

```bash
# Client
cd client
npm install
npm run dev

# Serveur
cd server
npm install
npm run dev
```

### 2. Utilisation Cursor

1. **Drag & Drop** : `.cursor/rules/` + `docs/` au début
2. **Compréhension** : Demander à Cursor d'analyser le projet
3. **Planification** : Mode Ask pour comprendre les problèmes
4. **Exécution** : Mode Agent pour générer les solutions
5. **Validation** : Review modification par modification

### 3. Checklist pré-développement

1. ✅ Enum check - Créer enums pour toutes valeurs fixes
2. ✅ Types check - Ajouter dans shared/types.ts
3. ✅ Services check - Vérifier services locaux existants
4. ✅ Date check - Utiliser DateService pour dates
5. ✅ Icon check - Utiliser React Icons
6. ✅ Validation check - Créer fichier validation séparé
7. ✅ Repository check - Isolation workspace obligatoire

---

## 📚 DOCUMENTATION DISPONIBLE

1. **`docs/ARCHITECTURE.md`** : Vue d'ensemble
2. **`server/ARCHITECTURE.md`** : Architecture backend détaillée
3. **`docs/VALIDATION_PATTERN_EXAMPLE.md`** : Exemples de validation
4. **`.cursor/rules/*.mdc`** : Règles complètes (CRITIQUE)

---

## 🎯 RÉSUMÉ DES POINTS CRITIQUES

### ✅ À respecter absolument

1. **Workspace-centric** : Tout isolé par workspace
2. **Enums** : Jamais de string unions
3. **Types** : Dans shared/types.ts uniquement
4. **Validation cascade** : 7 étapes obligatoires
5. **Services statiques** : Méthodes statiques uniquement
6. **React Query** : Pas de useState/useEffect manuels
7. **Repository singleton** : Pattern lazy initialization
8. **Isolation workspace** : WHERE workspace_id = $1 partout

### ❌ À éviter absolument

1. **Types any** : Utiliser unknown si nécessaire
2. **Variables non utilisées** : Supprimer imports/variables inutiles
3. **Hardcoding** : Secrets Firebase, pas de clés en dur
4. **Concaténation SQL** : Paramètres préparés uniquement
5. **Services d'instance** : Statiques uniquement
6. **État manuel API** : React Query obligatoire
7. **SVG en dur** : React Icons uniquement
8. **Fonctions de date locales** : DateService centralisé

---

## 🔄 PROCHAINES ÉTAPES RECOMMANDÉES

1. **Lire les règles** : `.cursor/rules/*.mdc` attentivement
2. **Analyser le code existant** : Comprendre les patterns
3. **Corriger textService frontend** : Respecter les règles
4. **Connecter client-serveur** : Faire fonctionner l'ensemble
5. **Créer commentService** : Appliquer les patterns appris

---

**Bon développement ! 🚀**

*Cette analyse vous donne une vue d'ensemble complète. Les règles dans `.cursor/rules/` sont la référence absolue pour tout développement.*

