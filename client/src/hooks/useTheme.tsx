import { useContext } from 'react'
import ThemeProvider from '../context/ThemeContext'
import { ThemeContextType } from '../client-types/themeTypes'

export default function useTheme(): ThemeContextType {
  const context = useContext(ThemeProvider.Context)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
