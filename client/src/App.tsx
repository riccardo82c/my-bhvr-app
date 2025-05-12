import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Layout from './components/Layout'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        {/* Qui aggiungeremo altre rotte in futuro */}
      </Route>
    </Routes>
  )
}

export default App
