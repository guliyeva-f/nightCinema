import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({
  theme: "dark",
  setTheme: () => null,
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light")
    root.classList.add("dark")
  }, [])

  const value = {
    theme,
    setTheme: () => {},
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeProviderContext)