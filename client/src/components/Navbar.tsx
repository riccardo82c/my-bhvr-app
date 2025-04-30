import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="bg-secondary p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <ThemeToggle />
        </div>
        <ul className="flex gap-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium text-primary ${isActive
                  ? "bg-tertiary"
                  : "bg-secondary"
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
                `px-4 py-2 rounded-lg font-medium text-primary ${isActive
                  ? "bg-tertiary"
                  : "bg-secondary"
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
