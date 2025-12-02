import { useState } from 'react'
import { PostList } from '@/components/post/post-list'
import { PostDetailsModal } from '@/components/post/post-details-modal'
import { Login } from '@/components/login'
import { Header } from '@/components/header'
import { useThemeEffect } from '@/hooks/use-theme-effect'
import { useAuth } from '@/state/auth'
import type { Post } from '@/types/post'

export function App() {
  useThemeEffect()

  const { isAuthenticated } = useAuth()
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open)
    if (!open) {
      setSelectedPost(null)
    }
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <PostList onPostClick={handlePostClick} />
      </main>

      {/* Post Details Modal */}
      <PostDetailsModal post={selectedPost} open={isModalOpen} onOpenChange={handleModalClose} />
    </div>
  )
}
