import { useEffect, useState, FormEvent, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Todo } from "shared"
import beaver from '../assets/beaver.svg'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const Create = () => {
  const [searchParams] = useSearchParams()
  const todoId = searchParams.get('id')
  const [title, setTitle] = useState('')
  const [originalTitle, setOriginalTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState('')

  const navigate = useNavigate()

  // Computed property per verificare se il titolo è cambiato
  const isTitleChanged = useMemo(() => {
    return todoId ? title !== originalTitle && title.trim() !== '' : title.trim() !== ''
  }, [title, originalTitle, todoId])

  useEffect(() => {
    if (!todoId) return
    console.log(todoId)
    setInfo(`Modifica del Task ${todoId}`)
    getTodoData(todoId)

  }, [todoId])

  const getTodoData = async (todoId: string ) => {
    try {
      setLoading(true)
      const res = await fetch(`${SERVER_URL}/todos/${todoId}`)
      const data: Todo = await res.json()
      setTitle(data.title)
      setOriginalTitle(data.title) // Salva il titolo originale per confrontarlo in seguito
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const setTodoData = async () => {

    const method = todoId ? 'PUT' : 'POST'
    const url = todoId ? `${SERVER_URL}/todos/${todoId}` : `${SERVER_URL}/todos`

    try {
      setLoading(true)

      const payload = {
        title,
        completed: false
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data: Todo = await res.json()
      console.log(data)
      if (data) {
        setInfo(`Task ${todoId ? 'aggiornato' : 'creato'} con successo... redirect`)
        setTitle('')
        await sleep(1000)
        setInfo('')
        navigate('/')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Titolo:', title)
    // Qui in futuro implementeremo la logica per creare o modificare il todo
  }

  return (
    <div className='mt-6'>
      <h2 className="text-xl font-bold mb-4 flex gap-x-2">
      <a href="https://github.com/stevedylandev/bhvr" target="_blank">
            <img src={beaver} alt="beaver logo" />
          </a>
        <span>{todoId ? 'Modifica Task' : 'Crea Nuovo Task'}</span>
      </h2>

      <form onSubmit={handleSubmit} className="">
        <div className='bg-[var(--todo-bg)] border border-[var(--todo-border)] rounded-lg shadow-[var(--todo-shadow)] p-6 flex flex-col gap-4'>
          <div>
            <label htmlFor="title" className="block text-[var(--todo-text)] font-medium mb-2">
              Titolo
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Inserisci il titolo del task"
              className="w-full p-3 border border-[var(--todo-border)] rounded-md bg-[var(--todo-bg)] text-[var(--todo-text)] focus:outline-none focus:ring-2 focus:ring-[var(--todo-completed-dot)] transition-colors"
              required
            />
          </div>

          <div className="flex justify-end mt-2">
            <button
              onClick={setTodoData}
              type="submit"
              disabled={loading || (!!todoId && !isTitleChanged)}
              className={`px-4 py-2 rounded-md transition-colors ${
                loading || (todoId && !isTitleChanged)
                  ? 'opacity-70 cursor-not-allowed bg-gray-400'
                  : 'bg-[var(--color-primary)] text-white hover:bg-opacity-90 cursor-pointer'
              }`}
            >
              {loading ? 'Elaborazione...' : todoId ? 'Aggiorna' : 'Crea'}
            </button>
          </div>

          <div className="flex justify-end text-sm mt-2">
            <pre>
            {info && <p className="text-[var(--todo-text)]">{info}</p>}
            </pre>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Create
