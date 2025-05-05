import { useEffect, useRef } from 'react'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Gestisce il click fuori dalla modale per chiuderla
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCancel()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Blocca lo scroll del body quando la modale è aperta
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      // Ripristina lo scroll quando la modale viene chiusa
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onCancel])

  // Gestisce la pressione del tasto ESC per chiudere la modale
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 transition-opacity">
      <div
        ref={modalRef}
        className="bg-[var(--todo-bg)] border border-[var(--todo-border)] rounded-lg shadow-lg p-6 max-w-md w-full mx-4 transition-transform"
      >
        <h3 className="text-xl font-bold mb-2 text-[var(--todo-text)]">{title}</h3>
        <p className="mb-6 text-[var(--todo-text)]">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-[var(--todo-options-bg)] text-[var(--todo-options-text)] hover:bg-[var(--todo-options-hover)] transition-colors"
          >
            Annulla
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Elimina
          </button>
        </div>
      </div>
    </div>
  )
}
