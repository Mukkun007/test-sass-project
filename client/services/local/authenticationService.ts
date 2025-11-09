// ========================== SERVICE URLS ==========================

export const SERVICE_URL = {
  FIREBASE: 'http://localhost:5001/demo-project/us-central1',
  FASTAPI: 'http://127.0.0.1:8080',
  APP: 'http://localhost:3000'
};

// ========================== TYPES ==========================

export interface WorkspaceToken {
  role: string;
  token: string;
}

export type WorkspaceTokenMap = Record<string, WorkspaceToken>;

// ========================== DONNÉES FANTÔMES ==========================

const MOCK_WORKSPACE_TOKENS: WorkspaceTokenMap = {
  'demo-workspace-123': {
    role: 'admin',
    token: 'demo-token-workspace-123'
  },
  'demo-workspace-456': {
    role: 'editor',
    token: 'demo-token-workspace-456'
  }
};

// ========================== FONCTIONS FANTÔMES ==========================

/**
 * Récupère le token d'authentification Firebase
 * VERSION DEMO - TOUJOURS MÊME TOKEN
 */
export async function getIdToken(): Promise<string> {
  // FONCTION VIDE - Toujours même token
  return 'demo-token-123456789';
}

/**
 * Stocke les tokens workspace
 * VERSION DEMO - FONCTION VIDE
 */
export function storeTokens(tokens: WorkspaceTokenMap): void {
  // FONCTION VIDE - Ne fait rien
}

/**
 * Récupère les tokens workspace stockés
 * VERSION DEMO - TOUJOURS MÊMES TOKENS
 */
export function getStoredTokens(): WorkspaceTokenMap {
  // FONCTION VIDE - Toujours retourner les mêmes tokens
  return MOCK_WORKSPACE_TOKENS;
}

/**
 * Appelle une fonction Firebase sécurisée
 * VERSION DEMO - TOUJOURS SUCCESS
 */
export async function callSecuredFunction<T>(
  functionName: string,
  workspaceId: string,
  data?: any
): Promise<T> {
  // FONCTION VIDE - Toujours simuler un appel réussi
  return await callFirebaseFunction<T>(functionName, data);
}

/**
 * Appelle une fonction Firebase avec SSE
 * VERSION DEMO - SIMULATION SIMPLE
 */
export async function callSecuredSSEFunction(
  functionName: string,
  workspaceId: string,
  data?: any
): Promise<Response> {
  // FONCTION VIDE - Simuler un appel SSE simple
  return await fetch(`${SERVICE_URL.FASTAPI}/${functionName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      workspace_id: workspaceId,
      ...data
    })
  });
}

/**
 * Fonction Firebase fantôme
 * VERSION DEMO - TOUJOURS SUCCESS
 */
async function callFirebaseFunction<T>(
  functionName: string,
  data: any
): Promise<T> {
  // FONCTION VIDE - Toujours retourner success
  return {
    success: true,
    data: null,
    workspace_tokens: MOCK_WORKSPACE_TOKENS
  } as T;
}

/**
 * Déconnecte l'utilisateur
 * VERSION DEMO - FONCTION VIDE
 */
export async function logoutUser(): Promise<void> {
  // FONCTION VIDE - Ne fait rien
}

/**
 * Nettoie tout le cache de l'application
 * VERSION DEMO - FONCTION VIDE
 */
export function clearAllCache(): void {
  // FONCTION VIDE - Ne fait rien
}