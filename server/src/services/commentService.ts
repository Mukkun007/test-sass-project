import { onCall } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions';
import { validateAuth, verifyWorkspaceToken, isValidWorkspaceToken } from '../utils/authWorkspace.js';
import { validateRequiredFields, isSuccess, handleError } from '../utils/validation.js';
import { createResponseWithTokens } from '../../shared/responses.js';
import { getCommentRepository } from '../../db/repositories/index.js';
import { WORKSPACE_ROLES } from '../../../shared/types.js';

/**
 * Service de gestion des commentaires (DEMO)
 */

export const createComment = onCall({
  memory: '512MiB',
  timeoutSeconds: 60
}, async (request) => {
  try {
    const authResponse = validateAuth(request.auth);
    if (!isSuccess(authResponse)) return authResponse;
    const uid = authResponse.user;

    const { workspaceToken, textId, content } = request.data;
    const validationResponse = validateRequiredFields(request.data, [
      'workspaceToken', 'textId', 'content'
    ]);
    if (!isSuccess(validationResponse)) return validationResponse;

    const tokenValidation = await verifyWorkspaceToken(
      workspaceToken,
      uid,
      WORKSPACE_ROLES.EDITOR
    );
    const validationResult = isValidWorkspaceToken(tokenValidation);
    if (!isSuccess(validationResult)) return validationResult;
    const { workspace_id, workspace_tokens } = validationResult;
    const response = createResponseWithTokens(workspace_tokens);

    if (content.length > 500) {
      return response.error({ code: 'INVALID_INPUT', message: 'Le commentaire ne peut pas dépasser 500 caractères' });
    }

    const comment = await getCommentRepository().create(workspace_id, {
      text_id: textId,
      content: content.trim(),
      created_by: uid
    });

    logger.info(`Commentaire créé sur texte ${textId} par ${uid}`);
    return response.success({ comment });
  } catch (error) {
    logger.error('Erreur dans createComment:', error);
    return handleError(error);
  }
});

export const getComments = onCall({
  memory: '512MiB',
  timeoutSeconds: 60
}, async (request) => {
  try {
    const authResponse = validateAuth(request.auth);
    if (!isSuccess(authResponse)) return authResponse;
    const uid = authResponse.user;

    const { workspaceToken, textId } = request.data;
    const validationResponse = validateRequiredFields(request.data, [
      'workspaceToken', 'textId'
    ]);
    if (!isSuccess(validationResponse)) return validationResponse;

    const tokenValidation = await verifyWorkspaceToken(
      workspaceToken,
      uid,
      WORKSPACE_ROLES.EDITOR
    );
    const validationResult = isValidWorkspaceToken(tokenValidation);
    if (!isSuccess(validationResult)) return validationResult;
    const { workspace_id, workspace_tokens } = validationResult;
    const response = createResponseWithTokens(workspace_tokens);

    const comments = await getCommentRepository().listByText(workspace_id, textId);
    logger.info(`Commentaires récupérés pour texte ${textId} par ${uid}`);
    return response.success({ comments });
  } catch (error) {
    logger.error('Erreur dans getComments:', error);
    return handleError(error);
  }
});

export const deleteComment = onCall({
  memory: '512MiB',
  timeoutSeconds: 60
}, async (request) => {
  try {
    const authResponse = validateAuth(request.auth);
    if (!isSuccess(authResponse)) return authResponse;
    const uid = authResponse.user;

    const { workspaceToken, commentId } = request.data;
    const validationResponse = validateRequiredFields(request.data, [
      'workspaceToken', 'commentId'
    ]);
    if (!isSuccess(validationResponse)) return validationResponse;

    const tokenValidation = await verifyWorkspaceToken(
      workspaceToken,
      uid,
      WORKSPACE_ROLES.ADMIN
    );
    const validationResult = isValidWorkspaceToken(tokenValidation);
    if (!isSuccess(validationResult)) return validationResult;
    const { workspace_id, workspace_tokens } = validationResult;
    const response = createResponseWithTokens(workspace_tokens);

    const deleted = await getCommentRepository().delete(commentId, workspace_id);
    if (!deleted) {
      return response.error({ code: 'NOT_FOUND', message: 'Commentaire non trouvé' });
    }

    logger.info(`Commentaire ${commentId} supprimé par ${uid}`);
    return response.success({ deleted: true });
  } catch (error) {
    logger.error('Erreur dans deleteComment:', error);
    return handleError(error);
  }
});
