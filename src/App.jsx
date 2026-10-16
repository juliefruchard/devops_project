import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState('')
  const [newTaskCategory, setNewTaskCategory] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categoryAlreadyExists = categories.some(
    (category) => category.toLowerCase() === newCategory.trim().toLowerCase(),
  )

  function addTask(event) {
    event.preventDefault()

    const title = newTask.trim()
    if (title === '') return

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: crypto.randomUUID(),
        title,
        category: newTaskCategory,
        completed: false,
      },
    ])
    setNewTask('')
  }

  function addCategory(event) {
    event.preventDefault()
    const name = newCategory.trim()

    if (!name || categoryAlreadyExists) return

    setCategories((currentCategories) => [...currentCategories, name])
    setNewCategory('')
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

  const visibleTasks = tasks.filter(
    (task) => !selectedCategory || task.category === selectedCategory,
  )
  const remainingTasks = visibleTasks.filter((task) => !task.completed).length

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
          <select
            aria-label="Catégorie de la tâche"
            value={newTaskCategory}
            onChange={(event) => setNewTaskCategory(event.target.value)}
          >
            <option value="">Sans catégorie</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button type="submit">Ajouter</button>
        </div>
      </form>

      <form className="category-form" onSubmit={addCategory}>
        <label htmlFor="new-category">Mes catégories</label>
        <div className="category-input">
          <input
            id="new-category"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            placeholder="Ex. Travail"
          />
          <button
            type="submit"
            disabled={!newCategory.trim() || categoryAlreadyExists}
          >
            Créer
          </button>
        </div>
        {categoryAlreadyExists && (
          <p className="category-hint">Cette catégorie existe déjà.</p>
        )}
      </form>

      <section className="tasks-section" aria-label="Liste des tâches">
        <div className="tasks-heading">
          <h2>À faire</h2>
          <span className="task-count">
            {remainingTasks} {remainingTasks === 1 ? 'tâche' : 'tâches'}
          </span>
        </div>
        <label className="category-filter">
          <span>Afficher</span>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            aria-label="Filtrer par catégorie"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        {visibleTasks.length === 0 ? (
          <p className="empty-message">Tes tâches apparaîtront ici.</p>
        ) : (
          <ul className="task-list">
            {visibleTasks.map((task) => (
              <li className="task-item" key={task.id}>
                <label className="task-label">
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => markTaskAsDone(task.id)}
                  />
                  <span
                    className={
                      task.completed ? 'task-title completed' : 'task-title'
                    }
                  >
                    {task.title}
                  </span>
                  {task.category && (
                    <span className="category-tag">{task.category}</span>
                  )}
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
