import { useEffect, useState } from 'react'
import beaver from '../assets/beaver.svg'
import { Todo } from 'shared'
import TodoList from '../components/TodoList'
import { TodoProvider } from '../context/TodoContext'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '../components/ConfirmModal'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"



function Home() {
  const [todos, setTodos] = useState<Todo[] | undefined>()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null)

  useEffect(() => {
    getTodos()
  }, [])

  async function getTodos() {
    try {
      setLoading(true)
      const req = await fetch(`${SERVER_URL}/todos`)
      const res: Todo[] = await req.json()
      setTodos(res)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function toggleTodoState(id: string) {
    try {
      const req = await fetch(`${SERVER_URL}/todos/${id}/toggle`, {
        method: 'PATCH'
      })
      const res: Todo = await req.json()
      setTodos(prev => prev?.map(todo => todo._id === id ? res : todo))
    } catch (error) {
      console.log(error)
    }
  }

  function handleEditTodo(id: string) {
    console.log(`Modifica todo con ID: ${id}`)
    navigate(`/create?id=${id}`)

    // Implementazione futura: aprire un modal di modifica o navigare a una pagina di modifica
  }

  function handleDeleteTodo(id: string) {
    // Apre la modale e imposta l'ID del todo da eliminare
    setTodoToDelete(id)
    setIsModalOpen(true)
  }

  async function confirmDeleteTodo() {
    if (!todoToDelete) return

    try {
      const req = await fetch(`${SERVER_URL}/todos/${todoToDelete}`, {
        method: 'DELETE'
      })
      if (req.ok) {
        setTodos(prev => prev?.filter(todo => todo._id !== todoToDelete))
        // Chiude la modale e resetta l'ID del todo da eliminare
        setIsModalOpen(false)
        setTodoToDelete(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function cancelDeleteTodo() {
    // Chiude la modale e resetta l'ID del todo da eliminare
    setIsModalOpen(false)
    setTodoToDelete(null)
  }

  return (
    <>
      <div className='mt-6'>
        <h2 className="text-xl font-bold mb-4 flex gap-x-2">
          <a href="https://github.com/stevedylandev/bhvr" target="_blank">
            <img src={beaver} alt="beaver logo" />
          </a>
          <span>Lista dei Task</span>
        </h2>
        <TodoProvider>
          <TodoList
            todos={todos}
            onToggle={toggleTodoState}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            loading={loading}
          />
        </TodoProvider>
      </div>

      {/* Modale di conferma per l'eliminazione */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Conferma eliminazione"
        message="Sei sicuro di voler eliminare questo task? Questa azione non può essere annullata."
        onConfirm={confirmDeleteTodo}
        onCancel={cancelDeleteTodo}
      />
    </>
  )
}

export default Home
