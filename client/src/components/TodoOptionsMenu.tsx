import { useState, useRef, useEffect } from 'react'
import { Pencil, AlertTriangle } from 'lucide-react'

interface TodoOptionsMenuProps {
  todoId: string
  isOpen: boolean
  onClose: () => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function TodoOptionsMenu({ 
  todoId, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete 
}: TodoOptionsMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  
  // Chiudi il menu quando si clicca fuori
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Verifica se il click è avvenuto fuori dal menu
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Controlla se l'elemento cliccato ha l'attributo data-menu-toggle
        const target = event.target as HTMLElement;
        const isToggleButton = target.closest('[data-menu-toggle]') !== null;
        
        // Se non è il pulsante toggle, chiudi il menu
        if (!isToggleButton) {
          onClose();
        }
      }
    }
    
    if (isOpen) {
      // Aggiungi un piccolo ritardo per evitare che il listener venga attivato immediatamente
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 10);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 top-full mt-1 w-36 bg-[var(--todo-bg)] border border-[var(--todo-border)] rounded-md shadow-lg z-10 overflow-hidden"
    >
      <button 
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--todo-text)] hover:bg-[var(--todo-options-hover)] transition-colors"
        onClick={() => {
          onEdit && onEdit(todoId)
          onClose()
        }}
      >
        <Pencil size={14} />
        <span>Modifica</span>
      </button>
      <button 
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        onClick={() => {
          onDelete && onDelete(todoId)
          onClose()
        }}
      >
        <AlertTriangle size={14} />
        <span>Elimina</span>
      </button>
    </div>
  )
}