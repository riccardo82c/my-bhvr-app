import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {

  const [theme, setTheme] = useState<Theme>(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  })

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', theme)

    // Update document class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else  {
        document.documentElement.classList.remove('dark')
      }

    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => {

      switch (prevTheme) {
        case 'light':
          return 'dark'
        case 'dark':
          return 'system'
        default:
          return 'light'
      }
    })

  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
