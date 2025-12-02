import { useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface AddCommentFormProps {
  onSubmit: (content: string) => void
  isPending?: boolean
}

export function AddCommentForm({ onSubmit, isPending }: AddCommentFormProps) {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit(content.trim())
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        placeholder="Adicione um comentário..."
        value={content}
        onChange={e => setContent(e.target.value)}
        disabled={isPending}
        className="resize-none min-h-[60px]"
        maxLength={500}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
          }
        }}
      />
      <Button type="submit" disabled={!content.trim() || isPending} size="icon">
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
      </Button>
    </form>
  )
}
