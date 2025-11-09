import { Pool } from 'pg';
import { getPool } from '../config.js';

/**
 * Repository pour la gestion des commentaires
 * VERSION DEMO - similaire à TextRepository
 */

export interface CommentType {
  id: string;
  workspace_id: string;
  text_id: string;
  content: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCommentType {
  text_id: string;
  content: string;
  created_by: string;
}

export class CommentRepository {
  private pool: Pool;

  constructor() {
    this.pool = getPool();
  }

  async listByText(workspaceId: string, textId: string): Promise<CommentType[]> {
    const result = await this.pool.query<CommentType>(
      `SELECT id, workspace_id, text_id, content, created_by, created_at, updated_at
       FROM comments
       WHERE workspace_id = $1 AND text_id = $2
       ORDER BY created_at DESC`,
      [workspaceId, textId]
    );
    return result.rows;
  }

  async create(workspaceId: string, data: CreateCommentType): Promise<CommentType> {
    const result = await this.pool.query<CommentType>(
      `INSERT INTO comments (workspace_id, text_id, content, created_by, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING id, workspace_id, text_id, content, created_by, created_at, updated_at`,
      [workspaceId, data.text_id, data.content, data.created_by]
    );
    return result.rows[0];
  }

  async delete(id: string, workspaceId: string): Promise<boolean> {
    const result = await this.pool.query(
      'DELETE FROM comments WHERE id = $1 AND workspace_id = $2',
      [id, workspaceId]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }
}
