import { simulateDelay, shouldSimulateError, createSimulatedError } from './api-simulator'

import { mockPosts } from '@/mocks/posts'
import { getRandomUser } from '@/mocks/users'
import { generateMockComments } from '@/mocks/comments'

import type { Post } from '@/types/post'
import type { Comment } from '@/types/comment'
import type { PaginatedResponse } from '@/types/api-response'
import type { AddCommentRequest, GetPostsRequest, LikePostRequest } from '@/types/api'

// Simula um banco de dados em memória
let postsDatabase = [...mockPosts]

/**
 * Busca posts com paginação
 */
export async function getPosts(request: GetPostsRequest = {}): Promise<PaginatedResponse<Post>> {
  const { page = 1, pageSize = 10 } = request

  // Simula delay de rede
  await simulateDelay(800)

  // Simula erro aleatório
  if (shouldSimulateError(0.1)) {
    throw createSimulatedError()
  }

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = postsDatabase.slice(startIndex, endIndex)

  return {
    data: paginatedData,
    page,
    pageSize,
    total: postsDatabase.length,
    hasMore: endIndex < postsDatabase.length,
  }
}

/**
 * Busca um post por ID
 */
export async function getPostById(postId: string): Promise<Post | null> {
  await simulateDelay(500)

  if (shouldSimulateError(0.1)) {
    throw createSimulatedError()
  }

  const post = postsDatabase.find(p => p.id === postId)
  return post || null
}

/**
 * Curtir/Descurtir post
 */
export async function toggleLikePost(request: LikePostRequest): Promise<Post> {
  const { postId } = request

  // Simula delay de rede (otimista deve ser rápido)
  await simulateDelay(300)

  // Simula erro aleatório (15% de chance)
  // if (shouldSimulateError(0.15)) {
  if (shouldSimulateError(1)) {
    throw createSimulatedError('Falha ao curtir o post')
  }

  // Encontra o post
  const postIndex = postsDatabase.findIndex(p => p.id === postId)

  if (postIndex === -1) {
    throw new Error('Post não encontrado')
  }

  const post = postsDatabase[postIndex]

  // Toggle like
  const updatedPost = {
    ...post,
    isLiked: !post.isLiked,
    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
  }

  postsDatabase[postIndex] = updatedPost

  return updatedPost
}

/**
 * Buscar comentários de um post
 */
export async function getPostComments(postId: string): Promise<Comment[]> {
  await simulateDelay(600)

  if (shouldSimulateError(0.1)) {
    throw createSimulatedError()
  }

  // Get comments from localStorage
  const commentsKey = `instagram-feed-comments-${postId}`
  const stored = localStorage.getItem(commentsKey)
  const storedComments = stored ? JSON.parse(stored) : []

  // Combine with mock comments
  const mockComments = generateMockComments(postId, 10)

  return [...mockComments, ...storedComments]
}

/**
 * Adicionar comentário
 */
export async function addComment(request: AddCommentRequest): Promise<Comment> {
  const { postId, content, username, avatar } = request

  console.log({
    postId,
    content,
    username,
    avatar,
  })

  await simulateDelay(500)

  if (shouldSimulateError(0.15)) {
    throw createSimulatedError('Falha ao adicionar comentário')
  }

  // Cria novo comentário com dados do usuário logado
  const newComment: Comment = {
    id: `comment-${postId}-${Date.now()}`,
    postId,
    user:
      username && avatar
        ? {
            id: username,
            username: username,
            fullName: username,
            avatar: avatar,
          }
        : getRandomUser(),
    content,
    createdAt: Date.now(),
    likes: 0,
  }

  // Store comment in localStorage
  const commentsKey = `instagram-feed-comments-${postId}`
  const stored = localStorage.getItem(commentsKey)
  const storedComments = stored ? JSON.parse(stored) : []

  storedComments.push(newComment)
  localStorage.setItem(commentsKey, JSON.stringify(storedComments))

  // Atualiza contagem de comentários do post
  const postIndex = postsDatabase.findIndex(p => p.id === postId)
  if (postIndex !== -1) {
    postsDatabase[postIndex] = {
      ...postsDatabase[postIndex],
      commentsCount: postsDatabase[postIndex].commentsCount + 1,
    }
  }

  return newComment
}

/**
 * Reset do banco de dados (útil para testes)
 */
export function resetDatabase(): void {
  postsDatabase = [...mockPosts]
}
