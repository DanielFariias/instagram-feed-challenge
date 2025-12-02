import type { ReactElement } from 'react'
import {
  render,
  type RenderOptions,
  renderHook,
  type RenderHookOptions,
} from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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

export * from '@testing-library/react'

export { customRender as render, customRenderHook as renderHook }
