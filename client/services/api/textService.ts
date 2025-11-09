import { callSecuredFunction } from '@/services/local/authenticationService';

/**
 * Service de gestion des textes côté client
 * VERSION DEMO - Service de test pour enregistrer et récupérer des textes
 */

export interface TextType {
  id: string;
  workspace_id: string;
  title: string;
  content: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTextRequest {
  title?: string;
  content: string;
}

export interface TextsResponse {
  texts: TextType[];
}

export interface TextResponse {
  text: TextType;
}

export class TextService {
  /**
   * Créer un nouveau texte
   * VERSION DEMO - Fonction fantôme qui simule la création
   */
  async createText(
    workspaceId: string,
    data: CreateTextRequest
  ): Promise<TextType> {
    try {
      // FONCTION FANTÔME - Simule un appel API
      console.log('[DEMO] Création texte:', data);
      
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Retourner un texte simulé
      const mockText: TextType = {
        id: `text-${Date.now()}`,
        workspace_id: workspaceId,
        title: data.title || 'Sans titre',
        content: data.content,
        created_by: 'demo-user-123',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return mockText;
    } catch (error) {
      console.error('Erreur création texte:', error);
      throw error;
    }
  }

  /**
   * Récupérer tous les textes d'un workspace
   * VERSION DEMO - Fonction fantôme qui simule la récupération
   */
  static async getTexts(workspaceId: string): Promise<TextType[]> {
    try {
      // FONCTION FANTÔME - Simule un appel API
      console.log('[DEMO] Récupération textes pour workspace:', workspaceId);
      
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Retourner des textes simulés
      const mockTexts: TextType[] = [
        {
          id: 'text-1',
          workspace_id: workspaceId,
          title: 'Premier texte de démonstration',
          content: 'Ceci est un exemple de texte enregistré dans le système. Il sert à tester l\'architecture et les patterns de développement.',
          created_by: 'demo-user-123',
          created_at: new Date(Date.now() - 86400000).toISOString(), // Hier
          updated_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'text-2',
          workspace_id: workspaceId,
          title: 'Deuxième exemple',
          content: 'Un autre texte pour montrer la liste et les fonctionnalités CRUD de base.',
          created_by: 'demo-user-123',
          created_at: new Date(Date.now() - 3600000).toISOString(), // Il y a 1h
          updated_at: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'text-3',
          workspace_id: workspaceId,
          title: 'Test technique',
          content: 'Ce texte démontre l\'utilisation des services, hooks et composants selon les règles d\'architecture Agentova.',
          created_by: 'demo-user-123',
          created_at: new Date().toISOString(), // Maintenant
          updated_at: new Date().toISOString()
        }
      ];
      
      return mockTexts;
    } catch (error) {
      console.error('Erreur récupération textes:', error);
      throw error;
    }
  }

  /**
   * Supprimer un texte
   * VERSION DEMO - Fonction fantôme qui simule la suppression
   */
  static async deleteText(
    workspaceId: string,
    textId: string
  ): Promise<boolean> {
    try {
      // FONCTION FANTÔME - Simule un appel API
      console.log('[DEMO] Suppression texte:', textId);
      
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Toujours réussir en mode demo
      return true;
    } catch (error) {
      console.error('Erreur suppression texte:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour un texte
   * VERSION DEMO - Fonction fantôme qui simule la mise à jour
   */
  static async updateText(
    workspaceId: string,
    textId: string,
    data: Partial<CreateTextRequest>
  ): Promise<TextType> {
    try {
      // FONCTION FANTÔME - Simule un appel API
      console.log('[DEMO] Mise à jour texte:', textId, data);
      
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 450));
      
      // Retourner un texte mis à jour simulé
      const mockUpdatedText: TextType = {
        id: textId,
        workspace_id: workspaceId,
        title: data.title || 'Titre mis à jour',
        content: data.content || 'Contenu mis à jour',
        created_by: 'demo-user-123',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date().toISOString() // Maintenant
      };
      
      return mockUpdatedText;
    } catch (error) {
      console.error('Erreur mise à jour texte:', error);
      throw error;
    }
  }
}
