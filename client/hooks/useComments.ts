import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext';
import { CommentService, CommentType, CreateCommentRequest } from '@/services/api/commentService';
import { queryKeys } from '@/query/queryKeys';

/**
 * Hook pour la gestion des commentaires par texte
 * VERSION DEMO - Suit les patterns du projet
 */
export function useComments(textId: string) {
  const { currentWorkspaceId } = useWorkspaceContext();
  const queryClient = useQueryClient();

  const commentsQuery = useQuery({
    queryKey: queryKeys.comments.list(currentWorkspaceId, textId),
    queryFn: () => CommentService.getComments(currentWorkspaceId, textId),
    staleTime: 0,
    refetchOnMount: true,
    placeholderData: (prev) => prev,
    enabled: Boolean(currentWorkspaceId && textId)
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateCommentRequest) => {
      const svc = new CommentService();
      return svc.createComment(currentWorkspaceId, textId, data);
    },
    onSuccess: (newComment) => {
      queryClient.setQueryData<CommentType[]>(
        queryKeys.comments.list(currentWorkspaceId, textId),
        (old) => (old ? [newComment, ...old] : [newComment])
      );
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => CommentService.deleteComment(currentWorkspaceId, commentId),
    onSuccess: (_, commentId) => {
      queryClient.setQueryData<CommentType[]>(
        queryKeys.comments.list(currentWorkspaceId, textId),
        (old) => (old ? old.filter((c) => c.id !== commentId) : [])
      );
    }
  });

  const createComment = useCallback(
    (data: CreateCommentRequest) => {
      createMutation.mutate(data);
    },
    [createMutation]
  );

  const deleteComment = useCallback(
    (commentId: string) => {
      deleteMutation.mutate(commentId);
    },
    [deleteMutation]
  );

  const refresh = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.comments.list(currentWorkspaceId, textId)
    });
  }, [currentWorkspaceId, textId, queryClient]);

  return {
    comments: commentsQuery.data || [],
    isLoading: commentsQuery.isLoading,
    isRefetching: commentsQuery.isRefetching,
    isError: commentsQuery.isError,
    error: commentsQuery.error,
    createComment,
    deleteComment,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
    refresh
  };
}
