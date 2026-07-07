import { useEffect, useState } from 'react'
import './App.css'
import NewTodoForm from './components/NewTodoForm'
import TodoList from './components/TodoList'

const STORAGE_KEY = 'wdd430-react-todos'

const starterTodos = [
  { id: crypto.randomUUID(), title: 'Follow the React todo tutorial video', completed: true },
  { id: crypto.randomUUID(), title: 'Take a screenshot with at least two items', completed: false },
]

function normalizeTodo(todo) {
  return {
    id: todo.id ?? crypto.randomUUID(),
    title: typeof todo.title === 'string' ? todo.title : 'Untitled task',
    completed: Boolean(todo.completed),
  }
}

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY)

    if (!savedTodos) {
      return starterTodos
    }

    try {
      return JSON.parse(savedTodos).map(normalizeTodo)
    } catch {
      return starterTodos
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false },
    ])
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
    )
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  return (
    <main className="app-shell">
      <section className="todo-card">
        <p className="eyebrow">WDD 430 Week 1</p>
        <h1>React Todo List</h1>
        <p className="intro">
          This code-along project practices the React basics from the assignment video:
          state, props, forms, and rendering a list.
        </p>

        <NewTodoForm onSubmit={addTodo} />
        <h2 className="list-title">Todo List</h2>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </section>
    </main>
  )
}

export default App
