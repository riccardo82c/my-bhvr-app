import { useTheme } from '../context/ThemeContext' // Aggiusta il percorso
import { IoMdSunny, IoMdMoon, IoMdTv } from "react-icons/io"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-secondary  text-primary "
        aria-label={`Passa alla modalità ${theme === 'light' ? 'scura' : 'chiara'}`}
      >

        {theme === 'light' && <IoMdSunny size={20} />}
        {theme === 'dark' && <IoMdMoon size={20} />}
        {theme === 'system' && <IoMdTv size={20} />}

      </button>
    </>
  )
}
