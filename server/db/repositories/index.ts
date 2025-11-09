import { TextRepository } from './textRepository.js';
import { CommentRepository } from './commentRepository.js';

// Singleton instances - only repositories present in this demo
let textRepo: TextRepository | undefined;
let commentRepo: CommentRepository | undefined;

// Getters with lazy initialization
export function getTextRepository(): TextRepository {
  if (!textRepo) {
    textRepo = new TextRepository();
  }
  return textRepo;
}

export function getCommentRepository(): CommentRepository {
  if (!commentRepo) {
    commentRepo = new CommentRepository();
  }
  return commentRepo;
}

// Cleanup function for testing purposes
export function clearRepositories(): void {
  textRepo = undefined;
  commentRepo = undefined;
} 



