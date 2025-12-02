import { useAuth } from '@/state/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LogOut } from 'lucide-react'

export function Header() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-2xl">
        <h1 className="text-xl font-bold">Instagram Feed</h1>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
            <Avatar className="h-7 w-7">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{user.username}</span>
          </div>

          <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  )
}
