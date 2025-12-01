import { PostList } from '@/components/post/post-list'
import { ThemeToggle } from '@/components/theme-toggle'
import { useThemeEffect } from '@/hooks/use-theme-effect'

export function App() {
  useThemeEffect()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-2xl">
          <h1 className="text-xl font-bold">Instagram Feed</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <PostList />
      </main>
    </div>
  )
}
