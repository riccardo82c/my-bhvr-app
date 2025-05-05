import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="bg-secondary p-4 shadow-md border-b border-[var(--todo-border)] transition-colors">
      <div className="container mx-auto flex justify-between items-center max-w-5xl px-4">
        <div className="flex items-center">
          <h1 className="text-primary font-bold text-xl mr-4">Todo App</h1>
          <ThemeToggle />
        </div>
        <ul className="flex gap-4">
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
        </ul>
      </div>
    </nav>
  )
}
