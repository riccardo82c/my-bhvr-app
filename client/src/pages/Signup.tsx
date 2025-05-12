import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from 'shared'
import beaver from '../assets/beaver.svg'
import { AuthResponse } from 'shared'
import { Link } from 'react-router-dom'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

// Definiamo un tipo locale per il form che non include il campo role opzionale
type LoginFormInput = {
  email: string
  password: string
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [info, setInfo] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormInput>({
    resolver: zodResolver(
      // Creiamo uno schema locale che omette il campo role
      userSchema
    ),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormInput) => {
    try {
      setIsLoading(true)

      const method = 'POST'
      const res = await fetch(`${SERVER_URL}/users/login`, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const loginRes: AuthResponse = await res.json()
      console.log('res', loginRes)

      localStorage.setItem('token', loginRes.token)
      localStorage.setItem('role', loginRes.user.role)

      setInfo('Login effettuato con successo...')
      // Reset del form dopo l'invio
      reset()
    } catch (error) {
      console.error('Errore durante il login:', error)
      setInfo('Errore durante il login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='mt-6  max-w-2xl mx-auto'>
      <h2 className="text-xl font-bold mb-4 flex gap-x-2">
        <a href="https://github.com/stevedylandev/bhvr" target="_blank" rel="noreferrer">
          <img src={beaver} alt="beaver logo" />
        </a>
        <span>Signup</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className='bg-[var(--todo-bg)] border border-[var(--todo-border)] rounded-lg shadow-[var(--todo-shadow)] p-6 flex flex-col gap-4'>
          <div>
            <label htmlFor="email" className="block text-[var(--todo-text)] font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full p-3 border border-[var(--todo-border)] rounded-md bg-[var(--todo-bg)] text-[var(--todo-text)] focus:outline-none focus:ring-2 focus:ring-[var(--todo-completed-dot)] transition-colors"
              placeholder="email@esempio.com"
              disabled={isLoading}
            />
            {errors.email && (
              <pre className="mt-1 text-[var(--todo-text)] text-sm">{errors.email.message}</pre>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-[var(--todo-text)] font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full p-3 border border-[var(--todo-border)] rounded-md bg-[var(--todo-bg)] text-[var(--todo-text)] focus:outline-none focus:ring-2 focus:ring-[var(--todo-completed-dot)] transition-colors"
              placeholder="Password"
              disabled={isLoading}
            />
            {errors.password && (
              <pre className="mt-1 text-[var(--todo-text)] text-sm">{errors.password.message}</pre>
            )}
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 rounded-md transition-colors ${isLoading
                ? 'opacity-70 cursor-not-allowed bg-gray-400'
                : 'bg-[var(--color-primary)] text-white hover:bg-opacity-90 cursor-pointer'
                }`}
            >
              {isLoading ? 'Elaborazione...' : 'Accedi'}
            </button>
          </div>

          <div className="flex justify-end text-sm mt-2">
            <pre>
              {info && <p className="text-[var(--todo-text)]">{info}</p>}
            </pre>
          </div>

          <div className='flex justify-center'>
            <Link
              to='/login'
              className="text-[var(--todo-text)] hover:underline"
            >
              Already registered? Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
