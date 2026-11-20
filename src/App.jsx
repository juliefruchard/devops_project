import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = window.localStorage.getItem('todo-tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [taskText, setTaskText] = useState('')

  useEffect(() => {
    window.localStorage.setItem('todo-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (event) => {
    event.preventDefault()
    const text = taskText.trim()

    if (!text) return

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), text, completed: false },
    ])
    setTaskText('')
  }

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  const remainingTasks = tasks.filter((task) => !task.completed).length

  return (
    <main className="todo-app">
      <h1>Ma liste de tâches</h1>

      <form className="todo-form" onSubmit={addTask}>
        <label htmlFor="task-input">Nouvelle tâche</label>
        <div className="todo-form-row">
          <input
            id="task-input"
            type="text"
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            placeholder="Ajouter une tâche…"
          />
          <button type="submit">Ajouter</button>
        </div>
      </form>

      {tasks.length === 0 ? (
        <p className="empty-message">Aucune tâche pour le moment.</p>
      ) : (
        <>
          <ul className="todo-list">
            {tasks.map((task) => (
              <li className="todo-item" key={task.id}>
                <label className="todo-task">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className={task.completed ? 'completed' : ''}>
                    {task.text}
                  </span>
                </label>
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Supprimer ${task.text}`}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
          <p className="remaining-count">
            {remainingTasks} tâche{remainingTasks > 1 ? 's' : ''} restante
            {remainingTasks > 1 ? 's' : ''}
          </p>
        </>
      )}
    </main>
  )
}

export default App
