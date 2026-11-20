import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from './App.jsx'

afterEach(cleanup)

beforeEach(() => {
  window.localStorage.clear()
})

describe('liste de tâches', () => {
  it('ajoute une tâche en supprimant les espaces superflus', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('Nouvelle tâche'), {
      target: { value: '  Faire les courses  ' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }))

    expect(screen.getByText('Faire les courses')).toBeInTheDocument()
    expect(screen.getByText('1 tâche restante')).toBeInTheDocument()
  })

  it('ignore une tâche vide et met à jour le compteur quand une tâche est terminée', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }))
    expect(screen.getByText('Aucune tâche pour le moment.')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Nouvelle tâche'), {
      target: { value: 'Lire' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }))
    fireEvent.click(screen.getByRole('checkbox'))

    expect(screen.getByText('0 tâche restante')).toBeInTheDocument()
    expect(screen.getByText('Lire')).toHaveClass('completed')
  })

  it('supprime une tâche et conserve les tâches entre les rendus', () => {
    const { unmount } = render(<App />)

    fireEvent.change(screen.getByLabelText('Nouvelle tâche'), {
      target: { value: 'Réviser' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }))
    expect(JSON.parse(window.localStorage.getItem('todo-tasks'))).toHaveLength(
      1,
    )

    unmount()
    render(<App />)
    expect(screen.getByText('Réviser')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Supprimer Réviser' }))
    expect(screen.queryByText('Réviser')).not.toBeInTheDocument()
  })
})
