// Helper to manage likes in localStorage per user
const getLikesKey = (username: string) => `instagram-feed-likes-${username}`

export const getUserLikes = (username: string): Set<string> => {
  const stored = localStorage.getItem(getLikesKey(username))
  return stored ? new Set(JSON.parse(stored)) : new Set()
}

export const toggleUserLike = (username: string, postId: string): boolean => {
  const likes = getUserLikes(username)
  const isLiked = likes.has(postId)

  if (isLiked) {
    likes.delete(postId)
  } else {
    likes.add(postId)
  }

  localStorage.setItem(getLikesKey(username), JSON.stringify([...likes]))
  return !isLiked
}

export const isPostLikedByUser = (username: string, postId: string): boolean => {
  const likes = getUserLikes(username)
  return likes.has(postId)
}
