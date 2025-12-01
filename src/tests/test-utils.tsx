import type { ReactElement } from 'react'
import {
  render,
  type RenderOptions,
  renderHook,
  type RenderHookOptions,
} from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Cria um QueryClient para testes (sem retry e sem logs)
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
    // logger: {
    //   log: () => {},
    //   warn: () => {},
    //   error: () => {},
    // },
  })
}

interface AllTheProvidersProps {
  children: React.ReactNode
}

function AllTheProviders({ children }: AllTheProvidersProps) {
  const testQueryClient = createTestQueryClient()

  return <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

function customRenderHook<Result, Props>(
  hook: (initialProps: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>
) {
  return renderHook(hook, { wrapper: AllTheProviders, ...options })
}

// Re-exporta tudo do testing-library
export * from '@testing-library/react'

// Sobrescreve o render e renderHook
export { customRender as render, customRenderHook as renderHook }
