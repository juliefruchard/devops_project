import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  function addTask(event) {
    event.preventDefault()

    const title = newTask.trim()
    if (title === '') return

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), title, completed: false },
    ])
    setNewTask('')
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  function markTaskAsDone(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const remainingTasks = tasks.filter((task) => !task.completed).length

  return (
    <main className="todo-app">
      <header className="app-header">
        <p className="eyebrow">UN JOUR À LA FOIS</p>
        <h1>Ma liste de tâches</h1>
        <p className="subtitle">Organise tes idées, avance à ton rythme.</p>
      </header>

      <form onSubmit={addTask}>
        <label htmlFor="new-task">Nouvelle tâche</label>
        <div className="task-form">
          <input
            id="new-task"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Ex. Faire les courses"
          />
          <button type="submit">Ajouter</button>
        </div>
      </form>

      <section className="tasks-section" aria-label="Liste des tâches">
        <div className="tasks-heading">
          <h2>À faire</h2>
          <span className="task-count">
            {remainingTasks} {remainingTasks === 1 ? 'tâche' : 'tâches'}
          </span>
        </div>

        {tasks.length === 0 ? (
          <p className="empty-message">Tes tâches apparaîtront ici.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li className="task-item" key={task.id}>
                <label className="task-label">
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => markTaskAsDone(task.id)}
                  />
                  <span className={task.completed ? 'task-title completed' : 'task-title'}>
                    {task.title}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Supprimer ${task.title}`}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
