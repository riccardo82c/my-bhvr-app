import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { BiExit } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'



export default function Navbar() {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <nav className="bg-secondary p-4 shadow-md border-b border-[var(--todo-border)] transition-colors">
      <div className="container mx-auto flex justify-between items-center max-w-5xl px-4">
        <div className="flex items-center">
          <h1 className="text-primary font-bold text-xl mr-4">Todo App</h1>
          <ThemeToggle />
        </div>
        <ul className="flex gap-4 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-colors ${isActive
                  ? "bg-tertiary text-primary shadow-sm"
                  : "text-primary hover:bg-[var(--todo-border)] hover:bg-opacity-20"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-colors ${isActive
                  ? "bg-tertiary text-primary shadow-sm"
                  : "text-primary hover:bg-[var(--todo-border)] hover:bg-opacity-20"
                }`
              }
            >
              Create
            </NavLink>
          </li>
          <button className='cursor-pointer' onClick={logout}>
            <BiExit className='text-primary' size={20} />
          </button>
        </ul>
      </div>
    </nav>
  )
}
