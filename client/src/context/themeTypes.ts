import { createContext } from 'react'

// Definizione dei tipi
export type Theme = 'light' | 'dark' | 'system'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

// Creazione del context
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  toggleTheme: () => { },
})
