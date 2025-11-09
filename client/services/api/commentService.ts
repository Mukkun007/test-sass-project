import { callSecuredFunction } from '@/services/local/authenticationService';

/**
 * Service de gestion des commentaires côté client
 * VERSION DEMO - Simule des appels avec des délais
 */

export interface CommentType {
  id: string;
  workspace_id: string;
  text_id: string;
  content: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCommentRequest {
  content: string;
}

export class CommentService {
  /**
   * Créer un nouveau commentaire pour un texte
   */
  async createComment(
    workspaceId: string,
    textId: string,
    data: CreateCommentRequest
  ): Promise<CommentType> {
    try {
      console.log('[DEMO] Création commentaire:', data);
      await new Promise((r) => setTimeout(r, 400));
      const now = new Date().toISOString();
      return {
        id: `comment-${Date.now()}`,
        workspace_id: workspaceId,
        text_id: textId,
        content: data.content,
        created_by: 'demo-user-123',
        created_at: now,
        updated_at: now,
      };
    } catch (error) {
      console.error('Erreur création commentaire:', error);
      throw error;
    }
  }

  /**
   * Récupérer les commentaires d'un texte
   */
  static async getComments(
    workspaceId: string,
    textId: string
  ): Promise<CommentType[]> {
    try {
      console.log('[DEMO] Récupération commentaires pour texte:', textId);
      await new Promise((r) => setTimeout(r, 300));
      // Jeu de données mock minimal
      return [
        {
          id: 'comment-1',
          workspace_id: workspaceId,
          text_id: textId,
          content: 'Premier commentaire de démonstration',
          created_by: 'demo-user-123',
          created_at: new Date(Date.now() - 7200000).toISOString(),
          updated_at: new Date(Date.now() - 7200000).toISOString(),
        },
      ];
    } catch (error) {
      console.error('Erreur récupération commentaires:', error);
      throw error;
    }
  }

  /**
   * Supprimer un commentaire
   */
  static async deleteComment(
    workspaceId: string,
    commentId: string
  ): Promise<boolean> {
    try {
      console.log('[DEMO] Suppression commentaire:', commentId);
      await new Promise((r) => setTimeout(r, 300));
      return true;
    } catch (error) {
      console.error('Erreur suppression commentaire:', error);
      throw error;
    }
  }
}
