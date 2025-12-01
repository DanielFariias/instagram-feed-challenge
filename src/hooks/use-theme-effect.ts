import { useEffect } from 'react'
import { useTheme } from '@/state/theme'

export function useThemeEffect() {
  const theme = useTheme(state => state.theme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])
}
