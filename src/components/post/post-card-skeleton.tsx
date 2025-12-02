import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function PostCardSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Skeleton className="w-full aspect-square" />
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="flex items-center gap-4 w-full">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-6 h-6" />
          <div className="flex-1" />
          <Skeleton className="w-6 h-6" />
        </div>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardFooter>
    </Card>
  )
}
