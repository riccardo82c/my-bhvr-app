import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '1rem', maxWidth: '1024px', marginInline: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}
