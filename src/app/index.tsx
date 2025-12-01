import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'

export function App() {
  const { data, isLoading } = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { message: 'React Query está funcionando! 🚀' }
    },
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center py-8 text-gray-900 dark:text-white">
          Instagram Feed Challenge
        </h1>

        <div className="p-4 bg-muted rounded-lg">
          {isLoading ? <p>Carregando...</p> : <p className="font-medium">{data?.message}</p>}
        </div>

        <Button
          onClick={() => {
            console.log('Button clicked!')
          }}
        >
          Clique aqui
        </Button>
      </div>
    </div>
  )
}
