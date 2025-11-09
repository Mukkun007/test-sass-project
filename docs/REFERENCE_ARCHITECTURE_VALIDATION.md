# 📚 RÉFÉRENCE ARCHITECTURE ET VALIDATION

## 🎯 Document de référence pour toutes les réponses

Ce document compile les informations critiques des fichiers `ARCHITECTURE.md` et `VALIDATION_PATTERN_EXAMPLE.md` pour servir de base à toutes les réponses et propositions de code.

---

## 🏗️ ARCHITECTURE DU PROJET DE TEST

### 📁 Structure générale

```
sass-project/
├── client/          # Frontend React/Next.js
├── server/          # Backend Firebase Functions  
├── shared/          # Types partagés
└── docs/            # Documentation
```

### 🎯 Frontend (client/)

#### Structure des dossiers
- **modules/**: Module de chat uniquement
- **services/api/**: Services Firebase (simulés)
- **hooks/**: React Query pour la gestion des données
- **components/**: Composants UI réutilisables

#### Caractéristiques
- Services statiques uniquement
- React Query pour toutes les données API
- Types centralisés dans `shared/types.ts`
- `workspace_id` premier paramètre partout

### 🔥 Backend (server/)

#### Structure des dossiers
- **src/services/**: Firebase Functions (`textService`)
- **db/repositories/**: Accès données (simulé en mémoire)
- **shared/**: Réponses et gestion d'erreurs standardisées

#### Caractéristiques
- Firebase Functions avec validation cascade
- Repositories avec isolation workspace
- Réponses standardisées
- Authentification simulée (structure respectée mais sans vraie sécurité)

### 📦 Types partagés (shared/)

- **types.ts**: Tous les types partagés entre client et serveur
- **Enums obligatoires**: Pas de string unions
- **Types centralisés**: Utiliser `shared/types.ts` uniquement

### 🔑 Règles importantes

1. **Services statiques**: Toutes les méthodes doivent être `static`
2. **Types centralisés**: Utiliser `shared/types.ts` uniquement
3. **workspace_id**: Premier paramètre partout
4. **Authentification simulée**: Structure respectée mais sans vraie sécurité

---

## 📝 PATTERNS DE VALIDATION

### ✅ Validation métier séparée

#### Structure du fichier de validation

**Emplacement**: `server/src/utils/validation/{domain}Validation.ts`

**Exemple**: `textValidation.ts`

```typescript
import { TextType, CreateTextType } from '../../../shared/types';

export interface TextValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateTextData(data: CreateTextType): TextValidationResult {
  const result: TextValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };

  // Validation contenu obligatoire
  if (!data.content || data.content.trim().length === 0) {
    result.errors.push('Le contenu est requis');
    result.valid = false;
  }

  // Validation longueur contenu
  if (data.content && data.content.length > 5000) {
    result.errors.push('Le contenu ne peut dépasser 5000 caractères');
    result.valid = false;
  }

  // Validation titre optionnel
  if (data.title && data.title.length > 200) {
    result.errors.push('Le titre ne peut dépasser 200 caractères');
    result.valid = false;
  }

  // Avertissement pour contenu court
  if (data.content && data.content.trim().length < 10) {
    result.warnings.push('Le contenu est très court');
  }

  return result;
}

export function validateTextUpdate(
  existingText: TextType,
  updateData: Partial<TextType>
): TextValidationResult {
  const result: TextValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };

  // Ne pas permettre de changer le workspace
  if (updateData.workspace_id && updateData.workspace_id !== existingText.workspace_id) {
    result.errors.push('Impossible de changer le workspace d\'un texte');
    result.valid = false;
  }

  return result;
}
```

### ✅ Usage dans Firebase Function

```typescript
export const createText = onCall({
  secrets: [databaseUrlProd, jwtWorkspaceSecret]
}, async (request) => {
  try {
    // 1. Auth validation (obligatoire en premier)
    const authResponse = validateAuth(request.auth);
    if (!isSuccess(authResponse)) return authResponse;
    const uid = authResponse.user;

    // 2. Extraction données
    const { workspaceToken, title, content } = request.data;

    // 3. Workspace validation
    const tokenValidation = await verifyWorkspaceToken(workspaceToken, uid, WORKSPACE_ROLES.EDITOR);
    const validationResult = isValidWorkspaceToken(tokenValidation);
    if (!isSuccess(validationResult)) return validationResult;
    const { workspace_id, workspace_tokens } = validationResult;
    const response = createResponseWithTokens(workspace_tokens);

    // 4. ✅ VALIDATION MÉTIER SÉPARÉE
    const textValidation = validateTextData({ title, content });
    if (!textValidation.valid) {
      return response.error(withDetails(ERRORS.INVALID_INPUT, {
        message: textValidation.errors.join(', '),
        errors: textValidation.errors
      }));
    }

    // 5. Logique métier
    const text = await getTextRepository().createText(workspace_id, title, content, uid);

    return response.success({ text });
    
  } catch (error) {
    logger.error('Erreur création texte:', error);
    return handleError(error);
  }
});
```

### ❌ Anti-Pattern à éviter

```typescript
// ❌ INTERDIT - Validation au mauvais endroit
export const badFunction = onCall({}, async (request) => {
  // ❌ Ne pas faire ça
  const validationResponse = validateRequiredFields(request.data, ['workspaceToken', 'content']);
  if (!isSuccess(validationResponse)) return validationResponse;
  
  // ❌ Validation métier mélangée avec validation technique
  if (!request.data.content || request.data.content.length === 0) {
    return { success: false, error: 'Contenu requis' };
  }
});
```

---

## 📋 PATTERN ENUMS OBLIGATOIRE

### ❌ Interdit

```typescript
type TextStatus = 'draft' | 'published' | 'archived';

interface Text {
  status: TextStatus;
}
```

### ✅ Obligatoire

```typescript
// Dans shared/types.ts
export enum TextStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

interface TextType {
  status: TextStatus;
}

// Usage
const text: TextType = {
  status: TextStatus.DRAFT // Traçable et autocomplété
};
```

---

## 🔐 PATTERN REPOSITORY SÉCURISÉ

### ❌ Dangereux

```typescript
async getTextById(id: string): Promise<TextType | null> {
  // DANGEREUX - Pas d'isolation workspace
  const result = await this.pool.query('SELECT * FROM texts WHERE id = $1', [id]);
  return result.rows[0] || null;
}
```

### ✅ Sécurisé

```typescript
async getTextById(id: string, workspaceId: string): Promise<TextType | null> {
  // SÉCURISÉ - Isolation workspace obligatoire
  const result = await this.pool.query(
    'SELECT * FROM texts WHERE id = $1 AND workspace_id = $2',
    [id, workspaceId]
  );
  return result.rows[0] || null;
}
```

**Règles repository**:
- `workspaceId` TOUJOURS en premier paramètre (après l'id si nécessaire)
- `WHERE workspace_id = $1` dans TOUTES les requêtes
- Paramètres préparés (protection SQL injection)
- Isolation complète entre workspaces

---

## 📁 SERVICES LOCAUX À UTILISER

### Dates

```typescript
// ✅ Utiliser le service existant
import { DateService } from '@/services/local/dateService';

const formattedDate = DateService.formatChatDate(new Date());
const sessionDate = DateService.formatSessionDate(session.created_at, true);
```

### Authentification

```typescript
// ✅ Utiliser le service existant
import { callSecuredFunction } from '@/services/local/authenticationService';

const result = await callSecuredFunction('createText', workspaceId, {
  title: 'Mon titre',
  content: 'Mon contenu'
});
```

### Icons

```typescript
// ✅ React Icons uniquement
import { RiImageAddLine } from 'react-icons/ri';

<RiImageAddLine className="w-5 h-5" />
```

---

## 🎯 CE QUE CES PATTERNS GARANTISSENT

1. **Séparation claire** : Validation technique vs métier
2. **Réutilisabilité** : Validation métier réutilisable
3. **Testabilité** : Fonctions pures facilement testables
4. **Maintenabilité** : Logique centralisée
5. **Sécurité** : Isolation workspace systématique
6. **Traçabilité** : Enums pour tous les états

---

## 🔄 ORDRE DE VALIDATION DANS FIREBASE FUNCTIONS

### Séquence obligatoire

1. **Validation auth** : `validateAuth(request.auth)`
2. **Extraction données** : Destructuration des paramètres
3. **Validation workspace** : `verifyWorkspaceToken()` avec rôles
4. **Validation métier** : Fichier de validation séparé
5. **Logique métier** : Appels repository
6. **Logging** : Journalisation des actions
7. **Réponse standardisée** : `createResponseWithTokens()`

### Exemple complet

```typescript
export const createText = onCall({
  secrets: [databaseUrlProd, jwtWorkspaceSecret]
}, async (request) => {
  try {
    // 1️⃣ Validation auth OBLIGATOIRE
    const authResponse = validateAuth(request.auth);
    if (!isSuccess(authResponse)) return authResponse;
    const uid = authResponse.user;

    // 2️⃣ Extraction et validation params
    const { workspaceToken, title, content } = request.data;
    const validationResponse = validateRequiredFields(request.data, [
      'workspaceToken', 'content'
    ]);
    if (!isSuccess(validationResponse)) return validationResponse;

    // 3️⃣ Validation workspace + rôles
    const tokenValidation = await verifyWorkspaceToken(
      workspaceToken, 
      uid, 
      WORKSPACE_ROLES.EDITOR
    );
    const validationResult = isValidWorkspaceToken(tokenValidation);
    if (!isSuccess(validationResult)) return validationResult;
    const { workspace_id, workspace_tokens } = validationResult;
    const response = createResponseWithTokens(workspace_tokens);

    // 4️⃣ Validation métier spécifique (fichier séparé)
    const textValidation = validateTextData({ title, content });
    if (!textValidation.valid) {
      return response.error(withDetails(ERRORS.INVALID_INPUT, {
        message: textValidation.errors.join(', '),
        errors: textValidation.errors
      }));
    }

    // 5️⃣ Logique métier via repository
    const textData = {
      content: content.trim(),
      title: title?.trim() || 'Sans titre',
      created_by: uid
    };
    const newText = await getTextRepository().create(workspace_id, textData);

    // 6️⃣ Logging succès
    logger.info(`Texte créé avec succès pour workspace ${workspace_id} par ${uid}`);

    // 7️⃣ Réponse standardisée
    return response.success({ text: newText });
    
  } catch (error) {
    logger.error(`Erreur dans createText:`, error);
    return handleError(error);
  }
});
```

---

## 📝 RÈGLES DE CRÉATION D'UN NOUVEAU SERVICE

### Backend (Firebase Function)

1. **Créer le fichier de validation** : `server/src/utils/validation/{domain}Validation.ts`
   - Interface `{Domain}ValidationResult`
   - Fonction `validate{Domain}Data()`
   - Fonction `validate{Domain}Update()` (si nécessaire)

2. **Créer le repository** : `server/db/repositories/{domain}Repository.ts`
   - Pattern singleton
   - Isolation workspace
   - Méthodes CRUD
   - Exporter dans `index.ts`

3. **Créer le service** : `server/src/services/{domain}Service.ts`
   - Firebase Functions (onCall)
   - Validation cascade (7 étapes)
   - Utiliser le fichier de validation
   - Exporter dans `main.ts`

### Frontend

1. **Ajouter les types** : `shared/types.ts`
   - Interface `{Domain}Type`
   - Interface `Create{Domain}Type`
   - Enum si valeurs fixes

2. **Créer le service** : `client/services/api/{domain}Service.ts`
   - Méthodes statiques uniquement
   - `workspaceId` premier paramètre
   - Utiliser `callSecuredFunction()`
   - Types depuis `shared/types.ts`

3. **Créer le hook** : `client/hooks/use{Domain}.ts`
   - React Query obligatoire
   - `useWorkspaceContext()` pour workspaceId
   - Return organisé
   - Query keys dans `queryKeys.ts`

4. **Créer les composants** : `client/components/{domain}/`
   - Props typées
   - Utiliser React Icons
   - Responsive design

---

## 🚨 POINTS CRITIQUES À RESPECTER

### Architecture

- ✅ Services statiques uniquement (frontend)
- ✅ Types centralisés dans `shared/types.ts`
- ✅ `workspace_id` premier paramètre partout
- ✅ Authentification simulée (structure respectée)

### Validation

- ✅ Validation métier dans fichier séparé
- ✅ Validation cascade (7 étapes) dans Firebase Functions
- ✅ Isolation workspace dans toutes les requêtes
- ✅ Enums obligatoires (jamais de string unions)

### Services

- ✅ Utiliser `callSecuredFunction()` pour appels API
- ✅ Utiliser `DateService` pour dates
- ✅ Utiliser React Icons (jamais de SVG en dur)
- ✅ React Query pour toutes les données API

---

## 📚 RÉFÉRENCES

- **Architecture** : `docs/ARCHITECTURE.md`
- **Validation** : `docs/VALIDATION_PATTERN_EXAMPLE.md`
- **Règles complètes** : `.cursor/rules/*.mdc`
- **Analyse projet** : `docs/ANALYSE_PROJET_COMPLETE.md`
- **Plan d'action** : `docs/PLAN_ACTION_TEST.md`

---

**Ce document sert de référence pour toutes les réponses et propositions de code.**

